// ===========================
// VARIABLES GLOBALES
// ===========================

let token = localStorage.getItem('auth_token');
let adminInfo = null;
let pacientes = [];
let turnos = [];

const API_BASE = '/api';

// ===========================
// NAVEGACIÓN DE SECCIONES
// ===========================

function cambiarSeccion(seccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('.seccion').forEach(s => {
        s.style.display = 'none';
        s.classList.remove('seccion-activa');
    });

    // Mostrar sección seleccionada
    const seccionElement = document.getElementById(seccion);
    if (seccionElement) {
        seccionElement.style.display = 'block';
        seccionElement.classList.add('seccion-activa');

        // Si es admin, cargar datos
        if (seccion === 'admin' && token) {
            mostrarAdminView();
        }

        // Scroll al top
        window.scrollTo(0, 0);
    }
}

// ===========================
// AUTENTICACIÓN
// ===========================

async function loginAdmin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert('Error: ' + data.error);
            return;
        }

        // Guardar token
        token = data.token;
        adminInfo = data.admin;
        localStorage.setItem('auth_token', token);

        // Mostrar vista admin
        document.getElementById('login-view').style.display = 'none';
        document.getElementById('admin-view').style.display = 'block';
        document.getElementById('nav-admin-link').style.display = 'block';
        document.getElementById('nav-logout').style.display = 'block';
        document.getElementById('admin-nombre').textContent = adminInfo.nombre;

        // Cargar datos
        cargarDashboard();
        cargarTurnos();
        cargarPacientes();

        alert('Bienvenido ' + adminInfo.nombre);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
}

function logout() {
    token = null;
    adminInfo = null;
    localStorage.removeItem('auth_token');

    document.getElementById('login-view').style.display = 'block';
    document.getElementById('admin-view').style.display = 'none';
    document.getElementById('nav-admin-link').style.display = 'none';
    document.getElementById('nav-logout').style.display = 'none';

    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';

    cambiarSeccion('inicio');
}

function mostrarAdminView() {
    if (token) {
        document.getElementById('login-view').style.display = 'none';
        document.getElementById('admin-view').style.display = 'block';
        cambiarTab('dashboard');
    } else {
        document.getElementById('login-view').style.display = 'block';
        document.getElementById('admin-view').style.display = 'none';
    }
}

// ===========================
// TABS
// ===========================

function cambiarTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('activo');
        tab.style.display = 'none';
    });

    // Quitar activo de botones
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('activo');
    });

    // Mostrar tab seleccionado
    const tabElement = document.getElementById(tabName + '-tab');
    if (tabElement) {
        tabElement.style.display = 'block';
        tabElement.classList.add('activo');
    }

    // Marcar botón como activo
    event.target.classList.add('activo');
}

// ===========================
// PACIENTES
// ===========================

async function cargarPacientes() {
    if (!token) return;

    try {
        const response = await fetch(`${API_BASE}/pacientes`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 401) {
            logout();
            return;
        }

        pacientes = await response.json();
        mostrarTablaPacientes();
        actualizarSelectPacientes();
    } catch (error) {
        console.error('Error cargando pacientes:', error);
    }
}

function mostrarTablaPacientes() {
    const tbody = document.getElementById('tbody-pacientes');
    if (pacientes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="sin-datos">No hay pacientes registrados</td></tr>';
        return;
    }

    tbody.innerHTML = pacientes.map(p => `
        <tr>
            <td>${p.nombre}</td>
            <td>${p.email}</td>
            <td>${p.telefono}</td>
            <td>${p.edad || '-'}</td>
            <td>${p.tipo_piel || '-'}</td>
            <td>
                <button class="btn-editar" onclick="editarPaciente(${p.id})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarPaciente(${p.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

function mostrarFormularioPaciente() {
    document.getElementById('paciente-id').value = '';
    document.getElementById('form-paciente').reset();
    document.getElementById('form-paciente-container').style.display = 'block';
}

function cancelarFormularioPaciente() {
    document.getElementById('form-paciente-container').style.display = 'none';
}

async function guardarPaciente(event) {
    event.preventDefault();

    const id = document.getElementById('paciente-id').value;
    const datos = {
        nombre: document.getElementById('paciente-nombre').value,
        email: document.getElementById('paciente-email').value,
        telefono: document.getElementById('paciente-telefono').value,
        edad: parseInt(document.getElementById('paciente-edad').value) || null,
        sexo: document.getElementById('paciente-sexo').value,
        tipo_piel: document.getElementById('paciente-tipo-piel').value,
        notas: document.getElementById('paciente-notas').value
    };

    try {
        let response;
        if (id) {
            response = await fetch(`${API_BASE}/pacientes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(datos)
            });
        } else {
            response = await fetch(`${API_BASE}/pacientes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
        }

        if (response.ok) {
            alert(id ? 'Paciente actualizado' : 'Paciente creado');
            cancelarFormularioPaciente();
            cargarPacientes();
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al guardar paciente');
    }
}

async function editarPaciente(id) {
    const paciente = pacientes.find(p => p.id === id);
    if (!paciente) return;

    document.getElementById('paciente-id').value = paciente.id;
    document.getElementById('paciente-nombre').value = paciente.nombre;
    document.getElementById('paciente-email').value = paciente.email;
    document.getElementById('paciente-telefono').value = paciente.telefono;
    document.getElementById('paciente-edad').value = paciente.edad || '';
    document.getElementById('paciente-sexo').value = paciente.sexo || '';
    document.getElementById('paciente-tipo-piel').value = paciente.tipo_piel || '';
    document.getElementById('paciente-notas').value = paciente.notas || '';

    document.getElementById('form-paciente-container').style.display = 'block';
    window.scrollTo(0, 0);
}

async function eliminarPaciente(id) {
    if (!confirm('¿Eliminar este paciente?')) return;

    try {
        const response = await fetch(`${API_BASE}/pacientes/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            alert('Paciente eliminado');
            cargarPacientes();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar paciente');
    }
}

