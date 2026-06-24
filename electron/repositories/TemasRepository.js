class TemasRepository {
  constructor(db) {
    this.db = db;
  }

  getTemasPorNivel(nivelId) {
    if (!nivelId) return Promise.reject(new Error("El ID del nivel es obligatorio"));
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Temas WHERE nivel_id = ? ORDER BY orden ASC', [nivelId], (err, rows) => {
        if (err) reject(err); else resolve(rows);
      });
    });
  }

  createTema(nivelId, nombre, descripcion, orden = 0) {
    if (!nivelId || !nombre) return Promise.reject(new Error("El ID del nivel y el nombre son obligatorios"));
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO Temas (nivel_id, nombre, descripcion, orden) VALUES (?, ?, ?, ?)', 
        [nivelId, nombre, descripcion, orden], function(err) {
        if (err) reject(err); else resolve({ id: this.lastID });
      });
    });
  }

  updateTema(id, nombre, descripcion, orden) {
    if (!id || !nombre) return Promise.reject(new Error("El ID y nombre son obligatorios"));
    return new Promise((resolve, reject) => {
      this.db.run('UPDATE Temas SET nombre = ?, descripcion = ?, orden = ? WHERE id = ?', 
        [nombre, descripcion, orden, id], function(err) {
        if (err) reject(err); else resolve({ changes: this.changes });
      });
    });
  }

  deleteTema(id) {
    if (!id) return Promise.reject(new Error("El ID es obligatorio"));
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Temas WHERE id = ?', [id], function(err) {
        if (err) reject(err); else resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = TemasRepository;
