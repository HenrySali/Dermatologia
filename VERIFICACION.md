# ✅ LISTA DE VERIFICACIÓN - Antes de Publicar

Usa esta lista para asegurarte de que todo está listo antes de desplegar el sitio.

## 🔍 VERIFICACIÓN TÉCNICA

- [ ] Todos los archivos CSS están linkeados correctamente
- [ ] Todos los archivos JS están incluidos
- [ ] Los enlaces internos funcionan (Inicio, Sobre Mí, Servicios, etc.)
- [ ] El menú hamburguesa funciona en móvil
- [ ] Los botones CTA redirigen a contacto
- [ ] El formulario valida emails correctamente
- [ ] Las imágenes se cargan sin errores (si las agregaste)
- [ ] No hay errores en la consola (F12 → Console)
- [ ] El sitio se carga en menos de 3 segundos

## 📱 VERIFICACIÓN RESPONSIVA

### Desktop (1200px+)
- [ ] Navbar completo y centrado
- [ ] Hero section con buen espaciado
- [ ] Grid de servicios 3 columnas
- [ ] Grid de blog 3 columnas
- [ ] Formulario al lado de contacto
- [ ] Footer visible y legible

### Tablet (768px - 1199px)
- [ ] Navbar aún funciona
- [ ] Menú sigue siendo horizontal
- [ ] Grids adaptan a 2 columnas
- [ ] Hero section sigue siendo visible
- [ ] Texto se adapta sin cortes

### Móvil (< 768px)
- [ ] Menú hamburguesa aparece
- [ ] Menú abre y cierra correctamente
- [ ] Grids cambian a 1 columna
- [ ] Hero section es legible
- [ ] Formulario cabe en pantalla
- [ ] Botones son clickeables (48px mínimo)
- [ ] No hay scroll horizontal

## 🎨 VERIFICACIÓN VISUAL

- [ ] Colores se ven profesionales
- [ ] Contraste texto/fondo es suficiente (WCAG AA)
- [ ] Fuentes se ven claras
- [ ] Espaciado entre elementos es consistente
- [ ] Bordes y esquinas redondeadas se ven bien
- [ ] Sombras no son demasiado pronunciadas

## ✍️ VERIFICACIÓN DE CONTENIDO

### Información Personal
- [ ] Nombre de la dermatóloga está correcto en TODO el sitio
- [ ] Email de contacto está actualizado
- [ ] Teléfono está correcto
- [ ] Dirección es precisa
- [ ] Horarios están actualizados
- [ ] Foto de perfil es profesional (si agregaste)

### Contenido
- [ ] Sección "Sobre Mí" explica formación en UBA
- [ ] 6 servicios están descriptos
- [ ] 6 artículos de blog existen
- [ ] Categorías de blog son apropiadas
- [ ] Fechas de blog son correctas
- [ ] No hay typos ni faltas de ortografía
- [ ] Disclaimer médico está incluido

## 🔐 VERIFICACIÓN DE SEGURIDAD

- [ ] Email del formulario está oculto (no visible en HTML)
- [ ] No hay datos personales reales en el código
- [ ] HTTPS está activado (si está en servidor)
- [ ] Política de privacidad está presente (si aplica)
- [ ] Términos de servicio están presentes (si aplica)
- [ ] Cookies policy está presente (si aplica)

## 🔍 VERIFICACIÓN SEO

- [ ] Meta description en HTML es descriptiva
- [ ] Título de página es relevante
- [ ] H1 existe y es único
- [ ] H2 y H3 están jerárquicamente correctos
- [ ] Imágenes tienen atributo alt
- [ ] URLs son limpias y descriptivas
- [ ] No hay contenido duplicado

## ⚡ VERIFICACIÓN DE PERFORMANCE

```bash
# Verificar velocidad de carga
# Visita: https://developers.google.com/speed/pagespeed/insights
```

- [ ] Páginas carga en < 3 segundos
- [ ] Images optimizadas (< 500KB cada una)
- [ ] CSS minimizado (si se necesita)
- [ ] JavaScript no bloquea rendering
- [ ] No hay requests 404
- [ ] No hay mixed content (http + https)

## 🧪 VERIFICACIÓN FUNCIONAL

### Navegación
- [ ] Todos los links navegan correctamente
- [ ] No hay links rotos
- [ ] Links externos abren en nueva pestaña (si aplica)
- [ ] Smooth scroll funciona en todos los navegadores

### Formulario
- [ ] Validación de email funciona
- [ ] Validación de campos requeridos funciona
- [ ] Submit button no está deshabilitado
- [ ] Mensaje de éxito aparece
- [ ] Email se envía (o se prepara para envío)

### Interactividad
- [ ] Hover effects funcionan en desktop
- [ ] Touch events funcionan en móvil
- [ ] Animaciones son suaves
- [ ] No hay lag o stuttering

## 🌐 VERIFICACIÓN DE COMPATIBILIDAD

### Navegadores Desktop
- [ ] Chrome/Edge (versión actual)
- [ ] Firefox (versión actual)
- [ ] Safari (versión actual)
- [ ] Opera (versión actual)

