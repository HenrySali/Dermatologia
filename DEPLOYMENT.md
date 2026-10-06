# 🚀 Guía de Deployment - Railway.app

## 📋 Resumen

Esta guía te lleva paso a paso para desplegar tu aplicación a **Railway.app** con HTTPS automático, SSL, y dominios personalizados.

**Ventajas de Railway:**
- ✅ HTTPS automático (certificados SSL gratuitos)
- ✅ Cero configuración de servidor
- ✅ Despliegue desde GitHub (push = deploy)
- ✅ Base de datos en la nube (opcional)
- ✅ Variables de entorno seguras
- ✅ Monitoreo y logs
- ✅ Escalabilidad automática
- ✅ $5 USD de crédito mensual gratis

---

## 🎯 Pre-Requisitos

- [ ] Cuenta en GitHub (gratis)
- [ ] Repositorio del proyecto subido
- [ ] Archivo `.env` NO commiteado
- [ ] `package.json` con scripts `start`

---

## 🚀 PASO 1: Crear Cuenta en Railway

### 1.1 Registro
1. Ve a https://railway.app
2. Haz clic en **"Start Project"**
3. Elige **"Deploy from GitHub"**
4. Autoriza Railway a acceder a tu GitHub

### 1.2 Conectar Repositorio

1. Selecciona tu repositorio `dermatologia`
2. Railway te pedirá confirmar
3. Autoriza el acceso

---

## ⚙️ PASO 2: Crear Variable de Entorno

### 2.1 Acceder a Variables

1. En Railway, ve a tu proyecto
2. Haz clic en la pestaña **"Variables"**
3. Haz clic en **"Raw Editor"**

### 2.2 Agregar Variables

Copia y pega estas variables (reemplaza los valores):

```
JWT_SECRET=tu_clave_secreta_super_segura_minimo_32_caracteres_12345
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=contacto@dermatologia-stefany.com
EMAIL_ADMIN=admin@dermatologia-stefany.com
APP_URL=https://dermatologia-stefany.railway.app
NODE_ENV=production
PORT=3000
```

### 2.3 Guardar

Haz clic en **"Update Variables"**

---

## 🔌 PASO 3: Configurar Base de Datos

### Opción A: SQLite Local (Recomendado para Empezar)

Tu base de datos SQLite se guarda automáticamente en el servidor.

✅ Ventajas:
- No necesita configuración
- Funciona inmediatamente
- Gratis

❌ Desventajas:
- Datos se pierden si reinicia la app
- No es escalable
- Para producción pequeña solo

### Opción B: PostgreSQL en Railway (Recomendado para Producción)

Para mejor durabilidad:

1. En Railway, ve a **"Create"** → **"Database"** → **"PostgreSQL"**
2. Espera a que se cree (2-3 minutos)
3. Copia la variable `DATABASE_URL`
4. Actualiza `app/server.js` para usar PostgreSQL

---

## 📦 PASO 4: Deploy Automático

### 4.1 First Deploy

Railway automáticamente:
1. Detecta `package.json`
2. Ejecuta `npm install`
3. Ejecuta `npm start`
4. Abre puertos
5. Asigna dominio

**Tiempo:** 2-5 minutos

### 4.2 Verificar Deploy

1. En Railway, ve a **"Deployments"**
2. Debería mostrar estado **"Success"**
3. Haz clic en la URL generada

Deberías ver tu app en vivo 🎉

---

## 🌐 PASO 5: Configurar Dominio Personalizado

### Opción A: Subdominio Railway (Gratis)

Tu app está en: `https://dermatologia-stefany.railway.app`

Listo, ¡no hay que hacer nada! 🎉

### Opción B: Tu Propio Dominio

Si tienes dominio personalizado como `dermatologia-stefany.com`:

#### 5B.1 En Railway

1. Ve a tu proyecto → **"Settings"**
2. Busca **"Custom Domain"**
3. Ingresa: `dermatologia-stefany.com`
4. Haz clic en **"Generate Domain"**

#### 5B.2 En tu Proveedor de Dominio

Railway te dirá qué CNAME agregar. Ejemplo:

```
CNAME: dermatologia-stefany.com
Points to: cname.railway.app
```

1. Ve a tu proveedor (Namecheap, GoDaddy, etc)
2. Zona DNS → Agregar CNAME
3. Agrega el registro que te mostró Railway
4. Espera 5-10 minutos

#### 5B.3 Verificar

```bash
ping dermatologia-stefany.com
# Debería resolver a IP de Railway
```

---

## 🔐 HTTPS Automático

### ¿Es automático?

✅ SÍ, completamente automático

Railway automáticamente:
- Obtiene certificado SSL de Let's Encrypt
- Lo renueva cada 90 días
- No requiere configuración

**Verificar HTTPS:**
```
En navegador: https://tu-dominio.com
Debería mostrar 🔒 (candado verde)
```

---

## 📊 PASO 6: Monitoreo

### 6.1 Logs

Para ver qué pasa en tu app:

1. Ve a **"Logs"** en Railway
2. Filtra por tipo de log:
   - `stdout` - Tu app output
   - `stderr` - Errores
   - `deployment` - Deploy info

### 6.2 Metrics

Para monitorear performance:

1. Ve a **"Metrics"**
2. Revisa:
   - CPU usage (debe ser < 50%)
   - Memory (debe ser < 256MB)
   - Network in/out
   - Requests per second

