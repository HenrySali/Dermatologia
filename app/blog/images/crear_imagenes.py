from PIL import Image, ImageDraw, ImageFont
import os

# Crear directorio si no existe
os.makedirs('.', exist_ok=True)

def crear_imagen_placeholder(nombre_archivo, titulo, ancho=800, alto=500, color_bg=(200, 220, 255)):
    """Crear imagen placeholder profesional con PIL"""
    try:
        # Crear imagen
        img = Image.new('RGB', (ancho, alto), color_bg)
        draw = ImageDraw.Draw(img)
        
        # Intentar usar una fuente disponible
        try:
            font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
            font_text = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
        except:
            font_title = ImageFont.load_default()
            font_text = ImageFont.load_default()
        
        # Dibujar rectángulo de fondo degradado simulado
        for i in range(alto):
            ratio = i / alto
            r = int(color_bg[0] + (255 - color_bg[0]) * ratio * 0.3)
            g = int(color_bg[1] + (255 - color_bg[1]) * ratio * 0.3)
            b = int(color_bg[2] + (255 - color_bg[2]) * ratio * 0.3)
            draw.line([(0, i), (ancho, i)], fill=(r, g, b))
        
        # Dibujar icono y texto
        draw.text((ancho//2 - 150, alto//2 - 100), "🏥", fill=(40, 100, 200), font=font_title)
        draw.text((ancho//2 - 250, alto//2), titulo, fill=(40, 60, 120), font=font_title)
        
        # Guardar imagen
        img.save(nombre_archivo, 'JPEG', quality=90)
        print(f"✅ Creada: {nombre_archivo}")
        
    except Exception as e:
        print(f"⚠️ Error al crear {nombre_archivo}: {e}")

# Crear imágenes para cada blog
imagenes = {
    "acne-tipos.jpg": ("Tipos de Acné", (255, 200, 200)),
    "psoriasis-piel.jpg": ("Psoriasis", (255, 220, 220)),
    "dermatitis-atopica.jpg": ("Dermatitis Atópica", (255, 230, 200)),
    "vitiligo-piel.jpg": ("Vitiligo", (220, 220, 255)),
    "hongos-micosis.jpg": ("Infecciones Fúngicas", (240, 255, 200)),
    "proteccion-solar-uv.jpg": ("Protección Solar UV", (255, 250, 200)),
    "perfil-doctor.jpg": ("Dra. Stefany Salinas", (200, 240, 255)),
}

print("Creando imágenes profesionales...")
print("=" * 60)

for archivo, (titulo, color) in imagenes.items():
    crear_imagen_placeholder(archivo, titulo, color_bg=color)

print("=" * 60)
os.system("ls -lh *.jpg")

