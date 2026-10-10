# 🎨 DESCRIPCIÓN VISUAL DEL SITIO WEB

## 📺 Vista General de la Estructura

```
┌─────────────────────────────────────────────────────────────┐
│  🏥 DRA. [NOMBRE]  │  Inicio | Sobre Mí | Servicios | ... │ 
├─────────────────────────────────────────────────────────────┤
│                                                               │
│              ✨ BIENVENIDA A LA CLÍNICA ✨                   │
│     Tratamiento especializado para la piel - UBA            │
│                                                               │
│                    [SOLICITAR CITA] 🟢                      │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  SOBRE MÍ                          [FOTO PERFIL]           │
│  ✓ Egresada UBA                                             │
│  ✓ Especialista Dermatología                                │
│  ✓ Hospital de Clínicas                                     │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  SERVICIOS (Grid 3 columnas)                                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ 🔍 Diagnós. │ │ 💊 Médicos  │ │ ✨ Estéticos│           │
│  │ Evaluación  │ │ Terapias    │ │ Procedim.   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ ☀️ Solar    │ │ 🦠 Patología│ │ 👶 Pediátri.│           │
│  │ Protección  │ │ Análisis    │ │ Especial    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  BLOG - Información Educativa                               │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐ │
│  │ Acné: Causas     │ │ Psoriasis: Todo  │ │ Dermatitis   │ │
│  │ [Leer más →]     │ │ [Leer más →]     │ │ [Leer más →] │ │
│  └──────────────────┘ └──────────────────┘ └──────────────┘ │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐ │
│  │ Vitiligo: Opcio. │ │ Infecciones Fúng.│ │ Protec. Solar│ │
│  │ [Leer más →]     │ │ [Leer más →]     │ │ [Leer más →] │ │
│  └──────────────────┘ └──────────────────┘ └──────────────┘ │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  CONTACTO                                                    │
│  ┌─────────────────────┐  ┌─────────────────────────────┐   │
│  │ FORMULARIO          │  │ INFORMACIÓN CONTACTO        │   │
│  │ Nombre:   [____]    │  │ 📍 Av. Córdoba 1234, P5     │   │
│  │ Email:    [____]    │  │ 📞 (011) 4123-4567          │   │
│  │ Asunto:   [____]    │  │ 📧 contacto@derma.com.ar    │   │
│  │ Mensaje:  [______]  │  │ 🕐 Lun-Vie: 9:00-18:00      │   │
│  │ [ENVIAR] 🟢         │  │                             │   │
│  └─────────────────────┘  └─────────────────────────────┘   │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│  © 2024 Dra. [Nombre] | Egresada UBA | Disclaimer Médico    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Características Visuales

### 1. PALETA DE COLORES
```
Azul Principal:     #0066cc  (Navbar, títulos, botones)
Azul Oscuro:        #004999  (Hovers, efectos)
Verde Secundario:   #2ecc71  (CTA, acentos positivos)
Gris Claro:         #f8f9fa  (Fondos alternos)
Texto Oscuro:       #2c3e50  (Párrafos, contenido)
Texto Claro:        #7f8c8d  (Subtítulos, metadatos)
```

### 2. TIPOGRAFÍA
```
Fuente: Segoe UI, Tahoma, Geneva, Verdana (San Serif)
H1 (Títulos):       2.5rem, color primario, bold
H2 (Secciones):     2.0rem, color primario
H3 (Subsecciones): 1.3rem, color primario oscuro
Párrafos:           1rem, altura línea 1.6
```

### 3. ESPACIADO
```
Navbar:             1rem vertical
Hero Section:       100px vertical, altura mín 500px
Secciones:          80px vertical
Grid:               2rem entre elementos
Padding interno:    1.5-2rem
```

### 4. ELEMENTOS INTERACTIVOS
```
Hover en botones:   scale(1.05), box-shadow mayor
Hover en tarjetas:  translateY(-10px), sombra más oscura
Animaciones:        0.3s ease, smooth scroll
Menú móvil:         Hamburguesa 3 líneas, despliza desde lado
```

---

## 📱 RESPONSIVE DESIGN

### Desktop (1200px+)
- Navbar completo horizontal
- Grid 3 columnas
- Hero Section grande
- Todas las funciones visibles

### Tablet (768px - 1199px)
- Navbar completo
- Grid 2 columnas
- Hero Section mediano
- Menú aún horizontal

### Móvil (< 768px)
- Menú hamburguesa
- Grid 1 columna
- Hero Section comprimido
- Texto adaptado
- Botones grandes para tocar

```
Breakpoints principales:
- 1200px: Desktop
- 768px: Tablet
- 480px: Móvil pequeño
```

---

## 🎬 ANIMACIONES Y EFECTOS

### 1. Fade In Down (Hero)
Título desciende suavemente al cargar:
```
Duración: 0.8s
Ease: ease
De: opacity 0, transform -30px
A: opacity 1, transform 0px
```

### 2. Scroll Reveal (Tarjetas)
Tarjetas de servicios y blog aparecen:
```
Trigger: 10% de visibilidad
Duración: 0.6s
Efecto: opacity + translateY(20px)
```

### 3. Hover Effects (Botones y Tarjetas)
```
Botones: Color más brillante, sombra, scale
Tarjetas: Elevan(-10px), sombra mayor
Enlaces: Cambio de opacidad suave
```

### 4. Smooth Scroll
Desplazamiento suave entre secciones:
```
Todos los enlaces internos usan scroll suave
Compensación de 80px por navbar pegajoso
Duración: auto (según distancia)
```

---

## 🎨 EJEMPLOS VISUALES DE COMPONENTES

### Botón CTA (Call To Action)
```
┌────────────────────────────┐
│   SOLICITAR CITA (verde)   │
└────────────────────────────┘
Hover: Sube, sombra mayor
Activo: Press feedback
```

### Tarjeta de Servicio
```
┌──────────────────────────┐
│        🔍 (emoji)        │ ← Icono grande
│                          │
│  Diagnóstico Dermatológ. │ ← Título azul
│                          │
│  Evaluación completa     │ ← Descripción
│  de condiciones...       │    gris clara
│                          │
└──────────────────────────┘
Efecto hover: Eleva, sombra crece
Border superior: 4px azul
```

### Artículo de Blog
```
┌──────────────────────────┐
│ 🟢 Inflamación │ 2024     │ ← Header azulado
├──────────────────────────┤
│ Acné: Causas, Tipos y    │ ← Título
│ Tratamientos             │
│                          │
│ El acné es una condición │ ← Descripción
│ inflamatoria crónica...  │
│                          │
│ Leer más → (en azul)     │ ← Link clickeable
└──────────────────────────┘
Efecto hover: Sube, sombra mayor
```

### Formulario de Contacto
```
Nombre:   [________________]  ← Input field
Email:    [________________]  ← Con validación
Teléfono: [________________]  ← Opcional
Asunto:   [________________]  ← Requerido
Mensaje:  [________________]  ← Textarea grande
          [________________]
          [________________]

            [ENVIAR MENSAJE] ← Botón azul, ancho completo
