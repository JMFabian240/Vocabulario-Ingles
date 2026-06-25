import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import { Volume2, Check, X, ArrowLeft, ArrowRight } from 'lucide-react';

const Glosario = () => {
  const { id } = useParams(); // temaId
  const [flashcards, setFlashcards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [mistakesDeck, setMistakesDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [temaNombre, setTemaNombre] = useState('');
  const [aciertos, setAciertos] = useState(0);
  const [errores, setErrores] = useState(0);

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (window.electronAPI) {
        const temaRes = await window.electronAPI.invoke('api:getTema', parseInt(id));
        if (temaRes.success && temaRes.data) {
          setTemaNombre(temaRes.data.nombre);
        }

        const res = await window.electronAPI.invoke('api:getGlosario', parseInt(id));
        if (res.success && res.data.length > 0) {
          const progresoRes = await window.electronAPI.invoke('api:getProgresoFlashcards', parseInt(id));
          let progresoAcumulado = { aciertos: 0, errores: 0 };
          let idsCompletados = new Set();

          if (progresoRes.success) {
            progresoRes.data.forEach(p => {
              if (p.estado === 'correcto') progresoAcumulado.aciertos++;
              if (p.estado === 'incorrecto') progresoAcumulado.errores++;
              if (p.estado === 'correcto' || p.estado === 'incorrecto') {
                idsCompletados.add(p.flashcard_id);
              }
            });
          }

          setAciertos(progresoAcumulado.aciertos);
          setErrores(progresoAcumulado.errores);
          setFlashcards(res.data);

          const pendingCards = res.data.filter(c => !idsCompletados.has(c.id));
          
          if (pendingCards.length === 0) {
            setSessionCompleted(true);
          } else {
            const shuffled = pendingCards.sort(() => Math.random() - 0.5);
            setDeck(shuffled);
          }
        }
      }
    };
    fetchFlashcards();
  }, [id]);

  const speak = (e, text) => {
    e.stopPropagation(); // Prevenir flip
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const changeCardWithAnimation = (action) => {
    if (isAnimating) return;
    
    if (isFlipped) {
      setIsAnimating(true);
      setIsFlipped(false);
      // Esperar a que la tarjeta esté a 90 grados (invisible) para cambiar el contenido
      setTimeout(() => {
        action();
        // Esperar a que termine la animación de volteo
        setTimeout(() => setIsAnimating(false), 300);
      }, 300);
    } else {
      action();
    }
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (currentIndex > 0) {
      changeCardWithAnimation(() => setCurrentIndex(currentIndex - 1));
    }
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (currentIndex < deck.length - 1) {
      changeCardWithAnimation(() => setCurrentIndex(currentIndex + 1));
    }
  };

  const handleCorrect = (e) => {
    if (e) e.stopPropagation();
    changeCardWithAnimation(async () => {
      const currentCard = deck[currentIndex];
      setAciertos(prev => prev + 1);
      
      if (window.electronAPI) {
        await window.electronAPI.invoke('api:updateProgresoFlashcard', { flashcardId: currentCard.id, estado: 'correcto' });
      }

      if (currentIndex < deck.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        if (mistakesDeck.length > 0) {
          setDeck([...mistakesDeck]);
          setMistakesDeck([]);
          setCurrentIndex(0);
        } else {
          setSessionCompleted(true);
        }
      }
    });
  };

  const handleIncorrect = (e) => {
    if (e) e.stopPropagation();
    changeCardWithAnimation(async () => {
      const currentCard = deck[currentIndex];
      setErrores(prev => prev + 1);

      if (window.electronAPI) {
        await window.electronAPI.invoke('api:updateProgresoFlashcard', { flashcardId: currentCard.id, estado: 'incorrecto' });
      }

      const newMistakes = [...mistakesDeck, currentCard];
      setMistakesDeck(newMistakes);

      if (currentIndex < deck.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setDeck([...newMistakes]);
        setMistakesDeck([]);
        setCurrentIndex(0);
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (sessionCompleted || isAnimating || flashcards.length === 0) return;

      switch(e.key) {
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Enter':
          handleCorrect();
          break;
        case 'Backspace':
          handleIncorrect();
          break;
        case ' ':
        case 'Spacebar':
          e.preventDefault();
          if (!isAnimating) setIsFlipped(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, deck, isFlipped, sessionCompleted, isAnimating, flashcards]);

  if (flashcards.length === 0) {
    return (
      <Layout title={temaNombre}>
        <h2 className="section-title">Glosario</h2>
        <p className="empty-state">No hay palabras configuradas para este tema.</p>
      </Layout>
    );
  }

  if (sessionCompleted) {
    return (
      <Layout title={temaNombre}>
        <div style={{ textAlign: 'center', marginTop: '10vh' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉 ¡Excelente!</h2>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1' }}>Has completado todas las tarjetas de esta sesión.</p>
          <div style={{ margin: '2rem 0', display: 'flex', gap: '2rem', justifyContent: 'center', fontSize: '1.2rem' }}>
            <span style={{ color: '#4ade80', fontWeight: 'bold' }}>Aciertos: {aciertos}</span>
            <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Errores: {errores}</span>
          </div>
          <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={async () => {
            if (window.electronAPI) {
              await window.electronAPI.invoke('api:resetProgresoTema', parseInt(id));
            }
            setDeck([...flashcards].sort(() => Math.random() - 0.5));
            setMistakesDeck([]);
            setCurrentIndex(0);
            setAciertos(0);
            setErrores(0);
            setSessionCompleted(false);
          }}>Repasar de nuevo</button>
        </div>
      </Layout>
    );
  }

  const currentCard = deck[currentIndex];

  return (
    <Layout title={temaNombre}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 className="section-title" style={{ margin: 0, flex: 1 }}>Flashcards</h2>
        
        <div style={{ flex: 2, textAlign: 'center' }}>
          {currentCard?.categoria && (
            <span style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '0.5rem 1.5rem', borderRadius: '20px', color: '#818cf8', fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {currentCard.categoria}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', flex: 1 }}>
          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
            Progreso: {currentIndex + 1} / {deck.length}
          </span>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', padding: '0 1rem' }}>
            <span style={{ color: '#4ade80', fontWeight: 'bold' }}>Aciertos: {aciertos}</span>
            <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Errores: {errores}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', height: '60vh', perspective: '1000px' }}>
        
        <button 
          className="btn-icon" 
          onClick={handlePrev} 
          disabled={currentIndex === 0 || isAnimating}
          style={{ opacity: currentIndex === 0 ? 0.3 : 1, transition: 'opacity 0.3s' }}
        >
          <ArrowLeft size={32} />
        </button>

        <div 
          onClick={() => { if (!isAnimating) setIsFlipped(!isFlipped) }}
          style={{
            width: '600px',
            minHeight: '350px',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            cursor: isAnimating ? 'default' : 'pointer'
          }}
        >
          {/* Frente (Inglés) */}
          <div className="card glass-panel" style={{
            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem',
            padding: '2rem', textAlign: 'center'
          }}>
            <button className="btn-icon" onClick={(e) => speak(e, currentCard.frente_ingles)} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <Volume2 size={20} />
            </button>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 'bold', margin: 0 }}>{currentCard.frente_ingles}</h1>
            <p style={{ color: '#94a3b8', margin: 0 }}>Toca para ver la respuesta</p>
          </div>

          {/* Reverso (Español) */}
          <div className="card glass-panel" style={{
            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '2rem', textAlign: 'center'
          }}>
            <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h2 style={{ fontSize: '2rem', color: '#818cf8', marginBottom: '0.5rem' }}>{currentCard.reverso_espanol}</h2>
              <span style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.9rem', width: 'fit-content', margin: '0 auto' }}>
                {currentCard.tipo_palabra}
              </span>
              {currentCard.tipo_palabra === 'Verbo' && currentCard.pasado_simple && (
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                  <p>Pasado: {currentCard.pasado_simple}</p>
                  <p>Participio: {currentCard.participio}</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '2rem', width: '100%', justifyContent: 'center' }}>
              <button onClick={handleIncorrect} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '1rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)' }}>
                <X size={32} />
              </button>
              <button onClick={handleCorrect} style={{ background: '#22c55e', color: 'white', border: 'none', padding: '1rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)' }}>
                <Check size={32} />
              </button>
            </div>
          </div>
        </div>

        <button 
          className="btn-icon" 
          onClick={handleNext} 
          disabled={currentIndex === deck.length - 1 || isAnimating}
          style={{ opacity: currentIndex === deck.length - 1 ? 0.3 : 1, transition: 'opacity 0.3s' }}
        >
          <ArrowRight size={32} />
        </button>
      </div>
    </Layout>
  );
};

export default Glosario;
