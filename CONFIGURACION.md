# ⚙️ GUÍA DE CONFIGURACIÓN - Sitio Web Dermatología

Esta guía te ayudará a personalizar completamente el sitio web en minutos.

## 🚀 PASO 1: INFORMACIÓN BÁSICA

### 1.1 Cambiar Nombre de la Dermatóloga

**Archivo**: `index.html`

Busca y reemplaza `[Nombre]` con el nombre completo:

```html
<!-- ANTES -->
<h1>Dra. [Nombre]</h1>

<!-- DESPUÉS -->
<h1>Dra. María García López</h1>
```

**Ubicaciones a cambiar**:
- Navbar (línea ~50)
- Sección Hero (línea ~80)
- Blog articles (línea ~100+)
- Footer (línea ~400)

### 1.2 Cambiar Información de Contacto

**Archivo**: `index.html`

En la sección **CONTACTO** (línea ~350):

```html
<!-- DIRECCIÓN -->
<p>[Dirección del consultorio]<br>Buenos Aires, Argentina</p>
<!-- Cambiar a: -->
<p>Av. Córdoba 1234, Piso 5<br>C1405, Buenos Aires, Argentina</p>

<!-- TELÉFONO -->
<p>[Número de teléfono]</p>
<!-- Cambiar a: -->
<p>(011) 4123-4567 / WhatsApp: +54 9 11 2123-4567</p>

<!-- EMAIL -->
<p>[Correo electrónico]</p>
<!-- Cambiar a: -->
<p>contacto@dermatologia-dra.com.ar</p>
```

### 1.3 Actualizar Email del Formulario

**Archivo**: `js/script.js` (línea ~40)

```javascript
// ANTES
const mailtoLink = `mailto:contacto@dermatologia.com?subject=...`;

// DESPUÉS
const mailtoLink = `mailto:contacto@dermatologia-dra.com.ar?subject=...`;
```

---

## 🎨 PASO 2: PERSONALIZACIÓN DE COLORES

**Archivo**: `css/style.css` (líneas 7-14)

El sitio usa variables CSS. Cambia estos valores para una personalización completa:

### Paleta Actual (Azul + Verde)
```css
:root {
    --primary-color: #0066cc;      /* Azul principal */
    --primary-dark: #004999;       /* Azul oscuro */
    --secondary-color: #2ecc71;    /* Verde */
    --light-bg: #f8f9fa;          /* Gris claro */
    --text-dark: #2c3e50;         /* Texto oscuro */
    --text-light: #7f8c8d;        /* Texto claro */
    --border-color: #ecf0f1;      /* Bordes */
}
```

### Paleta Alternativa: Rosa + Púrpura
```css
:root {
    --primary-color: #e91e63;      /* Rosa */
    --primary-dark: #c2185b;       /* Rosa oscuro */
    --secondary-color: #9c27b0;    /* Púrpura */
    --light-bg: #f8f9fa;
    --text-dark: #2c3e50;
    --text-light: #7f8c8d;
    --border-color: #ecf0f1;
}
```

### Paleta Alternativa: Verde + Azul Marino
```css
:root {
    --primary-color: #16a085;      /* Verde profesional */
    --primary-dark: #0e5f47;       /* Verde oscuro */
    --secondary-color: #2c3e50;    /* Azul marino */
    --light-bg: #ecf0f1;
    --text-dark: #2c3e50;
    --text-light: #34495e;
    --border-color: #bdc3c7;
}
```

