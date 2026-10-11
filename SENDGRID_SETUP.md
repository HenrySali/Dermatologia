# 📧 Guía de Configuración - SendGrid Email Service

## Resumen

Este documento te guía paso a paso para configurar **SendGrid** para enviar emails automáticos desde tu sitio de dermatología. Los emails incluyen:

- ✅ Confirmación de solicitud de turno
- ⏰ Recordatorios 24h antes del turno
- 🚫 Confirmación de cancelación
- 📬 Notificación al admin

---

## 📋 Requisitos Previos

- [ ] Tener instalado Node.js v18+
- [ ] Acceso a npm/yarn para instalar dependencias
- [ ] Una cuenta de email para verificar en SendGrid
- [ ] Acceso a git para hacer commit

---

## 🚀 PASO 1: Crear Cuenta en SendGrid

### 1.1 Registro
1. Ve a **https://sendgrid.com**
2. Haz clic en **"Sign Up"** (arriba a la derecha)
3. Completa el formulario:
   - **Nombre:** Tu nombre
   - **Email:** Tu email (debe estar verificado luego)
   - **Contraseña:** Contraseña fuerte
   - **Empresa:** Dermatología Dra. Stefany Salinas

### 1.2 Verificar Email
1. Revisa tu bandeja de entrada
2. Haz clic en el link de verificación de SendGrid
3. Confirma tu identidad si SendGrid lo pide

### 1.3 Completar Perfil
- Selecciona "I'm integrating an API" (Estoy integrando una API)
- Lenguaje de programación: **Node.js**
- Tu función: **Founder/Owner**

---

## 🔑 PASO 2: Obtener API Key

### 2.1 Crear API Key
1. Log in en https://app.sendgrid.com
2. Ve al menú lateral: **Settings** → **API Keys**
3. Haz clic en el botón azul **"Create API Key"**
4. **Nombre:** Dermatología App (o lo que prefieras)
5. **Permisos:** Selecciona **Full Access** (o solo Mail Send si prefieres)
6. Haz clic en **"Create & View"**

### 2.2 Copiar API Key
- Tu API Key aparece (empieza con `SG.`)
- **⚠️ IMPORTANTE:** Cópiala AHORA. No se volverá a mostrar.
- Si la pierdes, crea una nueva

---

## 📧 PASO 3: Verificar Dominio de Email

### Opción A: Usar Email Genérico (Recomendado para Empezar)

Si NO tienes dominio personalizado, puedes usar:
- **noreply@dermatologia.sendgrid.net** (email de prueba)
- O tu email personal verificado

### Opción B: Usar Tu Dominio Personalizado

Para usar `contacto@dermatologia-stefany.com`, debes:

1. Ve a **Settings** → **Sender Authentication** → **Domain Authentication**
2. Haz clic en **"Create New Sender Domain"**
3. Ingresa tu dominio: `dermatologia-stefany.com`
4. SendGrid te mostrará 3 registros CNAME para agregar
5. Accede a tu proveedor de dominio (Namecheap, GoDaddy, etc)
6. Agrega los registros CNAME en la zona DNS
7. Vuelve a SendGrid y haz clic en **"Verify"**
8. Espera a que SendGrid valide (puede tomar 24h)

---

## 💾 PASO 4: Configuración Local

### 4.1 Crear Archivo .env

1. En la carpeta `/app/`, copia el archivo `.env.example` a `.env`:
   ```bash
   cd app/
   cp .env.example .env
   ```

2. Abre `.env` y completa:
   ```env
   # Clave que copiaste en PASO 2
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   
   # Email desde donde se enviarán los correos
   EMAIL_FROM=noreply@dermatologia.sendgrid.net
   # O si verificaste dominio:
   # EMAIL_FROM=contacto@dermatologia-stefany.com
   
   # Email del admin (recibe notificaciones)
   EMAIL_ADMIN=admin@dermatologia-stefany.com
   
   # URL de tu app
   APP_URL=http://localhost:3000
   ```

### 4.2 Instalar Dependencias

```bash
cd app/
npm install
```

Esto instalará:
- `@sendgrid/mail` - Cliente de SendGrid
- `dotenv` - Para cargar variables de .env
- `helmet` - Seguridad adicional
- `express-rate-limit` - Protección contra abuso

---

## 🧪 PASO 5: Probar Configuración

### 5.1 Iniciar Servidor

```bash
cd app/
npm start
```

Deberías ver:
```
✅ Base de datos SQLite conectada
✅ SendGrid configurado correctamente
Servidor ejecutándose en puerto 3000
```

### 5.2 Test de Email (Endpoint Especial)

Para probar, agregamos un endpoint en `server.js`:

```javascript
// Agrega esta ruta después de las demás rutas:
app.post('/api/test-email', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email requerido' });
    }
    
    const { enviarEmailPrueba } = await import('./services/emailService.js');
    const resultado = await enviarEmailPrueba(email);
    
    res.json(resultado);
});
```

Luego, desde tu navegador o Postman:

```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"tu-email@gmail.com"}'
```

Deberías recibir un email en 2-3 segundos.

---

## 🔌 PASO 6: Integración en server.js

### 6.1 Importar Servicio

Al inicio de `server.js`, agrega:

```javascript
import { 
    enviarConfirmacionTurno,
    enviarNotificacionAdminNuevoTurno,
    enviarRecordatorioTurno
} from './services/emailService.js';
```

### 6.2 Enviar Email al Crear Turno

En el endpoint `POST /api/turnos`, después de crear el turno:

