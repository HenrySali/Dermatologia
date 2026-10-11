# 🔒 Guía de Seguridad - Dermatología Dra. Stefany Salinas

## 📋 Resumen

Este documento explica las medidas de seguridad implementadas y cómo mantener tu sitio protegido.

**Nivel de Seguridad Actual:** 🟢 PRODUCCIÓN-READY

---

## 🛡️ Medidas de Seguridad Implementadas

### 1. HTTPS/SSL
- ✅ HTTPS es OBLIGATORIO en producción
- ✅ Railway proporciona certificado automático
- ✅ Todas las conexiones encriptadas

### 2. Autenticación Segura
- ✅ JWT (JSON Web Tokens) con expiración de 30 días
- ✅ Contraseñas hasheadas con bcryptjs (10 salt rounds)
- ✅ Rate limiting en login (máx 5 intentos en 15 minutos)

### 3. Headers de Seguridad HTTP
- ✅ Helmet.js activo:
  - `X-Frame-Options: DENY` - Protege contra clickjacking
  - `X-Content-Type-Options: nosniff` - Previene MIME sniffing
  - `X-XSS-Protection` - Protección XSS
  - `Strict-Transport-Security` - Fuerza HTTPS
  - `Content-Security-Policy` - Permite solo contenido de origen

### 4. Validación de Entrada
- ✅ Body size limit: 10kb (previene payloads grandes)
- ✅ Email validation en formularios
- ✅ SQL injection: Parametrized queries en todas partes

### 5. CORS Configurado
- ✅ Whitelist de dominios permitidos
- ✅ Métodos HTTP restringidos
- ✅ Credenciales controladas

### 6. Rate Limiting
- ✅ Login: máx 5 intentos en 15 minutos
- ✅ API General: máx 30 requests por minuto
- ✅ Protege contra ataques de fuerza bruta

### 7. Variables de Entorno
- ✅ `.env` en .gitignore (nunca en repositorio)
- ✅ JWT_SECRET protegido
- ✅ SendGrid API Key protegida

---

## 🚀 Configuración de Producción en Railway

### Paso 1: Crear Secrets en Railway

1. Ve a tu proyecto en Railway.app
2. **Variables > Environment Variables**
3. Agrega SOLO estos secrets (no en .env):

```
JWT_SECRET=tu_clave_super_fuerte_minimo_32_caracteres
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=contacto@dermatologia-stefany.com
EMAIL_ADMIN=admin@dermatologia-stefany.com
APP_URL=https://tuapp.railway.app
NODE_ENV=production
```

### Paso 2: Proteger la Base de Datos

Railway automáticamente:
- ✅ Genera HTTPS
- ✅ Corre detrás de WAF (firewall de aplicación web)
- ✅ DDoS protection
- ✅ SSL/TLS termination

### Paso 3: Monitoreo

1. Activa logging en Railway
2. Configura alertas para errores
3. Revisa logs regularmente

---

## 🔑 Gestión de Contraseñas

### Admin (Dra. Stefany)

**Credenciales Iniciales:**
- Email: `admin@dermatologia.com`
- Contraseña: `123456`

**⚠️ IMPORTANTE - CAMBIAR INMEDIATAMENTE:**

1. Después del primer login
2. Ve a "Cambiar Contraseña"
3. Crea una contraseña fuerte:
   - ✅ Mínimo 12 caracteres
   - ✅ Mayúsculas, minúsculas, números, símbolos
   - ✅ NO usar fechas o nombres
   - ✅ Ejemplos: `Derma2024!@#$` o `Stefan!App#92`

**Guardar Contraseña Segura:**
- Usa un password manager (1Password, Bitwarden, etc)
- NO guardes en email o notas de texto
- NO compartas con nadie

### Recuperación de Contraseña

Si olvidas la contraseña:
1. Accede a la BD directamente
2. O resetea desde línea de comandos:
   ```bash
   sqlite3 dermatologia.db
   UPDATE admin SET password = '$2a$10$...' WHERE email = 'admin@dermatologia.com';
   ```

---

## 🛡️ Protección de Datos de Pacientes

### Almacenamiento Seguro

Los datos de pacientes están protegidos por:

1. **Encriptación en Tránsito:**
   - HTTPS/TLS 1.3 (Railway)
   - SendGrid usa SSL para emails

2. **Base de Datos:**
   - SQLite en servidor seguro
   - Acceso restringido a admin autenticado
   - Backups automáticos (configurable)

3. **Campos Protegidos:**
   - Email (no mostrado en público)
   - Teléfono (solo en admin)
   - Historial médico (solo visible para Dra.)

### Política de Privacidad

Asegúrate que los pacientes aceptan:
- ✅ Recopilación de datos personales
- ✅ Uso para comunicaciones
- ✅ GDPR compliance (si tienes usuarios EU)
- ✅ Derecho a solicitar eliminación

Documento: `/app/politica-privacidad.html`

---

## 🔄 Backups de Base de Datos

### Backup Automático (Recomendado)

En producción, configura backups automáticos:

