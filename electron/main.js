/**
 * Main Process de Electron
 * Responsabilidad: Gestión del ciclo de vida de la App y orquestación de IPC.
 */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const DatabaseManager = require('./database');
const RecursosSeeder = require('./seeders/recursosSeeder');

let mainWindow;
let dbManager;

function createWindow() {
  // Inicializa la ventana principal
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "App Repaso Inglés II",
    webPreferences: {
      // Importante: Usaremos preload.js para inyectar funciones seguras al frontend
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // Por seguridad (Best Practice)
      contextIsolation: true
    }
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    // En desarrollo, cargar desde el servidor Vite
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // En producción, cargar el build estático
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  // 1. Inicializar la capa DAO inyectando la ruta segura de usuario
  dbManager = new DatabaseManager(app.getPath('userData'));

  // Asegurar que la DB termine de inicializarse (un ligero retardo o usando callbacks)
  // Como initSchema usa db.serialize, es relativamente secuencial
  setTimeout(async () => {
    const seeder = new RecursosSeeder(dbManager);
    await seeder.run();
  }, 1000);

  // 2. Configurar Controladores IPC (RNF-02: Asincronía)
  setupIpcHandlers();

  // 3. Levantar la UI
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

/**
 * Registra los canales de comunicación entre Frontend y Backend
 */
function setupIpcHandlers() {
  const handlers = {
    'api:getNiveles': () => dbManager.niveles.getNiveles(),
    'api:createNivel': (_, { nombre, descripcion }) => dbManager.niveles.createNivel(nombre, descripcion),
    'api:updateNivel': (_, { id, nombre, descripcion }) => dbManager.niveles.updateNivel(id, nombre, descripcion),
    'api:deleteNivel': (_, id) => dbManager.niveles.deleteNivel(id),

    'api:getTemas': (_, nivelId) => dbManager.temas.getTemasPorNivel(nivelId),
    'api:createTema': (_, { nivelId, nombre, descripcion, orden }) => dbManager.temas.createTema(nivelId, nombre, descripcion, orden),
    'api:updateTema': (_, { id, nombre, descripcion, orden }) => dbManager.temas.updateTema(id, nombre, descripcion, orden),
    'api:deleteTema': (_, id) => dbManager.temas.deleteTema(id),

    'api:getGlosario': (_, temaId) => dbManager.glosario.getGlosarioPorTema(temaId),
    'api:createFlashcard': (_, data) => dbManager.glosario.createFlashcard(data.temaId, data.frente, data.reverso, data.tipo, data.pasado, data.participio),
    'api:updateFlashcard': (_, data) => dbManager.glosario.updateFlashcard(data.id, data.frente, data.reverso, data.tipo, data.pasado, data.participio),
    'api:deleteFlashcard': (_, id) => dbManager.glosario.deleteFlashcard(id),

    'api:getProgresoFlashcards': (_, temaId) => dbManager.glosario.getProgresoFlashcards(temaId),
    'api:updateProgresoFlashcard': (_, { flashcardId, estado }) => dbManager.glosario.updateProgresoFlashcard(flashcardId, estado),
    'api:resetProgresoTema': (_, temaId) => dbManager.glosario.resetProgresoTema(temaId),

    'api:getReglas': (_, temaId) => dbManager.ejercicios.getReglasPorTema(temaId),
    'api:createRegla': (_, { temaId, titulo, contenido }) => dbManager.ejercicios.createRegla(temaId, titulo, contenido),
    'api:updateRegla': (_, { id, titulo, contenido }) => dbManager.ejercicios.updateRegla(id, titulo, contenido),
    'api:deleteRegla': (_, id) => dbManager.ejercicios.deleteRegla(id),

    'api:getEjercicios': (_, temaId) => dbManager.ejercicios.getEjerciciosPorTema(temaId),
    'api:createEjercicio': (_, { temaId, tipo, prompt, respuesta }) => dbManager.ejercicios.createEjercicio(temaId, tipo, prompt, respuesta),
    'api:updateEjercicio': (_, { id, tipo, prompt, respuesta }) => dbManager.ejercicios.updateEjercicio(id, tipo, prompt, respuesta),
    'api:deleteEjercicio': (_, id) => dbManager.ejercicios.deleteEjercicio(id),

    'api:updateProgresoEjercicio': (_, { temaId, aciertos, total }) => dbManager.ejercicios.updateProgresoEjercicio(temaId, aciertos, total),
    'api:getProgresoGeneral': () => dbManager.ejercicios.getProgresoGeneral(),
    
    'api:exportNivel': async (event, nivelId) => {
      const { dialog } = require('electron');
      const fs = require('fs');
      
      const nivel = (await dbManager.niveles.getNiveles()).find(n => n.id === nivelId);
      if (!nivel) throw new Error('Nivel no encontrado');
      
      const temas = await dbManager.temas.getTemasPorNivel(nivelId);
      const dataToExport = { nivel, temas: [] };
      
      for (const tema of temas) {
        const glosario = await dbManager.glosario.getGlosarioPorTema(tema.id);
        const reglas = await dbManager.ejercicios.getReglasPorTema(tema.id);
        const ejercicios = await dbManager.ejercicios.getEjerciciosPorTema(tema.id);
        dataToExport.temas.push({ ...tema, glosario, reglas, ejercicios });
      }
      
      const { filePath } = await dialog.showSaveDialog({
        title: 'Exportar Nivel',
        defaultPath: `Nivel_${nivelId}_Export.json`,
        filters: [{ name: 'JSON Files', extensions: ['json'] }]
      });
      
      if (filePath) {
        fs.writeFileSync(filePath, JSON.stringify(dataToExport, null, 2));
        return { message: 'Exportado correctamente' };
      }
      return { message: 'Cancelado' };
    },

    'api:importNivel': async () => {
      const { dialog } = require('electron');
      const fs = require('fs');
      
      const { filePaths } = await dialog.showOpenDialog({
        title: 'Importar Nivel',
        filters: [{ name: 'JSON Files', extensions: ['json'] }],
        properties: ['openFile']
      });
      
      if (filePaths && filePaths.length > 0) {
        const data = JSON.parse(fs.readFileSync(filePaths[0], 'utf-8'));
        const { nivel, temas } = data;
        
        // Crear Nivel
        const { id: newNivelId } = await dbManager.niveles.createNivel(nivel.nombre, nivel.descripcion);
        
        for (const tema of temas) {
          const { id: newTemaId } = await dbManager.temas.createTema(newNivelId, tema.nombre, tema.descripcion, tema.orden);
          
          for (const f of tema.glosario || []) {
            await dbManager.glosario.createFlashcard(newTemaId, f.frente_ingles, f.reverso_espanol, f.tipo_palabra, f.pasado_simple, f.participio);
          }
          for (const r of tema.reglas || []) {
            await dbManager.ejercicios.createRegla(newTemaId, r.titulo, r.contenido_markdown);
          }
          for (const e of tema.ejercicios || []) {
            await dbManager.ejercicios.createEjercicio(newTemaId, e.tipo_ejercicio, e.prompt, e.respuesta_esperada);
          }
        }
        return { message: 'Importado correctamente' };
      }
      return { message: 'Cancelado' };
    },

    'api:importarTemaDatos': async (event, temaId) => {
      const { dialog } = require('electron');
      const fs = require('fs');
      const path = require('path');
      
      const { filePaths } = await dialog.showOpenDialog({
        title: 'Importar Datos al Tema',
        filters: [
          { name: 'Todos los Soportados', extensions: ['json', 'csv', 'md'] },
          { name: 'JSON Files', extensions: ['json'] },
          { name: 'CSV Files', extensions: ['csv'] },
          { name: 'Markdown Files', extensions: ['md'] }
        ],
        properties: ['openFile']
      });
      
      if (filePaths && filePaths.length > 0) {
        const filePath = filePaths[0];
        const ext = path.extname(filePath).toLowerCase();
        const content = fs.readFileSync(filePath, 'utf-8');

        if (ext === '.json') {
          const data = JSON.parse(content);
          for (const f of data.glosario || []) {
            await dbManager.glosario.createFlashcard(temaId, f.frente_ingles, f.reverso_espanol, f.tipo_palabra, f.pasado_simple, f.participio);
          }
          for (const r of data.reglas || []) {
            await dbManager.ejercicios.createRegla(temaId, r.titulo, r.contenido_markdown);
          }
          for (const e of data.ejercicios || []) {
            await dbManager.ejercicios.createEjercicio(temaId, e.tipo_ejercicio, e.prompt, e.respuesta_esperada);
          }
          return { message: 'Datos JSON importados correctamente al tema' };

        } else if (ext === '.csv') {
          // Formato esperado: Frente,Reverso,Tipo,Pasado,Participio
          const lines = content.split('\n');
          for (let i = 1; i < lines.length; i++) { // Asume primera linea es cabecera
            if (!lines[i].trim()) continue;
            const cells = lines[i].split(',').map(c => c.trim());
            if (cells.length >= 2) {
              await dbManager.glosario.createFlashcard(
                temaId, cells[0], cells[1], cells[2] || 'Expresión', cells[3] || '', cells[4] || ''
              );
            }
          }
          return { message: 'Glosario CSV importado correctamente' };

        } else if (ext === '.md') {
          // Si es Markdown, comprobamos si parece un glosario (tiene tablas) o una regla
          if (content.includes('|---|---|')) {
            const RecursosSeeder = require('./seeders/recursosSeeder');
            const seeder = new RecursosSeeder(dbManager);
            await seeder.parseGlosario(temaId, content);
            return { message: 'Glosario Markdown importado correctamente' };
          } else {
            // Importar como regla gramatical
            const title = path.basename(filePath, '.md');
            await dbManager.ejercicios.createRegla(temaId, title, content);
            return { message: 'Regla Gramatical Markdown importada correctamente' };
          }
        }
      }
      return { message: 'Cancelado' };
    }
  };

  for (const [channel, handler] of Object.entries(handlers)) {
    ipcMain.handle(channel, async (event, ...args) => {
      try {
        const data = await handler(event, ...args);
        return { success: true, data };
      } catch (error) {
        console.error(`Error en IPC handler ${channel}:`, error);
        return { success: false, error: error.message };
      }
    });
  }
}