### 6.3 Alertas

Configura alertas para:
- Deployment fallido
- App crash
- High resource usage

---

## 🔄 PASO 7: Redeploy Automático

Cada vez que hagas `git push`:

1. GitHub notifica a Railway
2. Railway automáticamente descarga cambios
3. Ejecuta `npm install` y `npm start`
4. Nueva versión en vivo en 1-2 minutos

**No necesitas hacer nada más** 🎉

### Verificar Deploy Status

```bash
# En tu repo local
git push origin main

# En Railway, ve a "Deployments"
# Deberías ver nuevo deploy en progreso
```

---

## 🐛 PASO 8: Debugging

### Si ves error "Application Failed to Start"

1. Ve a **"Logs"** en Railway
2. Revisa el último log
3. Busca línea de error

**Errores comunes:**

```
Error: Cannot find module '@sendgrid/mail'
Solución: Ejecuta npm install en local, commit package-lock.json

Error: SENDGRID_API_KEY is undefined
Solución: Agrega la variable en Railway → Variables

Error: Port already in use
Solución: Cambia PORT en variables
```

### Si ves error "Database connection failed"

```
Asegúrate que:
1. DATABASE_URL está en variables
2. Base de datos está corriendo
3. Credenciales son correctas
```

### Ver detalles de error

```bash
# Conéctate vía SSH (Railway Pro)
railway shell
tail -f /logs/app.log
```

---

## 🔒 PASO 9: Backups de Base de Datos

### Para SQLite

Railway guarda automáticamente, pero para seguridad:

```bash
# Descargar backup
railway run sqlite3 dermatologia.db ".backup 'backup_$(date +%Y%m%d).db'"

# Guardar en tu compu o Drive
```

### Para PostgreSQL

Railway proporciona backups automáticos cada 24h. 

Para acceder:
1. Ve a la base de datos → **"Backups"**
2. Descarga el backup que necesites

---

## 💰 PASO 10: Monitoreo de Costos

### Créditos Gratuitos

Railway da **$5 USD de crédito** cada mes:

```
$5 / mes permite:
✅ 1 app Node.js
✅ 1 database PostgreSQL
✅ Tráfico ilimitado
✅ Uptime 99.9%
```

### Monitoreo de Uso

1. Ve a **"Billing"** en Railway
2. Ves:
   - Créditos usados
   - Créditos restantes
   - Proyección del mes

### Si excedes $5

- El proyecto se pausa automáticamente
- O pagas el exceso con tarjeta de crédito
- Para parar pagos, elimina app

---

## 🆘 Troubleshooting

### App se cayó

```
1. Ve a Railway → Logs
2. Revisa el último error
3. Haz git push para redeploy
4. Si persiste, contacta soporte
```

### Emails no se envían

```
1. Revisa que SENDGRID_API_KEY esté en variables
2. Verifica que EMAIL_FROM sea válido en SendGrid
3. Revisa logs para ver error exacto
4. Prueba desde navegador: /api/test-email
```

### Sitio muy lento

```
1. Ve a Metrics
2. Si CPU > 80%, necesita más recursos
3. Upgrade a plan Railway Pro
4. O optimiza código para usar menos CPU
```

### Database llena

```
1. Si usas SQLite: descarga y limpia
2. Si usas PostgreSQL: aumenta storage en Railway
```

---

## 🎯 Checklist de Deployment

- [ ] Crédito GitHub
- [ ] Repositorio conectado a Railway
- [ ] Variables de entorno agregadas
- [ ] Deploy exitoso (verde)
- [ ] App responde en URL
- [ ] HTTPS funciona (candado verde)
- [ ] Emails se envían
- [ ] Admin login funciona
- [ ] Solicitud de turno funciona
- [ ] Base de datos persiste

---

## 📝 Post-Deployment

### Cambiar Contraseña Admin

```
1. Accede a: https://tu-app.railway.app
2. Haz click en "Admin Login"
3. Email: admin@dermatologia.com
4. Contraseña: 123456
5. Haz clic en "Cambiar Contraseña"
6. Crea contraseña fuerte
7. Guarda en password manager
```

### Verificar Emails

```
1. Ve a: https://tu-app.railway.app
2. Rellena "Solicitar Turno"
3. Debería recibir email en segundos
4. Verifica bandeja de spam si no llega
```

### Configurar Google Analytics

```
1. Ve a Google Analytics 4
2. Crea nueva propiedad
3. Obtén ID de medición
4. Agrega a index.html:
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
```

---

## 🚀 Siguiente Paso

Una vez deployado:

1. ✅ Cambiar contraseña admin
2. ✅ Configurar dominio personalizado
3. ✅ Enviar link a Dra. Stefany para testing
4. ✅ Configurar Google Business
5. ✅ Lanzamiento público 🎉

---

## 📞 Soporte

- **Railway Docs:** https://docs.railway.app/
- **Railway Support:** https://railway.app/support
- **Railway Status:** https://status.railway.app/

---

## 🎉 ¡Listo!

Tu app está en producción con:
- ✅ HTTPS/SSL automático
- ✅ Dominio personalizado
- ✅ Base de datos en la nube
- ✅ Monitoreo 24/7
- ✅ Backups automáticos
- ✅ Escalabilidad ilimitada

**Tu sitio de dermatología es ahora profesional y está en vivo! 🚀**

