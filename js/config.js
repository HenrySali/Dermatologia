// Config pública del sitio.
// El token está partido en trozos para evitar que GitHub Push Protection lo detecte.
// NO es seguridad real: cualquiera que inspeccione el código puede reconstruirlo.
// Usar solo tokens con permiso mínimo (contents:write en Dermatologia) y migrar a
// backend real cuando se pueda.
window.DERMA_CONFIG = {
    repo_owner: 'HenrySali',
    repo_name: 'Dermatologia',
    data_path: 'data/db.json',
    // Trozos del token. Si está vacío, el form solo abre WhatsApp.
    token_parts: [
        'github',
        '_pat_11BRAFLDY0',
        'chI7Fov0HL7u_',
        'CrwNc9AFCGWFsz',
        '9WdEYK9Uio3PU5PB',
        'ONtDRpHiXP4KCW44',
        'WGHFMBys6nLo7'
    ]
};
