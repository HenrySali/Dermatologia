import express from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura_cambiar_en_produccion';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../')));

// Base de datos SQLite
const db = new sqlite3.Database('dermatologia.db', (err) => {
  if (err) {
    console.error('Error abriendo BD:', err);
  } else {
    console.log('✅ Base de datos SQLite conectada');
    inicializarBD();
  }
});

// Inicializar base de datos
function inicializarBD() {
  // Tabla de pacientes
  db.run(`
    CREATE TABLE IF NOT EXISTS pacientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      telefono TEXT NOT NULL,
      edad INTEGER,
      sexo TEXT,
      tipo_piel TEXT,
      notas TEXT,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabla de turnos
  db.run(`
    CREATE TABLE IF NOT EXISTS turnos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      paciente_id INTEGER NOT NULL,
      fecha TEXT NOT NULL,
      hora TEXT NOT NULL,
      estado TEXT DEFAULT 'pendiente',
      motivo TEXT,
      notas TEXT,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
    )
  `);

  // Tabla de admin (dermatóloga)
  db.run(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, () => {
    // Crear admin por defecto si no existe
    db.get("SELECT * FROM admin WHERE email = 'admin@dermatologia.com'", (err, row) => {
      if (!row) {
        const hashedPassword = bcrypt.hashSync('123456', 10);
        db.run(`
          INSERT INTO admin (nombre, email, password) 
          VALUES ('Administrador', 'admin@dermatologia.com', ?)
        `, [hashedPassword], () => {
          console.log('✅ Admin por defecto creado');
          console.log('   Email: admin@dermatologia.com');
          console.log('   Contraseña: 123456');
          console.log('   ⚠️ IMPORTANTE: Cambiar la contraseña después del primer login');
        });
      }
    });
  });

  console.log('✅ Tablas de base de datos inicializadas');
}

// ==========================================
// RUTAS DE AUTENTICACIÓN
// ==========================================

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }

  db.get('SELECT * FROM admin WHERE email = ?', [email], (err, admin) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la BD' });
    }

    if (!admin) {
      return res.status(401).json({ error: 'Email o contraseña incorrecta' });
    }

    if (!bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ error: 'Email o contraseña incorrecta' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ success: true, token, admin: { id: admin.id, nombre: admin.nombre, email: admin.email } });
  });
});

// Middleware de autenticación
function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

// ==========================================
// RUTAS DE PACIENTES
// ==========================================

// Obtener todos los pacientes
app.get('/api/pacientes', verificarToken, (req, res) => {
  db.all('SELECT * FROM pacientes ORDER BY fecha_creacion DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la BD' });
    }
    res.json(rows);
  });
});

// Crear paciente
app.post('/api/pacientes', (req, res) => {
  const { nombre, email, telefono, edad, sexo, tipo_piel, notas } = req.body;

  if (!nombre || !email || !telefono) {
    return res.status(400).json({ error: 'Nombre, email y teléfono requeridos' });
  }

  db.run(
    `INSERT INTO pacientes (nombre, email, telefono, edad, sexo, tipo_piel, notas) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, email, telefono, edad, sexo, tipo_piel, notas],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'Este email ya existe' });
        }
        return res.status(500).json({ error: 'Error en la BD' });
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

// Obtener paciente por ID
app.get('/api/pacientes/:id', verificarToken, (req, res) => {
  db.get('SELECT * FROM pacientes WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la BD' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    res.json(row);
  });
});

// Actualizar paciente
app.put('/api/pacientes/:id', verificarToken, (req, res) => {
  const { nombre, telefono, edad, sexo, tipo_piel, notas } = req.body;

  db.run(
    `UPDATE pacientes SET nombre = ?, telefono = ?, edad = ?, sexo = ?, tipo_piel = ?, notas = ? 
     WHERE id = ?`,
    [nombre, telefono, edad, sexo, tipo_piel, notas, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error en la BD' });
      }
      res.json({ success: true, changes: this.changes });
    }
  );
});

// Eliminar paciente
app.delete('/api/pacientes/:id', verificarToken, (req, res) => {
  db.run('DELETE FROM pacientes WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Error en la BD' });
    }
    res.json({ success: true });
  });
});

// ==========================================
// RUTAS DE TURNOS
// ==========================================

