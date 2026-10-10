# ▶️ CÓMO EJECUTAR LA APLICACIÓN

Tu aplicación de dermatología está lista. Aquí hay dos formas de usarla:

## 🏃 OPCIÓN 1: Ejecutar Localmente (Para Desarrollo)

### Paso 1: Instalar dependencias

```bash
cd app
npm install
```

**Esto descargará:**
- Express (servidor web)
- SQLite3 (base de datos)
- Bcrypt (seguridad)
- JWT (autenticación)

### Paso 2: Iniciar el servidor

```bash
npm start
```

Deberías ver:

```
╔════════════════════════════════════════════════════════════╗
║         🏥 SISTEMA DE DERMATOLOGÍA INICIADO 🏥            ║
╚════════════════════════════════════════════════════════════╝

✅ Servidor corriendo en: http://localhost:3000
✅ Base de datos: dermatologia.db
✅ API disponible en: http://localhost:3000/api

📋 CREDENCIALES POR DEFECTO:
   Email: admin@dermatologia.com
   Contraseña: 123456
   ⚠️  IMPORTANTE: Cambiar la contraseña después del primer login
```

### Paso 3: Abrir en el navegador

Ve a: **http://localhost:3000**

## 🌐 OPCIÓN 2: Desplegar en Línea (Para Producción)

### Recomendación: Railway.app (Gratis y Fácil)

Railway.app es perfecto para desplegar Node.js + SQLite gratis.

#### Pasos:

1. **Crea cuenta en Railway**: https://railway.app

2. **Conecta tu repositorio GitHub**:
   - Click en "New Project"
   - Selecciona "Deploy from GitHub"
   - Conecta tu repo `HenrySali/Dermatologia`

3. **Railway detectará Node.js automáticamente**

4. **Tu app estará en línea en unos minutos**

Tu URL será algo como: `https://dermatologia-prod-abc123.up.railway.app`

### Alternativas de Hosting:

| Servicio | Precio | Pros | Contras |
|----------|--------|------|---------|
| Railway | Gratis | Fácil, rápido | Limitado |
| Render | Gratis | Bueno para full-stack | Sleeps en inactivo |
| Heroku | Pagado | Muy confiable | Caro |
| Vercel | Gratis | Optimizado | No soporta Socket.io |

## 📋 Flujo de Uso

### Para Pacientes (Público):

1. Abrir sitio web
2. Ver información profesional
3. Click en "Solicitar Turno"
4. Llenar formulario
5. Sistema crea paciente y turno automáticamente
6. Status: "pendiente"

### Para la Dermatóloga (Admin):

1. Click en botón "📊 Admin" (arriba a la derecha)
2. Iniciar sesión:
   - Email: `admin@dermatologia.com`
   - Contraseña: `123456`

3. **Dashboard**: Ver estadísticas
   - Total pacientes
   - Turnos pendientes
   - Turnos confirmados
   - Próximo turno

4. **Turnos**: Gestionar citas
   - Ver todos los turnos
   - Crear nuevo turno
   - Editar (cambiar estado)
   - Eliminar

5. **Pacientes**: Gestionar datos
   - Ver todos los pacientes
   - Crear nuevo
   - Editar información
   - Eliminar

6. **Configuración**: Seguridad
   - Cambiar contraseña

## 🔐 Seguridad

### Primeras acciones:

1. **Cambiar contraseña**:
   - Admin → Configuración → Cambiar Contraseña
   - Antigua: `123456`
   - Nueva: `tu_contraseña_fuerte`

2. **Cambiar email (opcional)**:
   - Editar en base de datos (manual)
   - O crear nuevo admin

## 💾 Datos

### Ubicación de la BD:
- Archivo: `app/dermatologia.db`
- Tipo: SQLite3 (archivo local)
- Respaldo: Hacer backup regular de este archivo

### Hacer backup:
```bash
cp app/dermatologia.db app/dermatologia.db.backup
```

### Restaurar backup:
```bash
cp app/dermatologia.db.backup app/dermatologia.db
```

## 🔄 Sincronización

### Los datos se sincronizan automáticamente:

- Paciente solicita turno → BD actualiza
- Admin confirma turno → Cambio inmediato
- Admin cambia contraseña → Asegurado

### No hay refresco manual necesario

## 🛑 Detener la aplicación

```bash
# Presiona Ctrl + C en la terminal
```

## 🚀 Desarrollo de la App

### Estructura del código:

**Frontend** (`app/index.html`, `app/js/app.js`, `app/css/app.css`):
- UI responsiva
- Manejo de secciones
- Llamadas a API

**Backend** (`app/server.js`):
- Rutas API REST
- Autenticación JWT
- Gestión de BD

**BD** (`app/dermatologia.db`):
- Tabla: `pacientes`
- Tabla: `turnos`
- Tabla: `admin`

## 📞 Problemas Comunes

### Puerto 3000 en uso

```bash
PORT=3001 npm start
# Abre: http://localhost:3001
```

### No carga la página

```bash
# Verificar que Node.js está instalado
node --version

# Verificar que npm instaló las dependencias
npm list
```

### Base de datos corrupta

```bash
# Eliminar y recrear
rm app/dermatologia.db
npm start
```

### Olvidé contraseña

```bash
# Opción 1: Eliminar BD (pierde datos)
rm app/dermatologia.db
npm start

# Opción 2: Editar directamente (avanzado)
# Usar SQLite Browser para editar admin table
```

## 📈 Métricas

### Rendimiento esperado:

- **Carga inicial**: < 1 segundo
- **Crear turno**: < 500ms
- **Listar pacientes**: < 100ms
- **Login**: < 200ms

## 🎯 Próximos Pasos

1. ✅ Ejecutar localmente
2. ✅ Probar flujo completo
3. ✅ Cambiar contraseña admin
4. ✅ Personalizar con info real
5. ✅ Desplegar en Railway/Render
6. ✅ Compartir URL con hermana

## 📚 Documentación

- `app/README.md` - Documentación técnica
- `app/server.js` - Código backend con comentarios
- `app/js/app.js` - Código frontend con comentarios

---

**¿Necesitas ayuda?**

```
Ejecutar localmente:
1. cd app
2. npm install
3. npm start
4. Abrir http://localhost:3000

¡Listo! Tu app está funcionando.
```

---

**Versión**: 1.0
**Última actualización**: Octubre 2026
