import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Configuracion = () => {
  const [niveles, setNiveles] = useState([]);
  const [nuevoNivel, setNuevoNivel] = useState({ nombre: '', descripcion: '' });

  const fetchNiveles = async () => {
    if (window.electronAPI) {
      const response = await window.electronAPI.invoke('api:getNiveles');
      if (response.success) setNiveles(response.data);
    }
  };

  useEffect(() => {
    fetchNiveles();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!nuevoNivel.nombre) return;
    if (window.electronAPI) {
      await window.electronAPI.invoke('api:createNivel', nuevoNivel);
      setNuevoNivel({ nombre: '', descripcion: '' });
      fetchNiveles();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar nivel y todo su contenido?')) {
      await window.electronAPI.invoke('api:deleteNivel', id);
      fetchNiveles();
    }
  };

  const handleImport = async () => {
    if (window.electronAPI) {
      await window.electronAPI.invoke('api:importNivel');
      fetchNiveles();
    }
  };

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="section-title">Gestor de Niveles</h2>
        <button className="btn-primary" onClick={handleImport} style={{ background: '#10b981' }}>Importar Nivel (.json)</button>
      </div>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Crear Nuevo Nivel</h3>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Nombre (ej. Inglés 1)" 
            value={nuevoNivel.nombre} 
            onChange={(e) => setNuevoNivel({...nuevoNivel, nombre: e.target.value})}
            style={{ padding: '0.5rem', borderRadius: '8px', border: 'none', flex: 1, minWidth: '200px' }}
          />
          <input 
            type="text" 
            placeholder="Descripción" 
            value={nuevoNivel.descripcion} 
            onChange={(e) => setNuevoNivel({...nuevoNivel, descripcion: e.target.value})}
            style={{ padding: '0.5rem', borderRadius: '8px', border: 'none', flex: 2, minWidth: '300px' }}
          />
          <button type="submit" className="btn-primary">Guardar</button>
        </form>
      </div>

      <div className="grid-cards">
        {niveles.map(nivel => (
          <div key={nivel.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{nivel.nombre}</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={async () => {
                  if(window.electronAPI) {
                    await window.electronAPI.invoke('api:exportNivel', nivel.id);
                    alert('Nivel exportado');
                  }
                }} style={{ background: 'transparent', color: '#60a5fa', border: 'none', cursor: 'pointer' }}>Exportar</button>
                <button onClick={() => handleDelete(nivel.id)} style={{ background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer' }}>Eliminar</button>
              </div>
            </div>
            <p>{nivel.descripcion}</p>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>ID: {nivel.id}</p>
            <div style={{ marginTop: '1rem' }}>
              <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => window.location.href = `/config/nivel/${nivel.id}`}>
                Gestionar Temas
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Configuracion;
