# 🏥 Sitio Web de Dermatología - Profesional & Moderno

Bienvenido al sitio web profesional para tu hermana dermatóloga egresada de la Universidad de Buenos Aires (UBA).

## 📋 Características

✅ **Diseño Responsivo** - Se adapta perfectamente a celulares, tablets y computadoras
✅ **Profesional & Moderno** - Colores corporativos en azul y verde
✅ **Navegación Intuitiva** - Menú pegajoso y enlaces suave
✅ **Blog Educativo** - 6 artículos sobre enfermedades dermatológicas comunes
✅ **Formulario de Contacto** - Integración con cliente de email
✅ **Información UBA** - Destaca su formación académica de prestigio
✅ **SEO Optimizado** - Básico listo para mejorar
✅ **Sin dependencias externas** - HTML, CSS y JavaScript vanilla

## 📁 Estructura de Archivos

```
/
├── index.html           # Página principal
├── css/
│   └── style.css       # Estilos completos
├── js/
│   └── script.js       # Interactividad
└── README.md           # Este archivo
```

## 🎯 Secciones Principales

### 1. **Navegación (Navbar)**
- Logo con ícono
- Menú de navegación responsivo
- Botón de contacto destacado
- Menú hamburguesa para móviles

### 2. **Hero Section**
- Título principal atractivo
- Subtítulo con mención a UBA
- Botón CTA (Call To Action)

### 3. **Sobre Mí**
- Presentación profesional
- Credenciales educativas (UBA)
- Información de experiencia
- Espacio para foto de perfil

### 4. **Servicios**
6 servicios dermatológicos:
- Diagnóstico Dermatológico
- Tratamientos Médicos
- Procedimientos Estéticos
- Protección Solar
- Dermatopatología
- Dermatología Pediátrica

### 5. **Blog**
6 artículos informativos sobre:
- Acné
- Psoriasis
- Dermatitis Atópica
- Vitiligo
- Infecciones Fúngicas
- Protección Solar

### 6. **Contacto**
- Formulario de contacto funcional
- Información de ubicación
- Teléfono
- Email
- Horarios

### 7. **Footer**
- Información de copyright
- Disclaimer médico

## 🚀 Personalización

### Paso 1: Cambiar Nombre
Busca y reemplaza `[Nombre]` en `index.html` con el nombre de tu hermana:
```html
<h1>Dra. María García</h1>
```

### Paso 2: Agregar Información de Contacto
En la sección **CONTACTO**, actualiza:
```html
<p>[Dirección del consultorio]<br>Buenos Aires, Argentina</p>
<p>[Número de teléfono]</p>
<p>[Correo electrónico]</p>
```

Y en el formulario, actualiza el email destino:
```javascript
const mailtoLink = `mailto:email@ejemplo.com?subject=...`;
```

### Paso 3: Agregar Foto de Perfil
Reemplaza el placeholder de imagen en la sección "Sobre Mí":
```html
<div class="image-placeholder">
    <img src="ruta/a/foto.jpg" alt="Foto de Perfil">
</div>
```

Y ajusta el CSS:
```css
.image-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}
```

### Paso 4: Personalizar Colores
En `css/style.css`, modifica las variables de color:
```css
:root {
    --primary-color: #0066cc;      /* Azul principal */
    --primary-dark: #004999;       /* Azul oscuro */
    --secondary-color: #2ecc71;    /* Verde complementario */
    /* ... más colores ... */
}
```

### Paso 5: Escribir Artículos del Blog
Duplica una tarjeta de blog en `index.html` y personaliza:
```html
<article class="blog-card">
    <div class="blog-header">
        <span class="blog-category">Categoría</span>
        <span class="blog-date">Fecha</span>
    </div>
    <h3>Título del Artículo</h3>
    <p>Descripción breve...</p>
    <a href="#" class="read-more">Leer más →</a>
</article>
```

## 🌐 Despliegue

### Opción 1: GitHub Pages (Recomendado - GRATIS)
1. Crea un repositorio en GitHub
2. Sube los archivos
3. En Settings → Pages, selecciona "Deploy from a branch"
4. Elige la rama `main` y guarda
5. ¡Tu sitio estará en línea en minutos!

**URL será:** `https://usuario.github.io/repo-name/`

### Opción 2: Netlify (GRATIS)
1. Sube el código a GitHub
2. Ve a [netlify.com](https://www.netlify.com)
3. Conecta tu repositorio
4. Netlify desplegará automáticamente

### Opción 3: Servidor Personal/Hosting
Sube los archivos vía FTP o SSH a tu hosting y configura el dominio.

## 📱 Funcionalidades JavaScript

### 1. Menú Responsivo
- Hamburguesa en pantallas pequeñas
- Se cierra al hacer clic en un link

### 2. Formulario de Contacto
- Validación básica
- Validación de email
- Abre cliente de email del usuario

### 3. Animaciones de Scroll
- Elementos aparecen al hacer scroll
- Transiciones suaves

### 4. Smooth Scroll
- Enlaces internos deslizan suavemente
- Compensación por altura del navbar

## 🎨 Temas de Contenido Sugeridos para el Blog

### Dermatología General
- Higiene de la piel diaria
- Tipos de piel y cuidados específicos
- Mitos sobre la piel

### Condiciones Inflamatorias
- Acné: tipos, causas, tratamientos
- Rosácea: desencadenantes y manejo
- Dermatitis de contacto

### Enfermedades Crónicas
- Psoriasis: opciones terapéuticas
- Dermatitis atópica: cuidados
- Vitiligo: tratamientos modernos

### Infecciones
- Hongos en la piel (micosis)
- Verrugas: prevención y tratamiento
- Infecciones bacterianas

### Estética y Prevención
- Protección solar: cómo aplicar correctamente
- Prevención del cáncer de piel
- Tratamientos anti-envejecimiento
- Cicatrices: opciones de tratamiento

### Dermatología Especializada
- Dermatología pediátrica
- Problemas de cabello (alopecia)
- Cambios de piel relacionados con la edad

## 🔒 Seguridad & Disclaimer

El sitio incluye un disclaimer médico en el footer. Se recomienda:
- Consultar con abogado para términos legales completos
- Implementar política de privacidad
- Cumplir con leyes locales de protección de datos

## 🛠️ Mejoras Futuras

- [ ] Agregar página individual para cada artículo del blog
- [ ] Implementar galería de antes/después
- [ ] Agregar testimonios de pacientes
- [ ] Sistema de citas online
- [ ] Búsqueda en el blog
- [ ] Integración con WhatsApp Business
- [ ] Chat en vivo
- [ ] Base de datos para gestionar consultas

## 📞 Soporte

¿Necesitas ayuda personalizando el sitio? Algunos puntos comunes:

**¿Cómo cambio los colores?**
Edita las variables en `css/style.css` línea 7-14.

**¿Cómo agrego más servicios?**
Duplica un `.service-card` en la sección servicios.

**¿Cómo funciona el formulario de contacto?**
Abre el cliente de email del usuario. Para email automático, necesitarías un backend (Node.js, PHP, etc.).

**¿Cómo agrego un logo?**
Reemplaza el emoji 🏥 en el navbar con una imagen:
```html
<img src="logo.png" alt="Logo" class="logo-img">
```

## 📄 Licencia

Este sitio es completamente personalizable. ¡Úsalo libremente!

---

**Creado con ❤️ para tu hermana dermatóloga egresada de UBA**

Última actualización: Octubre 2026
