import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';

const ConfiguracionTema = () => {
  const { id } = useParams();
  const temaId = parseInt(id);
  const [activeTab, setActiveTab] = useState('flashcards');

  // Flashcards State
  const [flashcards, setFlashcards] = useState([]);
  const [nuevaFlashcard, setNuevaFlashcard] = useState({ frente: '', reverso: '', tipo: 'Sustantivo', pasado: '', participio: '' });

  // Reglas State
  const [reglas, setReglas] = useState([]);
  const [nuevaRegla, setNuevaRegla] = useState({ titulo: '', contenido: '' });

  // Ejercicios State
  const [ejercicios, setEjercicios] = useState([]);
  const [nuevoEjercicio, setNuevoEjercicio] = useState({ tipo: 'Completar', prompt: '', respuesta: '' });

  useEffect(() => {
    fetchFlashcards();
    fetchReglas();
    fetchEjercicios();
  }, [temaId]);

  // Fetchers
  const fetchFlashcards = async () => {
    if (window.electronAPI) {
      const res = await window.electronAPI.invoke('api:getGlosario', temaId);
      if (res.success) setFlashcards(res.data);
    }
  };
  const fetchReglas = async () => {
    if (window.electronAPI) {
      const res = await window.electronAPI.invoke('api:getReglas', temaId);
      if (res.success) setReglas(res.data);
    }
  };
  const fetchEjercicios = async () => {
    if (window.electronAPI) {
      const res = await window.electronAPI.invoke('api:getEjercicios', temaId);
      if (res.success) setEjercicios(res.data);
    }
  };

  // Handlers
  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    if (!nuevaFlashcard.frente || !nuevaFlashcard.reverso) return;
    await window.electronAPI.invoke('api:createFlashcard', { temaId, ...nuevaFlashcard });
    setNuevaFlashcard({ frente: '', reverso: '', tipo: 'Sustantivo', pasado: '', participio: '' });
    fetchFlashcards();
  };

  const handleAddRegla = async (e) => {
    e.preventDefault();
    if (!nuevaRegla.titulo || !nuevaRegla.contenido) return;
    await window.electronAPI.invoke('api:createRegla', { temaId, ...nuevaRegla });
    setNuevaRegla({ titulo: '', contenido: '' });
    fetchReglas();
  };

  const handleAddEjercicio = async (e) => {
    e.preventDefault();
    if (!nuevoEjercicio.prompt || !nuevoEjercicio.respuesta) return;
    await window.electronAPI.invoke('api:createEjercicio', { temaId, ...nuevoEjercicio });
    setNuevoEjercicio({ tipo: 'Completar', prompt: '', respuesta: '' });
    fetchEjercicios();
  };

  const handleDelete = async (apiName, itemId, fetchMethod) => {
    if (window.confirm('¿Seguro de eliminar este elemento?')) {
      await window.electronAPI.invoke(apiName, itemId);
      fetchMethod();
    }
  };

  const handleImportDatos = async () => {
    if (window.electronAPI) {
      const res = await window.electronAPI.invoke('api:importarTemaDatos', temaId);
      if (res.success) {
        alert(res.data.message);
        fetchFlashcards();
        fetchReglas();
        fetchEjercicios();
      } else {
        alert('Error: ' + res.error);
      }
    }
  };

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>Gestionar Tema {temaId}</h2>
        <button onClick={handleImportDatos} className="btn-primary" style={{ backgroundColor: '#10b981' }}>
          Importar Datos (JSON, CSV, MD)
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {['flashcards', 'reglas', 'ejercicios'].map(tab => (
          <button 
            key={tab} 
            className={`btn-primary ${activeTab !== tab ? 'inactive-tab' : ''}`}
            style={{ opacity: activeTab === tab ? 1 : 0.6 }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'flashcards' && (
        <div className="card">
          <h3>Añadir Flashcard</h3>
          <form onSubmit={handleAddFlashcard} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input type="text" placeholder="Inglés (Frente)" value={nuevaFlashcard.frente} onChange={e => setNuevaFlashcard({...nuevaFlashcard, frente: e.target.value})} style={{ flex: 1, padding: '0.5rem', borderRadius: '5px' }} />
              <input type="text" placeholder="Español (Reverso)" value={nuevaFlashcard.reverso} onChange={e => setNuevaFlashcard({...nuevaFlashcard, reverso: e.target.value})} style={{ flex: 1, padding: '0.5rem', borderRadius: '5px' }} />
              <select value={nuevaFlashcard.tipo} onChange={e => setNuevaFlashcard({...nuevaFlashcard, tipo: e.target.value})} style={{ padding: '0.5rem', borderRadius: '5px' }}>
                <option>Sustantivo</option>
                <option>Verbo</option>
                <option>Adjetivo</option>
                <option>Adverbio</option>
                <option>Expresión</option>
              </select>
            </div>
            {nuevaFlashcard.tipo === 'Verbo' && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="text" placeholder="Pasado Simple" value={nuevaFlashcard.pasado} onChange={e => setNuevaFlashcard({...nuevaFlashcard, pasado: e.target.value})} style={{ flex: 1, padding: '0.5rem', borderRadius: '5px' }} />
                <input type="text" placeholder="Participio" value={nuevaFlashcard.participio} onChange={e => setNuevaFlashcard({...nuevaFlashcard, participio: e.target.value})} style={{ flex: 1, padding: '0.5rem', borderRadius: '5px' }} />
              </div>
            )}
            <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>Guardar Palabra</button>
          </form>

          <div style={{ marginTop: '2rem' }}>
            {flashcards.map(f => (
              <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  <strong>{f.frente_ingles}</strong> - {f.reverso_espanol} <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>({f.tipo_palabra})</span>
                </div>
                <button onClick={() => handleDelete('api:deleteFlashcard', f.id, fetchFlashcards)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reglas' && (
        <div className="card">
          <h3>Añadir Regla (Markdown)</h3>
          <form onSubmit={handleAddRegla} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="text" placeholder="Título" value={nuevaRegla.titulo} onChange={e => setNuevaRegla({...nuevaRegla, titulo: e.target.value})} style={{ padding: '0.5rem', borderRadius: '5px' }} />
            <textarea placeholder="Contenido Markdown" value={nuevaRegla.contenido} onChange={e => setNuevaRegla({...nuevaRegla, contenido: e.target.value})} style={{ padding: '0.5rem', borderRadius: '5px', minHeight: '150px' }} />
            <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>Guardar Regla</button>
          </form>

          <div style={{ marginTop: '2rem' }}>
            {reglas.map(r => (
              <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <strong>{r.titulo}</strong>
                <button onClick={() => handleDelete('api:deleteRegla', r.id, fetchReglas)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ejercicios' && (
        <div className="card">
          <h3>Añadir Ejercicio</h3>
          <form onSubmit={handleAddEjercicio} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <select value={nuevoEjercicio.tipo} onChange={e => setNuevoEjercicio({...nuevoEjercicio, tipo: e.target.value})} style={{ padding: '0.5rem', borderRadius: '5px' }}>
              <option>Completar</option>
              <option>Ordenar</option>
              <option>Escribir</option>
            </select>
            <input type="text" placeholder={nuevoEjercicio.tipo === 'Ordenar' ? 'Palabras desordenadas (separadas por coma)' : 'Pregunta/Contexto (usa ___ para Completar)'} value={nuevoEjercicio.prompt} onChange={e => setNuevoEjercicio({...nuevoEjercicio, prompt: e.target.value})} style={{ padding: '0.5rem', borderRadius: '5px' }} />
            <input type="text" placeholder="Respuesta Esperada" value={nuevoEjercicio.respuesta} onChange={e => setNuevoEjercicio({...nuevoEjercicio, respuesta: e.target.value})} style={{ padding: '0.5rem', borderRadius: '5px' }} />
            <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>Guardar Ejercicio</button>
          </form>

          <div style={{ marginTop: '2rem' }}>
            {ejercicios.map(e => (
              <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  <span style={{ color: '#818cf8', marginRight: '1rem' }}>[{e.tipo_ejercicio}]</span>
                  {e.prompt} ➡ <strong>{e.respuesta_esperada}</strong>
                </div>
                <button onClick={() => handleDelete('api:deleteEjercicio', e.id, fetchEjercicios)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ConfiguracionTema;
