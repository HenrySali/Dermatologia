# 🚀 GUÍA DE INICIO RÁPIDO - 5 Minutos

¡Bienvenido! Aquí está todo lo que necesitas hacer en los primeros 5 minutos para tener tu sitio personalizado.

---

## ⏱️ PASO 1: CAMBIAR NOMBRE (1 minuto)

### En el archivo `index.html`:

**Busca:**
```
[Nombre]
```

**Reemplaza con:**
```
María García López
```

✅ Lugares donde cambiar:
- Línea 49: Logo navbar
- Línea 77: Hero section
- Línea 100+: Footer

---

## ⏱️ PASO 2: AGREGAR INFO DE CONTACTO (2 minutos)

### En el archivo `index.html`, sección CONTACTO:

**Dirección:**
```html
<!-- ANTES -->
<p>[Dirección del consultorio]<br>Buenos Aires, Argentina</p>

<!-- DESPUÉS -->
<p>Av. Córdoba 1234, Piso 5<br>C1405, Buenos Aires</p>
```

**Teléfono:**
```html
<!-- ANTES -->
<p>[Número de teléfono]</p>

<!-- DESPUÉS -->
<p>(011) 4123-4567</p>
```

**Email:**
```html
<!-- ANTES -->
<p>[Correo electrónico]</p>

<!-- DESPUÉS -->
<p>contacto@dermatologia-dra.com.ar</p>
```

---

## ⏱️ PASO 3: ACTUALIZAR EMAIL DEL FORMULARIO (1 minuto)

### En el archivo `js/script.js`, línea ~40:

**Busca:**
```javascript
const mailtoLink = `mailto:contacto@dermatologia.com?subject=...`;
```

**Reemplaza con tu email:**
```javascript
const mailtoLink = `mailto:contacto@dermatologia-dra.com.ar?subject=...`;
```

---

## ⏱️ PASO 4: VERIFICAR QUE TODO FUNCIONA (1 minuto)

### Abrir en navegador:

1. Haz doble click en `index.html`
2. Verifica:
   - ✓ Nombre aparece en navbar
   - ✓ Menú navega (Inicio, Sobre Mí, etc.)
   - ✓ Botón "Solicitar Cita" funciona
   - ✓ Formulario carga
   - ✓ Se ve bien en celular

---

## 🎉 ¡LISTO!

Tu sitio está personalizado. Ahora elige cómo publicarlo:

### OPCIÓN A: GitHub Pages (GRATIS)

```bash
# En terminal:
git init
git add .
git commit -m "Sitio dermatología"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/nombre-repo.git
git push -u origin main
```

Luego en GitHub: Settings → Pages → Habilitar

**Tu sitio estará en:**
```
https://tu-usuario.github.io/nombre-repo/
```

### OPCIÓN B: Netlify (MÁS FÁCIL)

1. Ve a [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Conecta tu repositorio GitHub
4. ¡Listo! Se despliega automáticamente

---

## 📚 DOCUMENTACIÓN COMPLETA

Para personalización avanzada:

- 📖 **README.md** - Descripción completa
- ⚙️ **CONFIGURACION.md** - Pasos detallados
- 🎨 **DESCRIPCION-VISUAL.md** - Cómo se ve
- ✅ **VERIFICACION.md** - Antes de publicar
- 📚 **GUIA-CONTENIDO-DERMATOLOGIA.md** - Temas para blog

---

## 💡 PRÓXIMOS PASOS (Opcionales)

### Inmediatamente:
- [ ] Agregar foto de perfil (ver CONFIGURACION.md)
- [ ] Escribir 3 artículos de blog
- [ ] Comprar dominio personalizado

### Esta semana:
- [ ] Registrarse en Google Search Console
- [ ] Verificar en Google My Business
- [ ] Agregar a redes sociales

### Este mes:
- [ ] Crear 6+ artículos de blog
- [ ] Optimizar para SEO
- [ ] Agregar más contenido

---

## ❓ PREGUNTAS FRECUENTES

### ¿Dónde está [archivo]?

```
/projects/sandbox/
├── index.html          ← Página principal
├── css/style.css       ← Estilos
├── js/script.js        ← Interactividad
├── blog-articulos.html ← Ejemplo de blog
├── README.md           ← Documentación
└── CONFIGURACION.md    ← Guía de personalización
```

### ¿Cómo cambio los colores?

En `css/style.css`, líneas 7-14:
```css
:root {
    --primary-color: #0066cc;      /* Cambiar aquí */
    --secondary-color: #2ecc71;    /* Y aquí */
}
```

### ¿Cómo agrego una foto?

Crea carpeta `img/` y sube la foto. Luego en `index.html`:
```html
<img src="img/foto.jpg" alt="Foto">
```

### ¿El formulario envía emails?

El formulario abre el cliente de email del usuario. Para envío automático, necesitas backend (más complejo).

---

## 🎯 CHECKLIST FINAL

- [ ] Nombre de dermatóloga actualizado
- [ ] Información de contacto correcta
- [ ] Email del formulario actualizado
- [ ] Sitio funciona localmente
- [ ] Desplegado en GitHub Pages o Netlify
- [ ] URL está lista para compartir

---

## 📞 NECESITAS AYUDA?

1. **Errores técnicos**: Abre Developer Tools (F12) y verifica Console
2. **Preguntas generales**: Lee README.md
3. **Personalización**: Lee CONFIGURACION.md
4. **Problemas**: Consulta VERIFICACION.md

---

## 🚀 PRÓXIMA ACCIÓN

**¿Ya completaste estos 4 pasos?**

Si SÍ → Ve a CONFIGURACION.md para personalización avanzada

Si NO → Vuelve atrás y completa los pasos

---

**Creado con ❤️ para tu hermana dermatóloga egresada de UBA**

**Última actualización**: Octubre 2026