### Herramientas para Elegir Colores
- [Coolors.co](https://coolors.co) - Paletas de colores
- [ColorHunt.co](https://colorhunt.co) - Inspiración
- [Adobe Color](https://color.adobe.com) - Generador profesional

---

## 📸 PASO 3: AGREGAR FOTOS

### 3.1 Foto de Perfil

**Archivo**: `index.html` (Sección "Sobre Mí")

```html
<!-- ANTES -->
<div class="image-placeholder">
    <span>Foto de Perfil</span>
</div>

<!-- DESPUÉS -->
<div class="image-placeholder">
    <img src="img/dra-perfil.jpg" alt="Dra. María García - Dermatóloga UBA">
</div>
```

**Actualizar CSS** en `css/style.css`:

```css
.image-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}
```

### 3.2 Estructura de Carpetas Recomendada

```
/
├── img/
│   ├── dra-perfil.jpg
│   ├── consultorio.jpg
│   ├── equipo.jpg
│   └── testimonios/
│       ├── paciente1.jpg
│       └── paciente2.jpg
├── index.html
├── css/
└── js/
```

### 3.3 Recomendaciones de Imágenes

- **Formato**: JPG (fotos) o PNG (gráficos)
- **Tamaño**: Máx 500KB por imagen
- **Dimensiones**: 
  - Perfil: 400x400px
  - Consultorio: 1200x800px
- **Optimización**: Usa [TinyJPG](https://tinyjpg.com) para comprimir

---

## 🏥 PASO 4: AGREGAR LOGO

### 4.1 Cambiar Emoji por Logo

**Archivo**: `index.html` (línea ~48)

```html
<!-- ANTES (Emoji) -->
<span class="logo-icon">🏥</span>

<!-- DESPUÉS (Imagen) -->
<img src="img/logo.png" alt="Logo" class="logo-img">
```

### 4.2 Agregar CSS para el Logo

**Archivo**: `css/style.css`

```css
.logo-img {
    height: 50px;
    width: auto;
    margin-right: 10px;
}
```

---

## 📝 PASO 5: ESCRIBIR ARTÍCULOS DEL BLOG

### 5.1 Estructura de Artículos

**Archivo**: `index.html` (Sección BLOG, línea ~300)

Para agregar un nuevo artículo, duplica esta estructura:

```html
<article class="blog-card">
    <div class="blog-header">
        <span class="blog-category">Categoría</span>
        <span class="blog-date">Mes 2024</span>
    </div>
    <h3>Título del Artículo</h3>
    <p>Descripción breve (2-3 líneas del tema principal)...</p>
    <a href="blog-articulo.html" class="read-more">Leer más →</a>
</article>
```

### 5.2 Categorías Recomendadas
- **Inflamación**: Acné, Psoriasis, Rosácea
- **Alergia**: Dermatitis, Urticaria
- **Infecciones**: Hongos, Verrugas
- **Pigmentación**: Vitiligo, Melasma
- **Prevención**: Protección Solar, Cáncer de Piel
- **Cosmética**: Anti-envejecimiento, Procedimientos
- **Pediatría**: Problemas en niños

### 5.3 Crear Página de Artículo Completo

Usa `blog-articulos.html` como plantilla:

```html
<article class="blog-article">
    <div class="article-header">
        <h1>Título del Artículo</h1>
        <div class="article-meta">
            <span>📅 Fecha</span>
            <span>👤 Dra. [Nombre]</span>
            <span>🏷️ Categoría</span>
        </div>
    </div>
    
    <div class="article-content">
        <!-- Contenido aquí -->
    </div>
</article>
```

---

## 📱 PASO 6: AGREGAR INFORMACIÓN DE HORARIOS

**Archivo**: `index.html` (Sección CONTACTO)

```html
<div class="info-item">
    <h3>🕐 Horarios</h3>
    <p>
        Lunes a Viernes: 9:00 - 18:00<br>
        Sábado: Por cita previa<br>
        Domingos y feriados: Cerrado
    </p>
</div>
```

---

## 🌐 PASO 7: DESPLEGAR EN LÍNEA

### Opción A: GitHub Pages (RECOMENDADO - GRATIS)

#### 1. Crear repositorio en GitHub
1. Ve a [github.com/new](https://github.com/new)
2. Nombre: `dermatologia-sitio` (o similar)
3. Descripción: "Sitio web profesional de dermatología"
4. Marcar: "Public"
5. Crear repositorio

#### 2. Subir archivos
```bash
# En terminal en la carpeta del proyecto
git init
git add .
git commit -m "Initial commit - Sitio web dermatología"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/dermatologia-sitio.git
git push -u origin main
```

#### 3. Activar GitHub Pages
1. Ve a Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` | Folder: `/ (root)`
4. Save

**Tu sitio estará en**: `https://tu-usuario.github.io/dermatologia-sitio/`

### Opción B: Netlify (ALTERNATIVA GRATUITA)

1. Ve a [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Conecta tu repositorio GitHub
4. Deploy settings: Leave defaults
5. ¡Listo! Netlify crea el sitio automáticamente

---

## 🔍 PASO 8: DOMINIO PERSONALIZADO

### Comprar Dominio
- [.ar](https://nic.ar) - Dominios argentinos
- [Namecheap.com](https://namecheap.com)
- [Google Domains](https://domains.google)

### Configurar en GitHub Pages
1. Settings → Pages
2. Custom domain: `dermatologia-dra.com.ar`
3. Enforce HTTPS: ✓ (Marcar)

### Configurar DNS
En tu registrador, añade:
```
CNAME: dermatologia-dra.com.ar → tu-usuario.github.io
```

---

## 📧 PASO 9: EMAIL PROFESIONAL

### Opción 1: Gmail Profesional
1. Ve a [Google Workspace](https://workspace.google.com)
2. Obtén email: `contacto@dermatologia-dra.com.ar`
3. Sincroniza con Gmail

### Opción 2: Email con Hosting
Compra hosting con email incluido:
- [Hostinger](https://hostinger.com.ar)
- [Bluehost](https://bluehost.com)
- [Namecheap](https://namecheap.com)

---

## 🔐 PASO 10: SEGURIDAD Y PRIVACIDAD

### Certificado SSL
- ✓ Automático en GitHub Pages y Netlify
- Verificar: URL comienza con `https://`

### Política de Privacidad
Crear archivo `privacidad.html`:

```html
<h1>Política de Privacidad</h1>
<p>En [Nombre Consultorio], respetamos tu privacidad...</p>
```

Agregar link en footer:
```html
<a href="privacidad.html">Política de Privacidad</a>
```

---

## 🎯 LISTA DE VERIFICACIÓN

- [ ] Cambiar nombre de dermatóloga
- [ ] Actualizar información de contacto
- [ ] Agregar foto de perfil
- [ ] Personalizar colores si deseas
- [ ] Escribir/personalizar artículos de blog
- [ ] Agregar logo profesional
- [ ] Configurar dominio
- [ ] Desplegar en GitHub Pages/Netlify
- [ ] Probar en móvil y desktop
- [ ] Agregar a Google Search Console

---

## 📞 AYUDA RÁPIDA

**¿Cómo agregar WhatsApp Business?**
```html
<a href="https://wa.me/5491123456789" target="_blank">
    Contactar por WhatsApp
</a>
```

**¿Cómo agregar mapa de ubicación?**
```html
<iframe src="https://www.google.com/maps/embed?pb=..." 
    width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy">
</iframe>
```

**¿Cómo agregar galería de fotos?**
Usar [LightGallery](https://www.lightgalleryjs.com/) o crear grid CSS simple.

---

## 🚀 PRÓXIMOS PASOS AVANZADOS

1. **SEO**: Registrar en Google Search Console
2. **Analytics**: Agregar Google Analytics 4
3. **Chat**: Implementar Chatbot con IA
4. **Citas**: Integrar sistema de reservas
5. **Blog**: Migrar a CMS como WordPress
6. **E-commerce**: Vender productos/servicios

---

**Última actualización**: Octubre 2026
**Versión**: 1.0
**Soporte**: Para preguntas, consulta la documentación oficial de cada plataforma
