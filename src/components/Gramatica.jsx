import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from './Layout';

const Gramatica = () => {
  const { id } = useParams(); // temaId
  const [reglas, setReglas] = useState([]);
  const [selectedRegla, setSelectedRegla] = useState(null);

  useEffect(() => {
    const fetchReglas = async () => {
      if (window.electronAPI) {
        const res = await window.electronAPI.invoke('api:getReglas', parseInt(id));
        if (res.success) {
          setReglas(res.data);
          if (res.data.length > 0) setSelectedRegla(res.data[0]);
        }
      }
    };
    fetchReglas();
  }, [id]);

  if (reglas.length === 0) {
    return (
      <Layout>
        <h2 className="section-title">Gramática</h2>
        <p className="empty-state">No hay reglas gramaticales para este tema.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="section-title">Gramática</h2>
      
      <div style={{ display: 'flex', gap: '2rem', height: 'calc(100vh - 180px)' }}>
        {/* Sidebar de temas */}
        <div className="card" style={{ width: '300px', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Lecciones</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {reglas.map(r => (
              <li 
                key={r.id} 
                onClick={() => setSelectedRegla(r)}
                style={{
                  padding: '1rem',
                  background: selectedRegla?.id === r.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.05)',
                  borderLeft: selectedRegla?.id === r.id ? '4px solid #818cf8' : '4px solid transparent',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  transition: 'all 0.2s'
                }}
              >
                {r.titulo}
              </li>
            ))}
          </ul>
        </div>

        {/* Visor Markdown */}
        <div className="card glass-panel" style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          {selectedRegla ? (
            <div className="markdown-body" style={{ color: '#f8fafc', lineHeight: 1.6 }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#818cf8' }}>{selectedRegla.titulo}</h1>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedRegla.contenido_markdown}</ReactMarkdown>
            </div>
          ) : (
            <p>Selecciona una lección para comenzar.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Gramatica;
