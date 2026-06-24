import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { Layers, BookText, PenTool } from 'lucide-react';

const NivelHome = () => {
  const { id } = useParams(); // nivelId
  const navigate = useNavigate();
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    const fetchTemas = async () => {
      if (window.electronAPI) {
        const res = await window.electronAPI.invoke('api:getTemas', parseInt(id));
        if (res.success) setTemas(res.data);
      }
    };
    fetchTemas();
  }, [id]);

  if (temas.length === 0) {
    return (
      <Layout>
        <h2 className="section-title">Temas del Nivel</h2>
        <p className="empty-state">Aún no hay temas configurados en este nivel.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="section-title">Temas de Estudio</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {temas.map(tema => (
          <div key={tema.id} className="card" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#f8fafc' }}>{tema.nombre}</h3>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>{tema.descripcion}</p>
            
            <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              
              <div className="card interactive" style={{ alignItems: 'center', textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(`/glosario/${tema.id}`)}>
                <Layers size={32} color="#818cf8" style={{ marginBottom: '0.5rem' }} />
                <h4>Glosario</h4>
                <p style={{ fontSize: '0.85rem' }}>Flashcards y audio</p>
              </div>

              <div className="card interactive" style={{ alignItems: 'center', textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(`/gramatica/${tema.id}`)}>
                <BookText size={32} color="#c084fc" style={{ marginBottom: '0.5rem' }} />
                <h4>Gramática</h4>
                <p style={{ fontSize: '0.85rem' }}>Teoría y reglas</p>
              </div>

              <div className="card interactive" style={{ alignItems: 'center', textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(`/ejercicios/${tema.id}`)}>
                <PenTool size={32} color="#4ade80" style={{ marginBottom: '0.5rem' }} />
                <h4>Práctica</h4>
                <p style={{ fontSize: '0.85rem' }}>Ejercicios evaluados</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default NivelHome;
