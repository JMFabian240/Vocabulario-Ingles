const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const NivelesRepository = require('./repositories/NivelesRepository');
const TemasRepository = require('./repositories/TemasRepository');
const GlosarioRepository = require('./repositories/GlosarioRepository');
const EjerciciosRepository = require('./repositories/EjerciciosRepository');
const MetadatosRepository = require('./repositories/MetadatosRepository');

class DatabaseManager {
  constructor(userDataPath) {
    const dbPath = path.join(userDataPath, 'ingles_app_data.sqlite');
    
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error conectando a SQLite:', err.message);
      } else {
        console.log('Conexión exitosa a SQLite en:', dbPath);
        this.initSchema();
      }
    });

    // Inyectar la dependencia de DB en los repositorios (DIP)
    this.niveles = new NivelesRepository(this.db);
    this.temas = new TemasRepository(this.db);
    this.glosario = new GlosarioRepository(this.db);
    this.ejercicios = new EjerciciosRepository(this.db);
    this.metadatos = new MetadatosRepository(this.db);
  }

  initSchema() {
    this.db.serialize(() => {
      // Metadatos
      this.db.run(`
        CREATE TABLE IF NOT EXISTS AppMetadatos (
          clave VARCHAR(50) PRIMARY KEY,
          valor TEXT NOT NULL,
          fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // 1. Tabla Niveles
      this.db.run(`
        CREATE TABLE IF NOT EXISTS Niveles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre VARCHAR(50) NOT NULL,
          descripcion TEXT,
          fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // 2. Tabla Temas
      this.db.run(`
        CREATE TABLE IF NOT EXISTS Temas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nivel_id INTEGER NOT NULL,
          nombre VARCHAR(100) NOT NULL,
          descripcion TEXT,
          orden INTEGER DEFAULT 0,
          FOREIGN KEY (nivel_id) REFERENCES Niveles(id) ON DELETE CASCADE
        )
      `);

      // 3. Tabla Glosario
      this.db.run(`
        CREATE TABLE IF NOT EXISTS Glosario (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          tema_id INTEGER NOT NULL,
          frente_ingles VARCHAR(255) NOT NULL,
          reverso_espanol VARCHAR(255) NOT NULL,
          tipo_palabra VARCHAR(50) NOT NULL,
          pasado_simple VARCHAR(100),
          participio VARCHAR(100),
          FOREIGN KEY (tema_id) REFERENCES Temas(id) ON DELETE CASCADE
        )
      `);

      // 4. Tabla Reglas Gramaticales
      this.db.run(`
        CREATE TABLE IF NOT EXISTS Reglas_Gramaticales (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          tema_id INTEGER NOT NULL,
          titulo VARCHAR(150) NOT NULL,
          contenido_markdown TEXT NOT NULL,
          FOREIGN KEY (tema_id) REFERENCES Temas(id) ON DELETE CASCADE
        )
      `);

      // 5. Tabla Ejercicios
      this.db.run(`
        CREATE TABLE IF NOT EXISTS Ejercicios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          tema_id INTEGER NOT NULL,
          tipo_ejercicio VARCHAR(50) NOT NULL,
          prompt TEXT NOT NULL,
          respuesta_esperada TEXT NOT NULL,
          FOREIGN KEY (tema_id) REFERENCES Temas(id) ON DELETE CASCADE
        )
      `);

      // 6. Progreso Flashcards
      this.db.run(`
        CREATE TABLE IF NOT EXISTS Progreso_Flashcards (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          flashcard_id INTEGER UNIQUE NOT NULL,
          estado VARCHAR(20) DEFAULT 'pendiente',
          ultima_revision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (flashcard_id) REFERENCES Glosario(id) ON DELETE CASCADE
        )
      `);

      // 7. Progreso Ejercicios
      this.db.run(`
        CREATE TABLE IF NOT EXISTS Progreso_Ejercicios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          tema_id INTEGER UNIQUE NOT NULL,
          puntaje_maximo INTEGER DEFAULT 0,
          total_ejercicios INTEGER NOT NULL,
          ultima_evaluacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (tema_id) REFERENCES Temas(id) ON DELETE CASCADE
        )
      `);
      
      console.log('Esquema de Base de Datos verificado/creado exitosamente.');
    });
  }
}

module.exports = DatabaseManager;