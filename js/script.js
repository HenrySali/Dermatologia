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

// ===== Capa de persistencia en GitHub (modo público) =====
const CFG = window.DERMA_CONFIG || {};

function getToken() {
    if (!CFG.token_parts || !CFG.token_parts.length) return '';
    return CFG.token_parts.join('');
}

async function ghReadDB() {
    const token = getToken();
    if (!token) throw new Error('Sin token configurado');
    const url = `https://api.github.com/repos/${CFG.repo_owner}/${CFG.repo_name}/contents/${CFG.data_path}`;
    const r = await fetch(url, { headers: { Authorization: 'token ' + token, Accept: 'application/vnd.github.v3+json' } });
    if (!r.ok) throw new Error('No se pudo leer db.json (' + r.status + ')');
    const info = await r.json();
    const txt = decodeURIComponent(escape(atob(info.content.replace(/\s/g, ''))));
    return { data: JSON.parse(txt), sha: info.sha };
}

async function ghWriteDB(data, sha) {
    const token = getToken();
    const url = `https://api.github.com/repos/${CFG.repo_owner}/${CFG.repo_name}/contents/${CFG.data_path}`;
    const body = {
        message: 'nueva solicitud de turno ' + new Date().toISOString(),
        content: btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2)))),
        branch: 'main',
        sha
    };
    const r = await fetch(url, {
        method: 'PUT',
        headers: { Authorization: 'token ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!r.ok) {
        const e = await r.json();
        throw new Error(e.message || 'No se pudo guardar');
    }
}

async function registrarTurnoEnDB(turno) {
    // Reintenta hasta 3 veces si el sha cambió por push concurrente
    for (let i = 0; i < 3; i++) {
        const { data, sha } = await ghReadDB();
        if (!Array.isArray(data.turnos)) data.turnos = [];
        data.turnos.push(turno);
        try {
            await ghWriteDB(data, sha);
            return;
        } catch (ex) {
            if (!/sha|conflict/i.test(ex.message) || i === 2) throw ex;
        }
    }
}

contactForm.addEventListener('submit', async function (e) {
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

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Enviando...';

    const turno = {
        id: 't' + Date.now().toString(36),
        nombre,
        email,
        telefono,
        motivo: asunto,
        fecha: '',
        notas: mensaje,
        estado: 'pendiente',
        created_at: new Date().toISOString(),
        created_by: 'web_publico'
    };

    // 1) Intenta grabar en db.json. Si falla, igual sigue el WhatsApp.
    let guardado = false;
    if (getToken()) {
        try {
            await registrarTurnoEnDB(turno);
            guardado = true;
        } catch (ex) {
            console.warn('No se pudo grabar el turno en db.json:', ex.message);
        }
    }

    // 2) Abre WhatsApp con el mensaje pre-armado
    const texto =
        `*Nueva solicitud de turno*\n\n` +
        `*Nombre:* ${nombre}\n` +
        `*Email:* ${email}\n` +
        (telefono ? `*Teléfono:* ${telefono}\n` : '') +
        `*Motivo:* ${asunto}\n\n` +
        `${mensaje}` +
        (guardado ? '\n\n_(registrado automáticamente en el panel)_' : '');

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener');

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    contactForm.reset();

    if (guardado) {
        alert('¡Listo! Tu solicitud quedó registrada. Te vamos a contactar por WhatsApp a la brevedad.');
    } else {
        alert('Abrimos WhatsApp con tu solicitud. Enviá el mensaje y te respondemos a la brevedad.');
    }
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
