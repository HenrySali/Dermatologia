# 🏥 Sistema de Gestión de Dermatología

Aplicación completa para gestionar turnos, pacientes y administración de una clínica de dermatología.

## ✨ Características

✅ **Página Pública**
- Información profesional
- Solicitud de turnos
- Blog educativo
- Contacto

✅ **Panel Privado de Administración**
- Gestión de pacientes
- Gestión de turnos
- Dashboard estadístico
- Cambio de contraseña
- Autenticación con JWT

✅ **Tecnología**
- Backend: Node.js + Express
- BD: SQLite3
- Frontend: HTML/CSS/JavaScript
- Autenticación: JWT + Bcrypt

## 📋 Requisitos

- Node.js (v14 o superior)
- npm

## 🚀 Instalación

1. **Instalar dependencias:**

```bash
cd app
npm install
```

2. **Iniciar servidor:**

```bash
npm start
```

El servidor se ejecutará en: `http://localhost:3000`

## 🔐 Credenciales por Defecto

```
Email: admin@dermatologia.com
Contraseña: 123456
```

⚠️ **IMPORTANTE**: Cambiar la contraseña después del primer login

## 📁 Estructura

```
app/
├── server.js           # Servidor Express
├── package.json        # Dependencias
├── dermatologia.db     # Base de datos SQLite
├── index.html          # Frontend
├── css/
│   └── app.css         # Estilos
└── js/
    └── app.js          # Lógica frontend
```

## 🌐 Rutas API

### Autenticación
- `POST /api/auth/login` - Login

### Pacientes (requiere autenticación)
- `GET /api/pacientes` - Listar todos
- `POST /api/pacientes` - Crear (público)
- `GET /api/pacientes/:id` - Obtener uno
- `PUT /api/pacientes/:id` - Actualizar
- `DELETE /api/pacientes/:id` - Eliminar

### Turnos (requiere autenticación)
- `GET /api/turnos` - Listar todos
- `POST /api/turnos` - Crear (público)
- `GET /api/turnos/:id` - Obtener uno
- `PUT /api/turnos/:id` - Actualizar
- `DELETE /api/turnos/:id` - Eliminar

### Disponibilidad
- `GET /api/disponibilidad/:fecha` - Horas disponibles para una fecha

### Admin (requiere autenticación)
- `GET /api/admin/info` - Información del admin
- `POST /api/admin/cambiar-password` - Cambiar contraseña

## 📝 Notas Importantes

### Base de Datos
- Se crea automáticamente al iniciar el servidor
- Las tablas se crean automáticamente
- El usuario admin por defecto se crea en la primera ejecución

### Seguridad
- Las contraseñas se hashean con bcrypt
- La autenticación usa JWT
- Los tokens expiran después de 30 días
- La BD está en SQLite (archivo local)

### Despliegue
Para desplegar en producción:

1. Cambiar `JWT_SECRET` en `server.js`
2. Usar una base de datos remota si es necesario
3. Configurar HTTPS
4. Usar variables de entorno para configuración sensible

```javascript
// Cambiar esta línea:
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';
```

## 🐛 Troubleshooting

### Puerto en uso
```bash
# Usar puerto diferente
PORT=3001 npm start
```

### BD corrupta
```bash
# Eliminar BD y crear nueva
rm dermatologia.db
npm start
```

### Token expirado
- Limpiar localStorage en el navegador
- Volver a iniciar sesión

## 🔧 Variables de Entorno

```bash
PORT=3000              # Puerto del servidor
JWT_SECRET=clave       # Clave secreta para JWT
```

## 📚 Documentación Adicional

- Ver `../README.md` para información del proyecto general
- Ver `../CONFIGURACION.md` para personalización

## 💡 Próximas Mejoras

- [ ] Confirmación de turnos por email
- [ ] Recordatorios automáticos
- [ ] Galería de antes/después
- [ ] Historial médico de pacientes
- [ ] Reportes estadísticos
- [ ] Integración con WhatsApp
- [ ] Descarga de documentos

## 📞 Soporte

Para problemas o sugerencias, abre un issue en GitHub.

---

Creado para: Dra. [Nombre] - Egresada UBA
Última actualización: Octubre 2026
