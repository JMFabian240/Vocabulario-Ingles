const fs = require('fs');
const path = require('path');

class RecursosSeeder {
  constructor(dbManager) {
    this.db = dbManager;
    this.recursosPath = path.join(__dirname, '../../Recursos');
  }

  async run() {
    try {
      const isSeeded = await this.db.metadatos.getMetadata('seed_ingles2');
      if (isSeeded === 'true') {
        console.log('Recursos ya fueron importados previamente.');
        return;
      }
      console.log('Iniciando carga inicial de recursos...');
      await this.seedPrograma();
      await this.db.metadatos.setMetadata('seed_ingles2', 'true');
      console.log('Carga inicial completada exitosamente.');
    } catch (error) {
      console.error('Error durante la carga de recursos:', error);
    }
  }

  async seedPrograma() {
    // Crear el nivel principal
    const { id: nivelId } = await this.db.niveles.createNivel('Inglés II', 'Programa de Inglés II Básico-Intermedio');
    
    // Leemos ProgramaIngles2.md para sacar los temas
    const programaFile = path.join(this.recursosPath, 'ProgramaIngles2.md');
    if (!fs.existsSync(programaFile)) {
      console.warn("No se encontro ProgramaIngles2.md");
      return;
    }
    
    const content = fs.readFileSync(programaFile, 'utf-8');
    const lines = content.split('\n');
    
    const temasCreados = {};

    for (const line of lines) {
      if (line.startsWith('| **TEMA')) {
        const cells = line.split('|').map(c => c.trim()).filter(c => c);
        if (cells.length >= 4) {
          const temaInfo = cells[0].replace(/\*\*/g, '').trim(); 
          const match = temaInfo.match(/TEMA (\d+): (.*)/);
          if (match) {
            const numero = parseInt(match[1]);
            const nombre = match[2];
            
            // Crear el Tema
            const { id: temaId } = await this.db.temas.createTema(nivelId, `Tema ${numero}: ${nombre}`, `Funciones: ${cells[1].replace(/\[cite: \d+\]/g, '')}`, numero);
            temasCreados[numero] = temaId;
            
            // Añadir como regla gramatical un resumen del tema
            await this.db.ejercicios.createRegla(
              temaId, 
              'Resumen del Tema', 
              `### Gramática\n${cells[2].replace(/\[cite: \d+\]/g, '').replace(/<br>/g, '\n- ')}\n\n### Vocabulario\n${cells[3].replace(/\[cite: \d+\]/g, '').replace(/<br>/g, '\n- ')}`
            );
          }
        }
      }
    }

    // Poblar Glosarios y Ejercicios de cada tema
    for (const numero of Object.keys(temasCreados)) {
      const temaId = temasCreados[numero];
      
      // 1. Cargar Glosario
      const glosarioFile = path.join(this.recursosPath, 'Glosario', `GlosarioTema${numero}.md`);
      if (fs.existsSync(glosarioFile)) {
        const glosarioContent = fs.readFileSync(glosarioFile, 'utf-8');
        await this.parseGlosario(temaId, glosarioContent);
      }

      // 2. Cargar Ejercicios Prácticos
      const practicaFile = path.join(this.recursosPath, 'practica', `practica_tema${numero}.json`);
      if (fs.existsSync(practicaFile)) {
        try {
          const ejerciciosData = JSON.parse(fs.readFileSync(practicaFile, 'utf-8'));
          for (const ej of ejerciciosData) {
            await this.db.ejercicios.createEjercicio(temaId, ej.tipo_ejercicio, ej.prompt, ej.respuesta_esperada);
          }
        } catch (err) {
          console.error(`Error parseando ${practicaFile}:`, err);
        }
      }
    }
  }

  async parseGlosario(temaId, content) {
    const lines = content.split('\n');
    let inTable = false;
    let headers = [];
    let currentCategoria = '';

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('## ')) {
        currentCategoria = trimmed.substring(3).replace(/\[cite:.*?\]/g, '').replace(/\[cite_start\]/g, '').trim();
      }

      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        const cells = trimmed.split('|').map(c => c.trim()).filter(c => c);
        
        if (cells[0].includes('---')) continue; 

        if (!inTable) {
          headers = cells;
          inTable = true;
          continue;
        }

        let frente = cells[0] || '';
        let reverso = cells[1] || '';
        frente = frente.replace(/\[cite: \d+\]/g, '').trim();
        reverso = reverso.replace(/\[cite: \d+\]/g, '').replace(/\[cite_start\]/g, '').trim();

        let tipo = 'Expresión';
        if (headers[0]?.toLowerCase().includes('verbo')) tipo = 'Verbo';
        else if (headers[0]?.toLowerCase().includes('adjetivo')) tipo = 'Adjetivo';
        
        let pasado = '', participio = '';
        if (tipo === 'Verbo' && cells.length >= 4) {
          pasado = cells[1] || '';
          participio = cells[2] || '';
          reverso = cells[3] || ''; 
        }

        if (frente && frente !== 'PALABRA' && frente !== 'VERBO' && !frente.toLowerCase().includes('traducci')) {
          await this.db.glosario.createFlashcard(temaId, frente, reverso, tipo, pasado, participio, currentCategoria);
        }
      } else {
        inTable = false;
      }
    }
  }
}

module.exports = RecursosSeeder;
