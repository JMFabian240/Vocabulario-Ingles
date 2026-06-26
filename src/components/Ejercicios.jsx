import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { CheckCircle, XCircle } from 'lucide-react';

const Ejercicios = () => {
  const { id } = useParams(); // temaId
  const navigate = useNavigate();
  const [ejercicios, setEjercicios] = useState([]);
  const [allEjercicios, setAllEjercicios] = useState([]);
  const [fullList, setFullList] = useState([]);
  const [mistakesDeck, setMistakesDeck] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [totalEjercicios, setTotalEjercicios] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [errores, setErrores] = useState(0);
  const [racha, setRacha] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  useEffect(() => {
    const fetchEjercicios = async () => {
      if (window.electronAPI) {
        const res = await window.electronAPI.invoke('api:getEjercicios', parseInt(id));
        if (res.success && res.data.length > 0) {
          const progresoRes = await window.electronAPI.invoke('api:getProgresoEjerciciosDetalle', parseInt(id));
          let idsCompletados = new Set();
          let aciertosPrevios = 0;

          if (progresoRes.success) {
            progresoRes.data.forEach(p => {
              if (p.estado === 'correct') aciertosPrevios++;
              if (p.estado === 'correct' || p.estado === 'incorrect') {
                idsCompletados.add(p.ejercicio_id);
              }
            });
          }

          setScore(aciertosPrevios);
          setTotalEjercicios(res.data.length);
          setFullList(res.data);

          const pendingEx = res.data.filter(e => !idsCompletados.has(e.id));

          if (pendingEx.length === 0) {
            setSessionCompleted(true);
          } else {
            setAllEjercicios(pendingEx);
          }
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
      setRacha(prev => prev + 1);
    } else {
      setFeedback('incorrect');
      setErrores(errores + 1);
      setRacha(0);
      setMistakesDeck(prev => [...prev, currentEx]);
    }
  };

  const nextEjercicio = async () => {
    if (window.electronAPI && feedback) {
      const currentEx = ejercicios[currentIdx];
      await window.electronAPI.invoke('api:updateProgresoEjercicioDetalle', {
        ejercicioId: currentEx.id,
        estado: feedback
      });
    }

    setFeedback(null);
    setInputValue('');
    if (currentIdx < ejercicios.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      if (mistakesDeck.length > 0) {
        setEjercicios([...mistakesDeck]);
        setMistakesDeck([]);
        setCurrentIdx(0);
      } else {
        setSessionCompleted(true);
        if (window.electronAPI) {
          await window.electronAPI.invoke('api:updateProgresoEjercicio', {
            temaId: parseInt(id),
            aciertos: score,
            total: totalEjercicios
          });
        }
      }
    }
  };

  if (fullList.length === 0 && !sessionCompleted) {
    return (
      <Layout>
        <h2 className="section-title">Práctica</h2>
        <p className="empty-state">No hay ejercicios para este tema.</p>
      </Layout>
    );
  }

  if (fullList.length > 0 && !selectedType && !sessionCompleted) {
    const qtyCompletar = allEjercicios.filter(e => e.tipo_ejercicio.toLowerCase() === 'completar').length;
    const qtyOrdenar = allEjercicios.filter(e => e.tipo_ejercicio.toLowerCase() === 'ordenar').length;
    const qtyResponder = allEjercicios.filter(e => e.tipo_ejercicio.toLowerCase() === 'responder').length;

    return (
      <Layout>
        <div style={{ textAlign: 'center', marginTop: '10vh' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Selecciona el Tipo de Ejercicio</h2>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <button 
              className="btn-primary" 
              style={{ fontSize: '1.5rem', padding: '1.5rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              onClick={() => {
                const categoryAll = fullList.filter(e => e.tipo_ejercicio.toLowerCase() === 'completar');
                const categoryPending = allEjercicios.filter(e => e.tipo_ejercicio.toLowerCase() === 'completar');
                
                if (categoryAll.length === 0) { alert('No hay ejercicios de Completar creados para este tema.'); return; }
                
                const filtered = categoryPending.length > 0 ? categoryPending : categoryAll;
                setEjercicios(filtered);
                setTotalEjercicios(filtered.length);
                setSelectedType('Completar');
                setScore(0);
                setErrores(0);
              }}
            >
              Completar
            </button>
            <button 
              className="btn-primary" 
              style={{ fontSize: '1.5rem', padding: '1.5rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              onClick={() => {
                const categoryAll = fullList.filter(e => e.tipo_ejercicio.toLowerCase() === 'ordenar');
                const categoryPending = allEjercicios.filter(e => e.tipo_ejercicio.toLowerCase() === 'ordenar');
                
                if (categoryAll.length === 0) { alert('No hay ejercicios de Ordenar creados para este tema.'); return; }
                
                const filtered = categoryPending.length > 0 ? categoryPending : categoryAll;
                setEjercicios(filtered);
                setTotalEjercicios(filtered.length);
                setSelectedType('Ordenar');
                setScore(0);
                setErrores(0);
              }}
            >
              Ordenar
            </button>
            <button 
              className="btn-primary" 
              style={{ fontSize: '1.5rem', padding: '1.5rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              onClick={() => {
                const categoryAll = fullList.filter(e => e.tipo_ejercicio.toLowerCase() === 'responder');
                const categoryPending = allEjercicios.filter(e => e.tipo_ejercicio.toLowerCase() === 'responder');
                
                if (categoryAll.length === 0) { alert('No hay ejercicios de Responder creados para este tema.'); return; }
                
                const filtered = categoryPending.length > 0 ? categoryPending : categoryAll;
                setEjercicios(filtered);
                setTotalEjercicios(filtered.length);
                setSelectedType('Responder');
                setScore(0);
                setErrores(0);
              }}
            >
              Responder
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (sessionCompleted) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', marginTop: '10vh' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Sesión Completada</h2>
          <p style={{ fontSize: '1.5rem', color: '#cbd5e1', marginBottom: '2rem' }}>
            Tu puntaje: <strong style={{ color: '#818cf8', fontSize: '2rem' }}>{score} / {totalEjercicios}</strong>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={async () => {
              if (window.electronAPI) {
                await window.electronAPI.invoke('api:resetProgresoEjerciciosTema', parseInt(id));
              }
              setRacha(0);
              window.location.reload();
            }}>Repasar de nuevo</button>
            <button className="btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer' }} onClick={() => navigate(-1)}>Volver al Menú</button>
          </div>
        </div>
      </Layout>
    );
  }

  const currentEx = ejercicios[currentIdx];

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', marginBottom: '1rem' }}>
        <h2 className="section-title" style={{ margin: 0, flex: 1 }}>Ejercicios: {currentEx.tipo_ejercicio}</h2>
        <div style={{ flex: 1, textAlign: 'center' }}>
          {racha >= 2 && (
            <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
              🔥 Racha: {racha}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', flex: 1 }}>
          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
            Restantes: {ejercicios.length - currentIdx + mistakesDeck.length}
          </span>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', padding: '0 1rem' }}>
            <span style={{ color: '#4ade80', fontWeight: 'bold' }}>Aciertos: {score}</span>
            <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Errores: {errores}</span>
          </div>
        </div>
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
                  <div style={{ color: '#4ade80', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle /> ¡Correcto!</div>
                    {currentEx.significado && <span style={{ fontSize: '1.1rem', color: '#fbbf24', marginTop: '0.5rem' }}><strong>Significado:</strong> {currentEx.significado}</span>}
                  </div>
                ) : (
                  <div style={{ color: '#f87171', fontSize: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><XCircle /> Incorrecto</div>
                    <span style={{ fontSize: '1rem', color: '#cbd5e1' }}>La respuesta correcta era: <strong>{currentEx.respuesta_esperada}</strong></span>
                    {currentEx.significado && <span style={{ fontSize: '1.1rem', color: '#fbbf24', marginTop: '0.5rem' }}><strong>Significado:</strong> {currentEx.significado}</span>}
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