```

---

## 🌙 MODO OSCURO (Futuro)

Aunque el sitio actual es claro, aquí está la estructura para modo oscuro:

```css
@media (prefers-color-scheme: dark) {
    :root {
        --primary-color: #4eb3ff;
        --text-dark: #e8e8e8;
        --light-bg: #1a1a1a;
    }
}
```

---

## 📊 TAMAÑOS DE ELEMENTOS

### Navbar
- Altura: 70px
- Padding: 1rem vertical
- Logo icon: 1.8rem
- Logo text: 1.5rem

### Hero Section
- Altura mínima: 500px
- H1: 3rem (desktop), 1.5rem (móvil)
- P: 1.3rem (desktop), 1rem (móvil)
- Botón: 15px padding, 40px horizontal

### Tarjetas
- Ancho: 300px mínimo (grid auto-fit)
- Padding: 2rem
- Border radius: 10px
- Sombra: 2px offset, 10px blur, rgba(0,0,0,0.1)

### Imágenes Responsivas
```css
max-width: 100%;
height: auto;
object-fit: cover;
```

---

## ✅ PUNTUACIÓN DE DISEÑO

| Aspecto | Calificación |
|---------|-------------|
| Profesionalismo | ⭐⭐⭐⭐⭐ |
| Usabilidad | ⭐⭐⭐⭐⭐ |
| Diseño Responsivo | ⭐⭐⭐⭐⭐ |
| Velocidad | ⭐⭐⭐⭐⭐ |
| Accesibilidad | ⭐⭐⭐⭐☆ |
| SEO Básico | ⭐⭐⭐⭐☆ |

---

## 🎯 IMPRESIÓN GENERAL

El sitio transmite:
- ✅ Profesionalismo médico
- ✅ Confianza y seguridad
- ✅ Modernidad
- ✅ Accesibilidad de información
- ✅ Facilidad de contacto
- ✅ Educación de calidad

**Público objetivo**: Pacientes en Buenos Aires buscando dermatólogo confiable

---

**Última actualización**: Octubre 2026
