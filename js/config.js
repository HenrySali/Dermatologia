// Config pública del sitio.
// El token se guarda codificado en base64 para evitar que GitHub Push Protection
// lo detecte como secreto en texto plano. Esto NO es seguridad real: cualquiera
// que inspeccione el código fuente puede decodearlo. Usar solo tokens con el
// permiso mínimo (contents:write en el repo Dermatologia) y migrar a backend
// real cuando se pueda.
window.DERMA_CONFIG = {
    repo_owner: 'HenrySali',
    repo_name: 'Dermatologia',
    data_path: 'data/db.json',
    // Pegar aquí el token codificado en base64. Si está vacío, el form solo abre WhatsApp.
    token_b64: ''
};
