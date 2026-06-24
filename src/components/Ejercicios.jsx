import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { CheckCircle, XCircle } from 'lucide-react';

const Ejercicios = () => {
  const { id } = useParams(); // temaId
  const navigate = useNavigate();
  const [ejercicios, setEjercicios] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect' | null
  const [score, setScore] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  useEffect(() => {
    const fetchEjercicios = async () => {
      if (window.electronAPI) {
        const res = await window.electronAPI.invoke('api:getEjercicios', parseInt(id));
        if (res.success && res.data.length > 0) {
          // Tomar hasta 15 aleatorios
          const shuffled = res.data.sort(() => Math.random() - 0.5).slice(0, 15);
          setEjercicios(shuffled);
        }
      }
    };
    fetchEjercicios();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || feedback) return;

    const currentEx = ejercicios[currentIdx];
    
    // RF-14: Sanitización
    const userAns = inputValue.trim().toLowerCase();
    const expAns = currentEx.respuesta_esperada.trim().toLowerCase();

    if (userAns === expAns) {
      setFeedback('correct');
      setScore(score + 1);
    } else {
      setFeedback('incorrect');
    }
  };

  const nextEjercicio = async () => {
    setFeedback(null);
    setInputValue('');
    if (currentIdx < ejercicios.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setSessionCompleted(true);
      // Guardar progreso RF-16
      if (window.electronAPI) {
        await window.electronAPI.invoke('api:updateProgresoEjercicio', {
          temaId: parseInt(id),
          aciertos: score + (feedback === 'correct' ? 1 : 0),
          total: ejercicios.length
        });
      }
    }
  };

  if (ejercicios.length === 0) {
    return (
      <Layout>
        <h2 className="section-title">Práctica</h2>
        <p className="empty-state">No hay ejercicios para este tema.</p>
      </Layout>
    );
  }

  if (sessionCompleted) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', marginTop: '10vh' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Sesión Completada</h2>
          <p style={{ fontSize: '1.5rem', color: '#cbd5e1', marginBottom: '2rem' }}>
            Tu puntaje: <strong style={{ color: '#818cf8', fontSize: '2rem' }}>{score} / {ejercicios.length}</strong>
          </p>
          <button className="btn-primary" onClick={() => navigate(-1)}>Volver al Menú</button>
        </div>
      </Layout>
    );
  }

  const currentEx = ejercicios[currentIdx];

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="section-title">Ejercicios: {currentEx.tipo_ejercicio}</h2>
        <span style={{ fontSize: '1.2rem', color: '#94a3b8' }}>{currentIdx + 1} / {ejercicios.length}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="card glass-panel" style={{ width: '600px', padding: '3rem', textAlign: 'center' }}>
          
          <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>{currentEx.prompt}</h3>
          
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={feedback !== null}
              placeholder="Escribe tu respuesta aquí..."
              style={{ 
                width: '100%', padding: '1rem', fontSize: '1.2rem', borderRadius: '10px', 
                border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', 
                color: 'white', textAlign: 'center', marginBottom: '1.5rem'
              }}
            />
            
            {feedback === null ? (
              <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1.2rem' }}>
                Comprobar
              </button>
            ) : (
              <div className="animate-fade-in">
                {feedback === 'correct' ? (
                  <div style={{ color: '#4ade80', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <CheckCircle /> ¡Correcto!
                  </div>
                ) : (
                  <div style={{ color: '#f87171', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><XCircle /> Incorrecto</div>
                    <span style={{ fontSize: '1rem', color: '#cbd5e1' }}>La respuesta correcta era: <strong>{currentEx.respuesta_esperada}</strong></span>
                  </div>
                )}
                <button type="button" className="btn-primary" onClick={nextEjercicio} style={{ width: '100%', fontSize: '1.2rem' }}>
                  {currentIdx < ejercicios.length - 1 ? 'Siguiente Ejercicio' : 'Finalizar'}
                </button>
              </div>
            )}
          </form>

        </div>
      </div>
    </Layout>
  );
};

export default Ejercicios;