### Navegadores Móvil
- [ ] Safari iOS (versión actual)
- [ ] Chrome Android (versión actual)
- [ ] Samsung Internet (versión actual)

### Dispositivos
- [ ] iPhone (último modelo)
- [ ] Android (Samsung, etc.)
- [ ] iPad / Tablet
- [ ] Desktop

## 📊 VERIFICACIÓN ANALYTICS

- [ ] Google Analytics está configurado (si lo deseas)
- [ ] Google Search Console está verificado
- [ ] Sitemap.xml existe (si aplica)
- [ ] Robots.txt existe (si aplica)

## 🚀 VERIFICACIÓN DE DESPLIEGUE

### Si usas GitHub Pages
- [ ] Repositorio está público
- [ ] Branch main tiene todos los archivos
- [ ] GitHub Pages está habilitado
- [ ] Dominio personalizado está configurado (si aplica)
- [ ] HTTPS está forzado (en Settings)

### Si usas Netlify
- [ ] Conexión a GitHub está activa
- [ ] Deploy automático está habilitado
- [ ] Variables de entorno están configuradas (si aplica)
- [ ] Dominio personalizado está apuntando correctamente
- [ ] HTTPS está automatizado

### Si usas Hosting Tradicional
- [ ] Archivos están en la carpeta correcta
- [ ] Permisos de archivos son 644/755
- [ ] .htaccess está configurado (si es Apache)
- [ ] HTTPS está activado
- [ ] DNS está apuntando correctamente

## 📞 VERIFICACIÓN DE CONTACTO

- [ ] Teléfono es clickeable en móvil (`tel:` link)
- [ ] Email es clickeable (`mailto:` link)
- [ ] WhatsApp link funciona (si lo incluiste)
- [ ] Mapa de Google está embebido (si lo incluiste)
- [ ] Direcciones están completas y precisas

## 📝 VERIFICACIÓN LEGAL

- [ ] Disclaimer médico está presente
- [ ] No hay recomendaciones médicas específicas
- [ ] No hay garantías de resultados
- [ ] Privacidad del paciente se respeta
- [ ] Consentimiento informado (si aplica)

## 🎯 CHECKLIST FINAL

### Antes de Publicar
- [ ] 48 horas sin encontrar problemas
- [ ] Probado en múltiples navegadores
- [ ] Probado en múltiples dispositivos
- [ ] Todos los links funcionan
- [ ] No hay contenido faltante
- [ ] No hay typos ni errores

### Post-Publicación
- [ ] Sitio está en línea y funciona
- [ ] Se puede acceder desde cualquier navegador
- [ ] Google Search Console reporta el sitio
- [ ] Email de contacto recibe mensajes
- [ ] Formatos se ven correctamente

## 📋 TABLA DE PRIORIDADES

| Tarea | Prioridad | Completado |
|-------|-----------|-----------|
| Cambiar nombre | 🔴 ALTA | ☐ |
| Info de contacto | 🔴 ALTA | ☐ |
| Foto de perfil | 🟠 MEDIA | ☐ |
| Artículos del blog | 🟠 MEDIA | ☐ |
| Personalizar colores | 🟡 BAJA | ☐ |
| Agregar logo | 🟡 BAJA | ☐ |
| Dominio personalizado | 🟡 BAJA | ☐ |

---

## 🆘 SOLUCIÓN DE PROBLEMAS COMUNES

### El sitio no carga
- [ ] Verificar conexión a internet
- [ ] Limpiar caché (Ctrl+Shift+Del)
- [ ] Recargar página (Ctrl+F5)
- [ ] Verificar consola (F12 → Console) para errores

### Menú hamburguesa no funciona
- [ ] Verificar que js/script.js está linkeado
- [ ] Verificar que JavaScript está habilitado
- [ ] Revisar consola para errores

### Formulario no envía
- [ ] Verificar que email está actualizado en script.js
- [ ] Verificar que cliente de email está instalado
- [ ] Agregar mailto alternativo

### Imágenes no se ven
- [ ] Verificar que rutas son correctas
- [ ] Verificar que archivos existen
- [ ] Verificar permisos de archivos

### Sitio lento
- [ ] Optimizar imágenes
- [ ] Minificar CSS/JS
- [ ] Usar CDN si es posible

---

## 📞 CONTACTO DE SOPORTE

Si tienes problemas, verifica:

1. **Documentación incluida**:
   - README.md
   - CONFIGURACION.md
   - GUIA-CONTENIDO-DERMATOLOGIA.md

2. **Recursos externos**:
   - [MDN Web Docs](https://developer.mozilla.org)
   - [W3Schools](https://w3schools.com)
   - [Stack Overflow](https://stackoverflow.com)

3. **Contacto técnico**:
   - GitHub Issues (si lo necesitas)
   - Email de soporte (si tienes hosting pagado)

---

**✅ Una vez completada esta lista, ¡tu sitio está listo para publicar!**

---

**Última actualización**: Octubre 2026
**Versión**: 1.0
