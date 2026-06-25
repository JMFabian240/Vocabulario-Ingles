class GlosarioRepository {
  constructor(db) {
    this.db = db;
  }

  getGlosarioPorTema(temaId) {
    if (!temaId) return Promise.reject(new Error("El ID del tema es obligatorio"));
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Glosario WHERE tema_id = ?', [temaId], (err, rows) => {
        if (err) reject(err); else resolve(rows);
      });
    });
  }

  createFlashcard(temaId, frente, reverso, tipo, pasado, participio, categoria) {
    if (!temaId || !frente || !reverso || !tipo) return Promise.reject(new Error("Faltan campos obligatorios para crear la flashcard"));
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO Glosario (tema_id, frente_ingles, reverso_espanol, tipo_palabra, pasado_simple, participio, categoria) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [temaId, frente, reverso, tipo, pasado, participio, categoria], 
        function(err) {
          if (err) reject(err); else resolve({ id: this.lastID });
        }
      );
    });
  }

  updateFlashcard(id, frente, reverso, tipo, pasado, participio, categoria) {
    if (!id || !frente || !reverso || !tipo) return Promise.reject(new Error("Faltan campos obligatorios para actualizar la flashcard"));
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE Glosario SET frente_ingles=?, reverso_espanol=?, tipo_palabra=?, pasado_simple=?, participio=?, categoria=? WHERE id=?', 
        [frente, reverso, tipo, pasado, participio, categoria, id], 
        function(err) {
          if (err) reject(err); else resolve({ changes: this.changes });
        }
      );
    });
  }

  deleteFlashcard(id) {
    if (!id) return Promise.reject(new Error("El ID es obligatorio"));
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Glosario WHERE id = ?', [id], function(err) {
        if (err) reject(err); else resolve({ changes: this.changes });
      });
    });
  }

  getProgresoFlashcards(temaId) {
    if (!temaId) return Promise.reject(new Error("El ID del tema es obligatorio"));
    return new Promise((resolve, reject) => {
      this.db.all(`
        SELECT p.* FROM Progreso_Flashcards p
        JOIN Glosario g ON p.flashcard_id = g.id
        WHERE g.tema_id = ?
      `, [temaId], (err, rows) => {
        if (err) reject(err); else resolve(rows);
      });
    });
  }

  updateProgresoFlashcard(flashcardId, estado) {
    if (!flashcardId || !estado) return Promise.reject(new Error("ID y estado son obligatorios"));
    return new Promise((resolve, reject) => {
      this.db.run(`
        INSERT INTO Progreso_Flashcards (flashcard_id, estado, ultima_revision) 
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(flashcard_id) DO UPDATE SET estado = excluded.estado, ultima_revision = CURRENT_TIMESTAMP
      `, [flashcardId, estado], function(err) {
        if (err) reject(err); else resolve({ changes: this.changes });
      });
    });
  }

  resetProgresoTema(temaId) {
    if (!temaId) return Promise.reject(new Error("El ID del tema es obligatorio"));
    return new Promise((resolve, reject) => {
      this.db.run(`
        DELETE FROM Progreso_Flashcards 
        WHERE flashcard_id IN (SELECT id FROM Glosario WHERE tema_id = ?)
      `, [temaId], function(err) {
        if (err) reject(err); else resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = GlosarioRepository;
