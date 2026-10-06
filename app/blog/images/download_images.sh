#!/bin/bash

# Descarga de imágenes médicas libres para los blogs de dermatología
# Usando Unsplash, Pexels y Wikimedia Commons

echo "Descargando imágenes médicas profesionales..."

# 1. ACNÉ - Diferentes tipos y severidad
echo "1. Descargando imágenes de Acné..."
wget -q -O acne-tipos.jpg "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800" 2>/dev/null || \
wget -q -O acne-tipos.jpg "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800" 2>/dev/null

# 2. PSORIASIS - Manifestaciones de psoriasis
echo "2. Descargando imágenes de Psoriasis..."
wget -q -O psoriasis-piel.jpg "https://images.unsplash.com/photo-1631217174073-ca037da32416?w=800" 2>/dev/null || \
wget -q -O psoriasis-piel.jpg "https://images.unsplash.com/photo-1501501815541-658c7075abab?w=800" 2>/dev/null

# 3. DERMATITIS - Inflamación de piel
echo "3. Descargando imágenes de Dermatitis..."
wget -q -O dermatitis-atopica.jpg "https://images.unsplash.com/photo-1570629127328-f45614a51eaf?w=800" 2>/dev/null || \
wget -q -O dermatitis-atopica.jpg "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800" 2>/dev/null

# 4. VITILIGO - Despigmentación
echo "4. Descargando imágenes de Vitiligo..."
wget -q -O vitiligo-piel.jpg "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800" 2>/dev/null || \
wget -q -O vitiligo-piel.jpg "https://images.unsplash.com/photo-1576091160500-112faea58e4d?w=800" 2>/dev/null

# 5. HONGOS - Micosis
echo "5. Descargando imágenes de Hongos/Micosis..."
wget -q -O hongos-micosis.jpg "https://images.unsplash.com/photo-1576091160568-112b8b08c3ba?w=800" 2>/dev/null || \
wget -q -O hongos-micosis.jpg "https://images.unsplash.com/photo-1567359781514-3b961583c346?w=800" 2>/dev/null

# 6. PROTECCIÓN SOLAR - UV y protección
echo "6. Descargando imágenes de Protección Solar..."
wget -q -O proteccion-solar-uv.jpg "https://images.unsplash.com/photo-1580019126519-6a0012b0e0d7?w=800" 2>/dev/null || \
wget -q -O proteccion-solar-uv.jpg "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800" 2>/dev/null

# 7. IMAGEN DE PERFIL - Dermatóloga profesional
echo "7. Descargando imagen de perfil profesional..."
wget -q -O perfil-doctor.jpg "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400" 2>/dev/null || \
wget -q -O perfil-doctor.jpg "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400" 2>/dev/null

echo "✅ Descarga completada"
ls -lh *.jpg 2>/dev/null || echo "⚠️ Algunas imágenes no se descargaron. Usa imágenes locales."

