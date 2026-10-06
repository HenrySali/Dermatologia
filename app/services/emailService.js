/**
 * EMAIL SERVICE - SendGrid Integration
 * 
 * Este módulo gestiona el envío de emails automáticos:
 * - Confirmación de solicitud de turno
 * - Recordatorios 24h antes del turno
 * - Confirmación de cancelación
 * - Notificaciones al admin
 * 
 * CONFIGURACIÓN REQUERIDA:
 * 1. Crear cuenta en SendGrid (https://sendgrid.com)
 * 2. Obtener API Key desde Dashboard > Settings > API Keys
 * 3. Agregar a archivo .env: SENDGRID_API_KEY=SG.xxxxxxxx
 * 4. Instalar: npm install @sendgrid/mail
 * 
 * USO:
 * import { enviarConfirmacionTurno, enviarRecordatorio } from './emailService.js';
 * await enviarConfirmacionTurno(paciente, turno);
 * await enviarRecordatorio(paciente, turno);
 */

import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

// Configurar SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || 'contacto@dermatologia-stefany.com';
const EMAIL_ADMIN = process.env.EMAIL_ADMIN || 'admin@dermatologia-stefany.com';
const APP_URL = process.env.APP_URL || 'https://dermatologia-stefany.com';

// Inicializar SendGrid si API key está disponible
if (SENDGRID_API_KEY) {
    sgMail.setApiKey(SENDGRID_API_KEY);
    console.log('✅ SendGrid configurado correctamente');
} else {
    console.warn('⚠️ SENDGRID_API_KEY no configurada. Los emails no se enviarán.');
    console.warn('   Para activar emails: Agrega SENDGRID_API_KEY a tu archivo .env');
}

/**
 * TEMPLATE 1: Confirmación de Solicitud de Turno
 * Se envía al paciente cuando solicita un turno
 */
