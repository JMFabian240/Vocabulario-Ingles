class NivelesRepository {
  constructor(db) {
    this.db = db;
  }

  getNiveles() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Niveles ORDER BY id ASC', [], (err, rows) => {
        if (err) reject(err); else resolve(rows);
      });
    });
  }

  createNivel(nombre, descripcion) {
    if (!nombre) return Promise.reject(new Error("El nombre del nivel es obligatorio"));
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO Niveles (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], function(err) {
        if (err) reject(err); else resolve({ id: this.lastID });
      });
    });
  }

  updateNivel(id, nombre, descripcion) {
    if (!id || !nombre) return Promise.reject(new Error("ID y nombre son obligatorios"));
    return new Promise((resolve, reject) => {
      this.db.run('UPDATE Niveles SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id], function(err) {
        if (err) reject(err); else resolve({ changes: this.changes });
      });
    });
  }

  deleteNivel(id) {
    if (!id) return Promise.reject(new Error("El ID es obligatorio"));
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Niveles WHERE id = ?', [id], function(err) {
        if (err) reject(err); else resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = NivelesRepository;