```javascript
// Después de db.run INSERT...
const { enviarConfirmacionTurno, enviarNotificacionAdminNuevoTurno } 
    = await import('./services/emailService.js');

await enviarConfirmacionTurno(paciente, turno);
await enviarNotificacionAdminNuevoTurno(paciente, turno);

res.json({ 
    mensaje: 'Turno creado exitosamente',
    turnoId: turno.id 
});
```

### 6.3 Recordatorio Automático (24h antes)

Para recordatorios automáticos, agrega un CRON job:

```javascript
import cron from 'node-cron';

// Cada hora, verifica turnos en 24 horas
cron.schedule('0 * * * *', async () => {
    console.log('⏰ Verificando turnos para recordatorios...');
    
    const turnosProximos = db.all(`
        SELECT t.*, p.email 
        FROM turnos t 
        JOIN pacientes p ON t.paciente_id = p.id
        WHERE DATE(t.fecha) = DATE('now', '+1 day')
        AND t.estado = 'confirmado'
    `);
    
    for (const turno of turnosProximos) {
        await enviarRecordatorioTurno(turno, turno);
    }
});
```

---

## 🔒 PASO 7: Seguridad en Producción

### 7.1 NO Commiteadores .env

En `/app/.gitignore`, asegúrate que esté:

```
.env
.env.local
node_modules/
dermatologia.db
```

### 7.2 Usar Railway para Hosting

Railway proporciona HTTPS automáticamente:

1. Ve a https://railway.app
2. Conecta tu repositorio GitHub
3. En **Environment Variables**, agrega:
   ```
   SENDGRID_API_KEY=SG.xxxxx
   JWT_SECRET=tu_clave_fuerte
   EMAIL_FROM=contacto@dermatologia-stefany.com
   EMAIL_ADMIN=admin@dermatologia-stefany.com
   APP_URL=https://tuapp.railway.app
   ```
4. Railway deploy automáticamente 🚀

---

## 📊 Dashboard de SendGrid

### Monitorear Emails

1. Ve a **Home** → **Dashboard**
2. Ves gráficos de:
   - ✅ Emails enviados
   - ❌ Emails rechazados
   - 📂 Emails abiertos
   - 🔗 Clicks en links

### Revisar Problemas

Si ves errores:

1. **Error 403 (Forbidden):** El email FROM no está verificado
   - Solución: Verifica el dominio o usa email de prueba

2. **Error 401 (Unauthorized):** API Key incorrecta o expirada
   - Solución: Regenera API Key

3. **Error 429 (Too Many Requests):** Superaste límite de tu plan
   - Solución: Espera o upgrade a plan pago

---

## 📧 Templates Disponibles

Tu app incluye 4 templates HTML profesionales:

### 1. **Confirmación de Turno**
```
To: paciente@email.com
Subject: Confirmación de Solicitud de Turno
- Confirma que recibimos la solicitud
- Dice que te confirmaremos en 24h
- Bonito diseño con logo
```

### 2. **Recordatorio 24h Antes**
```
To: paciente@email.com
Subject: ⏰ Recordatorio: Tu turno es mañana
- Recuerda fecha, hora y lugar
- Pide que llegue 10 min antes
- Incluye link para cancelar si es necesario
```

### 3. **Confirmación de Cancelación**
```
To: paciente@email.com
Subject: Tu turno ha sido cancelado
- Notifica que el turno fue cancelado
- Ofrece opción de reprogramar
```

### 4. **Notificación al Admin**
```
To: admin@dermatologia-stefany.com
Subject: [NUEVO TURNO] Solicitud de Juan Pérez
- Info completa del paciente
- Fecha y hora solicitadas
- Link para confirmar/rechazar
```

---

## ✅ Checklist Final

- [ ] Creaste cuenta en SendGrid
- [ ] Generaste API Key
- [ ] Verificaste email/dominio
- [ ] Copiaste API Key a `.env`
- [ ] Ejecutaste `npm install`
- [ ] Probaste email de prueba
- [ ] Integraste emails en server.js
- [ ] Hiciste push a GitHub
- [ ] Configuraste Railway
- [ ] App en producción con HTTPS ✅

---

## 🆘 Troubleshooting

### Los emails no se envían

**Síntoma:** Los emails no llegan

**Verificar:**
1. ¿SENDGRID_API_KEY está en `.env`?
2. ¿El servidor muestra "✅ SendGrid configurado"?
3. ¿Revisaste spam/promociones?
4. ¿El email FROM está verificado en SendGrid?

**Solución:**
```javascript
// Abre console.js del navegador
fetch('/api/test-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'tu-email@gmail.com' })
})
.then(r => r.json())
.then(console.log)
```

---

## 📚 Recursos Útiles

- **SendGrid Docs:** https://docs.sendgrid.com/
- **Node.js Helper:** https://github.com/sendgrid/sendgrid-nodejs
- **Railway Docs:** https://docs.railway.app/
- **Email Best Practices:** https://sendgrid.com/resource/email-deliverability-guide/

---

## 💬 Soporte

Si tienes problemas:

1. Revisa la documentación de SendGrid
2. Verifica los logs en el servidor
3. Contacta a soporte de SendGrid (tienen chat 24/7)
4. Revisa GitHub issues de sendgrid-nodejs

---

## 🎉 ¡Listo!

Una vez configurado, todos los turnos que se soliciten incluirán:

✅ Confirmación automática por email
📧 Recordatorio 24h antes
⏰ Notificación al admin
🎁 Experiencia profesional

Tu sitio de dermatología es ahora **80% profesional** 🚀

