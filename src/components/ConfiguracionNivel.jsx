import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';

const ConfiguracionNivel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [temas, setTemas] = useState([]);
  const [nuevoTema, setNuevoTema] = useState({ nombre: '', descripcion: '' });

  const fetchTemas = async () => {
    if (window.electronAPI) {
      const response = await window.electronAPI.invoke('api:getTemas', parseInt(id));
      if (response.success) setTemas(response.data);
    }
  };

  useEffect(() => {
    fetchTemas();
  }, [id]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!nuevoTema.nombre) return;
    if (window.electronAPI) {
      await window.electronAPI.invoke('api:createTema', {
        nivelId: parseInt(id),
        nombre: nuevoTema.nombre,
        descripcion: nuevoTema.descripcion,
        orden: temas.length + 1
      });
      setNuevoTema({ nombre: '', descripcion: '' });
      fetchTemas();
    }
  };

  const handleDelete = async (temaId) => {
    if (window.confirm('¿Eliminar este tema y todo su contenido?')) {
      await window.electronAPI.invoke('api:deleteTema', temaId);
      fetchTemas();
    }
  };

  return (
    <Layout>
      <h2 className="section-title">Gestor de Temas (Nivel {id})</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Añadir Nuevo Tema</h3>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Nombre del Tema (ej. Verbo To Be)" 
            value={nuevoTema.nombre} 
            onChange={(e) => setNuevoTema({...nuevoTema, nombre: e.target.value})}
            style={{ padding: '0.5rem', borderRadius: '8px', border: 'none', flex: 1, minWidth: '200px' }}
          />
          <input 
            type="text" 
            placeholder="Descripción" 
            value={nuevoTema.descripcion} 
            onChange={(e) => setNuevoTema({...nuevoTema, descripcion: e.target.value})}
            style={{ padding: '0.5rem', borderRadius: '8px', border: 'none', flex: 2, minWidth: '300px' }}
          />
          <button type="submit" className="btn-primary">Añadir</button>
        </form>
      </div>

      <div className="grid-cards">
        {temas.length === 0 ? (
          <p className="empty-state">No hay temas en este nivel.</p>
        ) : (
          temas.map(tema => (
            <div key={tema.id} className="card interactive">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>{tema.nombre}</h3>
                <button onClick={() => handleDelete(tema.id)} style={{ background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer' }}>Eliminar</button>
              </div>
              <p>{tema.descripcion}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                 <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => navigate(`/config/tema/${tema.id}`)}>
                   Gestionar Contenido
                 </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default ConfiguracionNivel;