**Opción 1: Railway + Backup Externo**
```bash
# Cron job (cada día a las 3 AM)
0 3 * * * sqlite3 /app/dermatologia.db ".backup '/backup/derma_$(date +\%Y\%m\%d).db'"
```

**Opción 2: AWS S3 + Backup Script**
```javascript
// backup.js
import AWS from 'aws-sdk';
import fs from 'fs';

const s3 = new AWS.S3();

async function backupDatabase() {
    const file = fs.readFileSync('./dermatologia.db');
    const timestamp = new Date().toISOString();
    
    await s3.putObject({
        Bucket: 'dermatologia-backups',
        Key: `backup_${timestamp}.db`,
        Body: file
    }).promise();
    
    console.log('✅ Backup guardado en S3');
}

backupDatabase();
```

### Backup Manual

```bash
# Descargar base de datos
sqlite3 dermatologia.db ".backup './backup_manual.db'"

# Guardar en lugar seguro (Google Drive, OneDrive, etc)
```

---

## 📊 Monitoreo de Seguridad

### Logs para Revisar Regularmente

1. **Login Attempts:**
   ```bash
   grep "login" server.log
   grep "Error en la BD" server.log
   ```

2. **API Errors:**
   ```bash
   grep "error" server.log
   grep "403" server.log  # Acceso denegado
   grep "401" server.log  # No autenticado
   ```

3. **Rate Limit Hits:**
   ```bash
   grep "rate limit" server.log
   ```

### Dashboard de Railway

Revisa en Railway:
- ✅ CPU usage (debe ser < 50%)
- ✅ Memory usage (debe ser < 256MB)
- ✅ Network in/out
- ✅ Error rates

---

## 🚨 Incidentes de Seguridad

### Sospechas de Compromiso

Si sospechas que fue hackeado:

1. **Cambiar JWT_SECRET:**
   ```env
   JWT_SECRET=nueva_clave_generada_aleatoriamente
   ```
   Todos los usuarios tendrán que re-loguearse.

2. **Resetear Contraseña Admin:**
   - Accede a la BD
   - Cambia el hash de contraseña

3. **Revisar Logs:**
   - ¿Logins anormales?
   - ¿Cambios sin autorización?
   - ¿Información filtrada?

4. **Contactar a Railway:**
   - Soporte 24/7
   - Pueden resetear la app

---

## ✅ Checklist de Seguridad Mensual

- [ ] Revisar logs de login
- [ ] Verificar no hay intentos de fuerza bruta
- [ ] Probar backup de BD
- [ ] Actualizar dependencias npm
- [ ] Revisar policy de privacidad
- [ ] Verificar certificado SSL (Railway lo renueva automático)
- [ ] Monitoreo de uptime (99.9%+)
- [ ] Revisar ancho de banda usado

---

## 📚 Recursos de Seguridad

### Estándares que Cumplimos

- ✅ **OWASP Top 10:** Protegidos contra vulnerabilidades comunes
- ✅ **GDPR:** Recopilación consentida de datos
- ✅ **PCI DSS:** Si tomamos pagos (futuro)
- ✅ **HIPAA:** Datos de pacientes protegidos (info médica)

### Enlaces Útiles

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Helmet.js Docs: https://helmetjs.github.io/
- JWT Best Practices: https://tools.ietf.org/html/rfc8725
- Railway Security: https://docs.railway.app/security

---

## 🎯 Plan de Mejora (Futuro)

### Nivel 2 de Seguridad (Mes 2-3)

- [ ] Autenticación 2FA (Two-Factor Authentication)
- [ ] Auditoría de cambios (quién, cuándo, qué)
- [ ] Encriptación de base de datos
- [ ] VPN para acceso admin
- [ ] Seguro de responsabilidad civil
- [ ] Cumplimiento legal completo

### Nivel 3 de Seguridad (Mes 4+)

- [ ] Penetration testing profesional
- [ ] SOC 2 Compliance
- [ ] Bug bounty program
- [ ] Auditoría de terceros
- [ ] Certificación médica de seguridad

---

## 🚀 Resumen de Seguridad

**Tu sitio es seguro cuando:**

✅ Corre en HTTPS (Railway lo proporciona)
✅ Tiene rate limiting (implementado)
✅ Usa contraseñas hasheadas (bcrypt)
✅ Validación de entrada (implementado)
✅ CORS configurado (implementado)
✅ Headers de seguridad (Helmet.js)
✅ Backups regulares (tu responsabilidad)
✅ Monitoreo de logs (tu responsabilidad)

**Tu responsabilidad:**

1. Cambiar contraseña admin default AHORA
2. Guardar JWT_SECRET y API Keys en Railway, no en código
3. Hacer backups de la BD regularmente
4. Revisar logs mensualmente
5. Actualizar dependencias npm periódicamente
6. Mantener vigencia del certificado SSL (Railway lo hace auto)

---

## 🆘 Contactos de Soporte

- **Railway Support:** https://railway.app/support
- **SendGrid Security:** security@sendgrid.com
- **OWASP Help:** https://owasp.org/

---

**¡Tu sitio está protegido! 🔒**

Implementaste las 5 medidas de seguridad más importantes para un sitio médico.