function actualizarSelectPacientes() {
    const select = document.getElementById('turno-paciente');
    select.innerHTML = '<option value="">Seleccionar paciente...</option>';
    pacientes.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.nombre + ' (' + p.email + ')';
        select.appendChild(option);
    });
}

// ===========================
// TURNOS
// ===========================

async function cargarTurnos() {
    if (!token) return;

    try {
        const response = await fetch(`${API_BASE}/turnos`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 401) {
            logout();
            return;
        }

        turnos = await response.json();
        mostrarTablaTurnos();
    } catch (error) {
        console.error('Error cargando turnos:', error);
    }
}

function mostrarTablaTurnos() {
    const tbody = document.getElementById('tbody-turnos');
    if (turnos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="sin-datos">No hay turnos registrados</td></tr>';
        return;
    }

    tbody.innerHTML = turnos.map(t => `
        <tr>
            <td>${t.nombre}</td>
            <td>${t.fecha}</td>
            <td>${t.hora}</td>
            <td><span class="badge badge-${t.estado}">${t.estado}</span></td>
            <td>${t.motivo || '-'}</td>
            <td>
                <button class="btn-editar" onclick="editarTurno(${t.id})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarTurno(${t.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

function mostrarFormularioTurno() {
    document.getElementById('turno-id').value = '';
    document.getElementById('form-turno').reset();
    document.getElementById('form-turno-container').style.display = 'block';
}

function cancelarFormularioTurno() {
    document.getElementById('form-turno-container').style.display = 'none';
}

async function guardarTurno(event) {
    event.preventDefault();

    const id = document.getElementById('turno-id').value;
    const datos = {
        paciente_id: parseInt(document.getElementById('turno-paciente').value),
        fecha: document.getElementById('turno-fecha').value,
        hora: document.getElementById('turno-hora').value,
        estado: document.getElementById('turno-estado').value,
        motivo: document.getElementById('turno-motivo').value,
        notas: document.getElementById('turno-notas').value
    };

    try {
        let response;
        if (id) {
            response = await fetch(`${API_BASE}/turnos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(datos)
            });
        } else {
            response = await fetch(`${API_BASE}/turnos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
        }

        if (response.ok) {
            alert(id ? 'Turno actualizado' : 'Turno creado');
            cancelarFormularioTurno();
            cargarTurnos();
            cargarDashboard();
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al guardar turno');
    }
}

async function editarTurno(id) {
    const turno = turnos.find(t => t.id === id);
    if (!turno) return;

    document.getElementById('turno-id').value = turno.id;
    document.getElementById('turno-paciente').value = turno.paciente_id;
    document.getElementById('turno-fecha').value = turno.fecha;
    document.getElementById('turno-hora').value = turno.hora;
    document.getElementById('turno-estado').value = turno.estado;
    document.getElementById('turno-motivo').value = turno.motivo || '';
    document.getElementById('turno-notas').value = turno.notas || '';

    document.getElementById('form-turno-container').style.display = 'block';
}

async function eliminarTurno(id) {
    if (!confirm('¿Eliminar este turno?')) return;

    try {
        const response = await fetch(`${API_BASE}/turnos/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            alert('Turno eliminado');
            cargarTurnos();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar turno');
    }
}

// ===========================
// DASHBOARD
// ===========================