export async function enviarConfirmacionTurno(paciente, turno) {
    if (!SENDGRID_API_KEY) {
        console.log('📧 [SIMULADO] Email de confirmación sería enviado a:', paciente.email);
        return { success: true, simulado: true };
    }

    const fecha = formatearFecha(turno.fecha);
    const asunto = `Confirmación de Solicitud de Turno - Dra. Stefany Salinas`;

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #003d7a 0%, #0055b8 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 10px 0 0 0; font-size: 14px; opacity: 0.9; }
            .content { background: #f8f9fa; padding: 30px; border: 1px solid #e0e0e0; }
            .section { margin: 20px 0; }
            .section h3 { color: #003d7a; margin-top: 0; font-size: 18px; }
            .info-box { background: white; padding: 15px; border-left: 4px solid #00c853; margin: 15px 0; }
            .info-box strong { color: #003d7a; }
            .footer { background: #003d7a; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
            .button { display: inline-block; background: #00c853; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 10px 0; font-weight: bold; }
            .disclaimer { background: #fff3cd; border-left: 4px solid #ff6b6b; padding: 15px; margin: 20px 0; font-size: 13px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🏥 Dra. Stefany Salinas</h1>
                <p>Especialista en Dermatología</p>
            </div>

            <div class="content">
                <div class="section">
                    <h3>¡Hola ${paciente.nombre}!</h3>
                    <p>Tu solicitud de turno ha sido <strong>recibida correctamente</strong>. ✓</p>
                </div>

                <div class="info-box">
                    <strong>📅 Detalles de tu Solicitud:</strong><br>
                    <strong>Fecha:</strong> ${fecha}<br>
                    <strong>Hora:</strong> ${turno.hora}<br>
                    <strong>Motivo:</strong> ${turno.motivo || 'Consulta dermatológica general'}<br>
                    <strong>Estado:</strong> <span style="color: #ff9800;">⏳ Pendiente de confirmación</span>
                </div>

                <div class="section">
                    <h3>¿Qué sucede ahora?</h3>
                    <p>La Dra. Stefany Salinas revisará tu solicitud en las próximas 24 horas y te confirmará por email si el turno está disponible.</p>
                    <p>Una vez confirmado, recibirás:</p>
                    <ul>
                        <li>✓ Email de confirmación final</li>
                        <li>✓ Recordatorio 24 horas antes del turno</li>
                        <li>✓ Instrucciones de acceso a la consulta</li>
                    </ul>
                </div>

                <div class="section">
                    <h3>📞 ¿Preguntas?</h3>
                    <p>Si tienes alguna duda, puedes:</p>
                    <ul>
                        <li>Responder a este email</li>
                        <li>Contactar directamente a: <strong>${EMAIL_FROM}</strong></li>
                        <li>Llamar durante horario de atención</li>
                    </ul>
                </div>

                <div class="disclaimer">
                    <strong>⚕️ Aviso Importante:</strong> La información en este email es para uso exclusivo del destinatario. Si has recibido este mensaje por error, por favor notificalo inmediatamente.
                </div>
            </div>

            <div class="footer">
                <p><strong>Dra. Stefany Salinas - Dermatología</strong></p>
                <p>Residente UBA | Médica Clínica Corpas Bogotá</p>
                <p style="margin-top: 15px; font-size: 11px; opacity: 0.8;">
                    ${APP_URL}<br>
                    Email: ${EMAIL_FROM}<br>
                    © 2024 Todos los derechos reservados
                </p>
            </div>
        </div>
    </body>
    </html>
    `;

    const msg = {
        to: paciente.email,
        from: EMAIL_FROM,
        replyTo: EMAIL_ADMIN,
        subject: asunto,
        html: htmlContent,
        text: `Confirmación de Solicitud de Turno\n\nHola ${paciente.nombre},\n\nTu solicitud de turno para ${fecha} a las ${turno.hora} ha sido recibida.\n\nLa Dra. Stefany confirmará tu turno en las próximas 24 horas.\n\nGracias por confiar en nosotros.`,
        trackingSettings: {
            clickTracking: { enabled: true },
            openTracking: { enabled: true }
        }
    };

    try {
        const response = await sgMail.send(msg);
        console.log(`✅ Email de confirmación enviado a ${paciente.email}`);
        return { success: true, response: response[0] };
    } catch (error) {
        console.error(`❌ Error enviando email a ${paciente.email}:`, error.message);
        return { success: false, error: error.message };
    }
}

/**
 * TEMPLATE 2: Recordatorio de Turno (24 horas antes)
 */
export async function enviarRecordatorioTurno(paciente, turno) {
    if (!SENDGRID_API_KEY) {
        console.log('📧 [SIMULADO] Recordatorio sería enviado a:', paciente.email);
        return { success: true, simulado: true };
    }

    const fecha = formatearFecha(turno.fecha);
    const asunto = `⏰ Recordatorio: Tu turno es mañana - Dra. Stefany Salinas`;

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .alert { background: #fff3cd; border-left: 4px solid #ff9800; padding: 15px; margin-bottom: 20px; }
            .alert h2 { color: #ff9800; margin: 0 0 10px 0; }
            .appointment-box { background: #e8f5e9; border: 2px solid #00c853; padding: 20px; border-radius: 8px; }
            .appointment-box h3 { color: #00c853; margin-top: 0; }
            .time-display { font-size: 24px; font-weight: bold; color: #003d7a; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="alert">
                <h2>⏰ ¡Tu turno es mañana!</h2>
                <p>Hola ${paciente.nombre}, te recordamos que tienes un turno programado:</p>
            </div>

            <div class="appointment-box">
                <h3>📅 Detalles de tu Turno</h3>
                <p><strong>Fecha:</strong> ${fecha}</p>
                <p class="time-display">Hora: ${turno.hora}</p>
                <p><strong>Consulta:</strong> ${turno.motivo || 'Consulta dermatológica'}</p>
            </div>

            <h3>✓ Por favor:</h3>
            <ul>
                <li>Llega 10 minutos antes de la hora programada</li>
                <li>Si no puedes asistir, avísanos lo antes posible</li>
                <li>Trae tu documentación de identidad</li>
            </ul>

            <p>Si necesitas reprogramar o cancelar, responde a este email.</p>
            <p>¡Te esperamos! 👋</p>

            <hr style="border: 1px solid #ddd;">
            <p style="font-size: 12px; color: #666;">
                Dra. Stefany Salinas | ${EMAIL_FROM}
            </p>
        </div>
    </body>
    </html>
    `;

    const msg = {
        to: paciente.email,
        from: EMAIL_FROM,
        replyTo: EMAIL_ADMIN,
        subject: asunto,
        html: htmlContent,
        text: `Recordatorio: Tu turno es mañana\n\n${fecha} a las ${turno.hora}\n\nLlega 10 minutos antes. ¡Te esperamos!`
    };

    try {
        await sgMail.send(msg);
        console.log(`✅ Recordatorio enviado a ${paciente.email}`);
        return { success: true };
    } catch (error) {
        console.error(`❌ Error enviando recordatorio a ${paciente.email}:`, error.message);
        return { success: false, error: error.message };
    }
}

/**
 * TEMPLATE 3: Confirmación de Cancelación
 */
export async function enviarConfirmacionCancelacion(paciente, turno) {
    if (!SENDGRID_API_KEY) {
        console.log('📧 [SIMULADO] Email de cancelación sería enviado a:', paciente.email);
        return { success: true, simulado: true };
    }

    const fecha = formatearFecha(turno.fecha);
    const asunto = `Tu turno ha sido cancelado - Dra. Stefany Salinas`;

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .alert { background: #ffebee; border-left: 4px solid #ff6b6b; padding: 15px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="alert">
                <h2>🚫 Turno Cancelado</h2>
                <p>Hola ${paciente.nombre},</p>
                <p>Tu turno del <strong>${fecha}</strong> a las <strong>${turno.hora}</strong> ha sido cancelado.</p>
                <p>Si deseas solicitar un nuevo turno, por favor contacta a la clínica o usa nuestro formulario online.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    const msg = {
        to: paciente.email,
        from: EMAIL_FROM,
        replyTo: EMAIL_ADMIN,
        subject: asunto,
        html: htmlContent
    };

    try {
        await sgMail.send(msg);
        console.log(`✅ Email de cancelación enviado a ${paciente.email}`);
        return { success: true };
    } catch (error) {
        console.error(`❌ Error enviando cancelación a ${paciente.email}:`, error.message);
        return { success: false, error: error.message };
    }
}

/**
 * TEMPLATE 4: Notificación a Admin (nueva solicitud de turno)
 */
export async function enviarNotificacionAdminNuevoTurno(paciente, turno) {
    if (!SENDGRID_API_KEY) {
        console.log('📧 [SIMULADO] Notificación al admin sería enviada');
        return { success: true, simulado: true };
    }

    const fecha = formatearFecha(turno.fecha);
    const asunto = `[NUEVO TURNO] Solicitud de ${paciente.nombre}`;

    const htmlContent = `
    <h2>Nueva Solicitud de Turno</h2>
    <p><strong>Paciente:</strong> ${paciente.nombre}</p>
    <p><strong>Email:</strong> ${paciente.email}</p>
    <p><strong>Teléfono:</strong> ${paciente.telefono}</p>
    <p><strong>Fecha Solicitada:</strong> ${fecha}</p>
    <p><strong>Hora Solicitada:</strong> ${turno.hora}</p>
    <p><strong>Motivo:</strong> ${turno.motivo || 'General'}</p>
    <p><strong>Tipo de Piel:</strong> ${paciente.tipo_piel || 'N/A'}</p>
    <hr>
    <p>Accede al panel de admin para confirmar o rechazar esta solicitud.</p>
    `;

    const msg = {
        to: EMAIL_ADMIN,
        from: EMAIL_FROM,
        subject: asunto,
        html: htmlContent,
        text: `Nueva solicitud de turno de ${paciente.nombre} para ${fecha} a las ${turno.hora}`
    };

    try {
        await sgMail.send(msg);
        console.log(`✅ Notificación de nuevo turno enviada al admin`);
        return { success: true };
    } catch (error) {
        console.error(`❌ Error enviando notificación al admin:`, error.message);
        return { success: false, error: error.message };
    }
}

/**
 * UTILIDAD: Formatear fecha a formato legible
 */
function formatearFecha(fecha) {
    const date = new Date(fecha);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', locale: 'es-AR' };
    return date.toLocaleDateString('es-AR', opciones);
}

/**
 * TEST: Enviar email de prueba
 */
export async function enviarEmailPrueba(email) {
    if (!SENDGRID_API_KEY) {
        return { success: false, error: 'SENDGRID_API_KEY no configurada' };
    }

    const msg = {
        to: email,
        from: EMAIL_FROM,
        subject: '✅ Email de Prueba - Sistema Dermatología',
        html: `
            <h2>✅ Correo de Prueba</h2>
            <p>Este email fue enviado correctamente desde SendGrid.</p>
            <p>Si lo ves, significa que tu configuración de emails está funcionando.</p>
            <p style="color: #00c853; font-weight: bold;">¡Sistema listo para enviar confirmaciones y recordatorios!</p>
        `
    };

    try {
        await sgMail.send(msg);
        console.log(`✅ Email de prueba enviado a ${email}`);
        return { success: true };
    } catch (error) {
        console.error(`❌ Error enviando email de prueba:`, error.message);
        return { success: false, error: error.message };
    }
}

/**
 * VERIFICACIÓN: Estado del servicio
 */
export function verificarEstadoEmailService() {
    return {
        disponible: !!SENDGRID_API_KEY,
        email_from: EMAIL_FROM,
        email_admin: EMAIL_ADMIN,
        app_url: APP_URL,
        mensaje: SENDGRID_API_KEY 
            ? '✅ SendGrid configurado correctamente' 
            : '⚠️ SENDGRID_API_KEY no configurada'
    };
}

export default {
    enviarConfirmacionTurno,
    enviarRecordatorioTurno,
    enviarConfirmacionCancelacion,
    enviarNotificacionAdminNuevoTurno,
    enviarEmailPrueba,
    verificarEstadoEmailService
};
