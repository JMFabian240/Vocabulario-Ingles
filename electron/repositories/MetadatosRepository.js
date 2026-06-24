class MetadatosRepository {
  constructor(db) {
    this.db = db;
  }

  getMetadata(key) {
    if (!key) return Promise.reject(new Error("La clave es obligatoria"));
    return new Promise((resolve, reject) => {
      this.db.get('SELECT valor FROM AppMetadatos WHERE clave = ?', [key], (err, row) => {
        if (err) reject(err); else resolve(row ? row.valor : null);
      });
    });
  }

  setMetadata(key, value) {
    if (!key || value === undefined) return Promise.reject(new Error("Clave y valor son obligatorios"));
    return new Promise((resolve, reject) => {
      this.db.run(`
        INSERT INTO AppMetadatos (clave, valor) VALUES (?, ?)
        ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor, fecha_actualizacion = CURRENT_TIMESTAMP
      `, [key, value], function(err) {
        if (err) reject(err); else resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = MetadatosRepository;
