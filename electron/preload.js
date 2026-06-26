const { contextBridge, ipcRenderer } = require('electron');

const validChannels = [
  'api:getNiveles', 'api:createNivel', 'api:updateNivel', 'api:deleteNivel',
  'api:getTemas', 'api:getTema', 'api:createTema', 'api:updateTema', 'api:deleteTema',
  'api:getGlosario', 'api:createFlashcard', 'api:updateFlashcard', 'api:deleteFlashcard',
  'api:getProgresoFlashcards', 'api:updateProgresoFlashcard', 'api:resetProgresoTema',
  'api:getReglas', 'api:createRegla', 'api:updateRegla', 'api:deleteRegla',
  'api:getEjercicios', 'api:createEjercicio', 'api:updateEjercicio', 'api:deleteEjercicio',
  'api:updateProgresoEjercicio', 'api:getProgresoGeneral',
  'api:getProgresoEjerciciosDetalle', 'api:updateProgresoEjercicioDetalle', 'api:resetProgresoEjerciciosTema',
  'api:exportNivel', 'api:importNivel', 'api:importarTemaDatos', 'api:exportPlantilla'
];

contextBridge.exposeInMainWorld('electronAPI', {
  invoke: (channel, data) => {
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data);
    }
    return Promise.reject("Invalid IPC channel: " + channel);
  }
});