function cargarDashboard() {
    if (!token) return;

    const totalPacientes = pacientes.length;
    const turnosPendientes = turnos.filter(t => t.estado === 'pendiente').length;
    const turnosConfirmados = turnos.filter(t => t.estado === 'confirmado').length;

    let proximaTurno = '-';
    const turnosProximos = turnos
        .filter(t => t.estado !== 'cancelado')
        .sort((a, b) => new Date(a.fecha + ' ' + a.hora) - new Date(b.fecha + ' ' + b.hora));
    
    if (turnosProximos.length > 0) {
        const prox = turnosProximos[0];
        proximaTurno = prox.nombre + ' - ' + prox.fecha + ' ' + prox.hora;
    }

    document.getElementById('stat-pacientes').textContent = totalPacientes;
    document.getElementById('stat-pendientes').textContent = turnosPendientes;
    document.getElementById('stat-confirmados').textContent = turnosConfirmados;
    document.getElementById('stat-proxima').textContent = proximaTurno;
}

// ===========================
// SOLICITAR TURNO (Público)
// ===========================

async function solicitarTurno(event) {
    event.preventDefault();

    const nombre = document.getElementById('s-nombre').value;
    const email = document.getElementById('s-email').value;
    const telefono = document.getElementById('s-telefono').value;
    const edad = document.getElementById('s-edad').value;
    const sexo = document.getElementById('s-sexo').value;
    const tipo_piel = document.getElementById('s-tipo-piel').value;
    const fecha = document.getElementById('s-fecha').value;
    const hora = document.getElementById('s-hora').value;
    const motivo = document.getElementById('s-motivo').value;

    try {
        // Crear paciente
        const resPaciente = await fetch(`${API_BASE}/pacientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, telefono, edad, sexo, tipo_piel })
        });

        const dataPaciente = await resPaciente.json();

        if (!resPaciente.ok) {
            // Si es error de email duplicado, obtener el paciente
            if (dataPaciente.error.includes('email ya existe')) {
                // Buscar el paciente por email entre los pacientes que se cargaron
                // Por ahora, continuamos con el flujo
            } else {
                alert('Error: ' + dataPaciente.error);
                return;
            }
        }

        const paciente_id = dataPaciente.id;

        // Crear turno
        const resTurno = await fetch(`${API_BASE}/turnos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                paciente_id,
                fecha,
                hora,
                motivo,
                estado: 'pendiente'
            })
        });

        const dataTurno = await resTurno.json();

        if (resTurno.ok) {
            alert('¡Turno solicitado exitosamente! Te contactaremos para confirmar.');
            document.getElementById('form-solicitar-turno').reset();
            cambiarSeccion('inicio');
        } else {
            alert('Error al solicitar turno: ' + dataTurno.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar la solicitud');
    }
}

// Cargar horas disponibles
async function cargarHorasDisponibles() {
    const fecha = document.getElementById('s-fecha').value;
    if (!fecha) return;

    try {
        const response = await fetch(`${API_BASE}/disponibilidad/${fecha}`);
        const data = await response.json();

        const selectHora = document.getElementById('s-hora');
        selectHora.innerHTML = '<option value="">Seleccionar hora...</option>';

        data.horasDisponibles.forEach(hora => {
            const option = document.createElement('option');
            option.value = hora;
            option.textContent = hora;
            selectHora.appendChild(option);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Event listener para cambio de fecha
document.addEventListener('DOMContentLoaded', () => {
    const inputFecha = document.getElementById('s-fecha');
    if (inputFecha) {
        inputFecha.addEventListener('change', cargarHorasDisponibles);
    }
});

// ===========================
// CONFIGURACIÓN
// ===========================

async function cambiarPassword(event) {
    event.preventDefault();

    const passwordAntigua = document.getElementById('password-antigua').value;
    const passwordNueva = document.getElementById('password-nueva').value;
    const passwordConfirmar = document.getElementById('password-confirmar').value;

    if (passwordNueva !== passwordConfirmar) {
        alert('Las contraseñas no coinciden');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/admin/cambiar-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ passwordAntigua, passwordNueva })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Contraseña actualizada correctamente');
            document.getElementById('form-cambiar-password').reset();
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cambiar contraseña');
    }
}

// ===========================
// INICIALIZACIÓN
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay sesión activa
    if (token) {
        document.getElementById('nav-admin-link').style.display = 'block';
        document.getElementById('nav-logout').style.display = 'block';
        // Recuperar info del admin
        fetch(`${API_BASE}/admin/info`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(r => r.json())
        .then(data => {
            adminInfo = data;
            document.getElementById('admin-nombre').textContent = data.nombre;
        })
        .catch(err => console.error('Error:', err));
    }

    // Mostrar sección de inicio
    cambiarSeccion('inicio');

    console.log('✅ Aplicación inicializada');
});
