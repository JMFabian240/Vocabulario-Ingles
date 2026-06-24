class EjerciciosRepository {
  constructor(db) {
    this.db = db;
  }

  // --- REGLAS GRAMATICALES ---
  getReglasPorTema(temaId) {
    if (!temaId) return Promise.reject(new Error("El ID del tema es obligatorio"));
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Reglas_Gramaticales WHERE tema_id = ?', [temaId], (err, rows) => {
        if (err) reject(err); else resolve(rows);
      });
    });
  }

  createRegla(temaId, titulo, contenido) {
    if (!temaId || !titulo || !contenido) return Promise.reject(new Error("Faltan campos obligatorios para la regla"));
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO Reglas_Gramaticales (tema_id, titulo, contenido_markdown) VALUES (?, ?, ?)', 
        [temaId, titulo, contenido], function(err) {
        if (err) reject(err); else resolve({ id: this.lastID });
      });
    });
  }

  updateRegla(id, titulo, contenido) {
    if (!id || !titulo || !contenido) return Promise.reject(new Error("Faltan campos obligatorios"));
    return new Promise((resolve, reject) => {
      this.db.run('UPDATE Reglas_Gramaticales SET titulo = ?, contenido_markdown = ? WHERE id = ?', 
        [titulo, contenido, id], function(err) {
        if (err) reject(err); else resolve({ changes: this.changes });
      });
    });
  }

  deleteRegla(id) {
    if (!id) return Promise.reject(new Error("El ID es obligatorio"));
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Reglas_Gramaticales WHERE id = ?', [id], function(err) {
        if (err) reject(err); else resolve({ changes: this.changes });
      });
    });
  }

  // --- EJERCICIOS ---
  getEjerciciosPorTema(temaId) {
    if (!temaId) return Promise.reject(new Error("El ID del tema es obligatorio"));
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Ejercicios WHERE tema_id = ?', [temaId], (err, rows) => {
        if (err) reject(err); else resolve(rows);
      });
    });
  }

  createEjercicio(temaId, tipo, prompt, respuesta) {
    if (!temaId || !tipo || !prompt || !respuesta) return Promise.reject(new Error("Faltan campos obligatorios"));
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO Ejercicios (tema_id, tipo_ejercicio, prompt, respuesta_esperada) VALUES (?, ?, ?, ?)', 
        [temaId, tipo, prompt, respuesta], function(err) {
        if (err) reject(err); else resolve({ id: this.lastID });
      });
    });
  }

  updateEjercicio(id, tipo, prompt, respuesta) {
    if (!id || !tipo || !prompt || !respuesta) return Promise.reject(new Error("Faltan campos obligatorios"));
    return new Promise((resolve, reject) => {
      this.db.run('UPDATE Ejercicios SET tipo_ejercicio=?, prompt=?, respuesta_esperada=? WHERE id=?', 
        [tipo, prompt, respuesta, id], function(err) {
        if (err) reject(err); else resolve({ changes: this.changes });
      });
    });
  }

  deleteEjercicio(id) {
    if (!id) return Promise.reject(new Error("El ID es obligatorio"));
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM Ejercicios WHERE id = ?', [id], function(err) {
        if (err) reject(err); else resolve({ changes: this.changes });
      });
    });
  }

  // --- PROGRESO EJERCICIOS ---
  updateProgresoEjercicio(temaId, aciertos, total) {
    if (!temaId || total === undefined || aciertos === undefined) return Promise.reject(new Error("Datos incompletos para actualizar progreso"));
    return new Promise((resolve, reject) => {
      this.db.run(`
        INSERT INTO Progreso_Ejercicios (tema_id, puntaje_maximo, total_ejercicios, ultima_evaluacion) 
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(tema_id) DO UPDATE SET 
          puntaje_maximo = MAX(puntaje_maximo, excluded.puntaje_maximo), 
          ultima_evaluacion = CURRENT_TIMESTAMP
      `, [temaId, aciertos, total], function(err) {
        if (err) reject(err); else resolve({ changes: this.changes });
      });
    });
  }

  getProgresoGeneral() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Progreso_Ejercicios', [], (err, rows) => {
        if (err) reject(err); else resolve(rows);
      });
    });
  }
}

module.exports = EjerciciosRepository;