// Obtener todos los turnos
app.get('/api/turnos', verificarToken, (req, res) => {
  db.all(
    `SELECT t.*, p.nombre, p.email, p.telefono FROM turnos t 
     JOIN pacientes p ON t.paciente_id = p.id 
     ORDER BY t.fecha DESC, t.hora DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Error en la BD' });
      }
      res.json(rows);
    }
  );
});

// Crear turno
app.post('/api/turnos', (req, res) => {
  const { paciente_id, fecha, hora, motivo, notas } = req.body;

  if (!paciente_id || !fecha || !hora) {
    return res.status(400).json({ error: 'Paciente, fecha y hora requeridas' });
  }

  // Verificar si el paciente existe
  db.get('SELECT id FROM pacientes WHERE id = ?', [paciente_id], (err, paciente) => {
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    db.run(
      `INSERT INTO turnos (paciente_id, fecha, hora, motivo, notas) 
       VALUES (?, ?, ?, ?, ?)`,
      [paciente_id, fecha, hora, motivo, notas],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Error en la BD' });
        }
        res.json({ success: true, id: this.lastID });
      }
    );
  });
});

// Obtener turno por ID
app.get('/api/turnos/:id', verificarToken, (req, res) => {
  db.get(
    `SELECT t.*, p.nombre, p.email, p.telefono FROM turnos t 
     JOIN pacientes p ON t.paciente_id = p.id 
     WHERE t.id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Error en la BD' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Turno no encontrado' });
      }
      res.json(row);
    }
  );
});

// Actualizar turno
app.put('/api/turnos/:id', verificarToken, (req, res) => {
  const { fecha, hora, estado, motivo, notas } = req.body;

  db.run(
    `UPDATE turnos SET fecha = ?, hora = ?, estado = ?, motivo = ?, notas = ? 
     WHERE id = ?`,
    [fecha, hora, estado, motivo, notas, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error en la BD' });
      }
      res.json({ success: true, changes: this.changes });
    }
  );
});

// Eliminar turno
app.delete('/api/turnos/:id', verificarToken, (req, res) => {
  db.run('DELETE FROM turnos WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Error en la BD' });
    }
    res.json({ success: true });
  });
});

// ==========================================
// RUTAS DE DISPONIBILIDAD
// ==========================================

// Obtener horarios disponibles para una fecha
app.get('/api/disponibilidad/:fecha', (req, res) => {
  const fecha = req.params.fecha;
  const horariosDisponibles = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  db.all('SELECT hora FROM turnos WHERE fecha = ? AND estado != ?', [fecha, 'cancelado'], (err, turnos) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la BD' });
    }

    const horasOcupadas = turnos.map(t => t.hora);
    const horasDisponibles = horariosDisponibles.filter(h => !horasOcupadas.includes(h));

    res.json({ horasDisponibles });
  });
});

// ==========================================
// RUTAS ADMIN
// ==========================================

// Cambiar contraseña
app.post('/api/admin/cambiar-password', verificarToken, (req, res) => {
  const { passwordAntigua, passwordNueva } = req.body;

  db.get('SELECT password FROM admin WHERE id = ?', [req.admin.id], (err, admin) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la BD' });
    }

    if (!bcrypt.compareSync(passwordAntigua, admin.password)) {
      return res.status(401).json({ error: 'Contraseña antigua incorrecta' });
    }

    const hashedPassword = bcrypt.hashSync(passwordNueva, 10);
    db.run('UPDATE admin SET password = ? WHERE id = ?', [hashedPassword, req.admin.id], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error en la BD' });
      }
      res.json({ success: true, message: 'Contraseña actualizada' });
    });
  });
});

// Obtener info admin
app.get('/api/admin/info', verificarToken, (req, res) => {
  db.get('SELECT id, nombre, email FROM admin WHERE id = ?', [req.admin.id], (err, admin) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la BD' });
    }
    res.json(admin);
  });
});

// ==========================================
// RUTA PRINCIPAL
// ==========================================

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Servir archivos estáticos
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/blog-articulos.html', express.static(path.join(__dirname, '../blog-articulos.html')));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║         🏥 SISTEMA DE DERMATOLOGÍA INICIADO 🏥            ║
╚════════════════════════════════════════════════════════════╝

✅ Servidor corriendo en: http://localhost:${PORT}
✅ Base de datos: dermatologia.db
✅ API disponible en: http://localhost:${PORT}/api

📋 CREDENCIALES POR DEFECTO:
   Email: admin@dermatologia.com
   Contraseña: 123456
   ⚠️  CAMBIAR DESPUÉS DEL PRIMER LOGIN

🚀 La aplicación está lista para usar.
  `);
});
