// ===========================
// MENÚ HAMBURGUESA RESPONSIVO
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Alternar menú
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===========================
// FORMULARIO DE CONTACTO
// ===========================

const contactForm = document.getElementById('contactForm');

// Número de WhatsApp de la Dra. (formato internacional sin + ni espacios)
const WHATSAPP_NUMERO = '573176324909';

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !email || !asunto || !mensaje) {
        alert('Por favor completá los campos obligatorios.');
        return;
    }
    if (!validarEmail(email)) {
        alert('El email no es válido.');
        return;
    }

    // Mensaje estructurado para que la Dra. pueda copiarlo tal cual al panel de turnos
    const texto =
        `*Nueva solicitud de turno*\n\n` +
        `*Nombre:* ${nombre}\n` +
        `*Email:* ${email}\n` +
        (telefono ? `*Teléfono:* ${telefono}\n` : '') +
        `*Motivo:* ${asunto}\n\n` +
        `${mensaje}`;

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener');

    contactForm.reset();
});

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ===========================
// ANIMACIONES DE SCROLL
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos de las tarjetas de servicios y blog
document.querySelectorAll('.service-card, .blog-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ===========================
// SMOOTH SCROLL CON OFFSET
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return; // Ignorar links vacíos

        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Compensar altura del navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// CONTADOR DE SECCIONES
// ===========================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===========================
// INICIALIZACIÓN
// ===========================

console.log('Sitio web de Dermatología cargado correctamente');
