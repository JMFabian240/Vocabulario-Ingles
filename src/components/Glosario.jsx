import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import { Volume2, Check, X } from 'lucide-react';

const Glosario = () => {
  const { id } = useParams(); // temaId
  const [flashcards, setFlashcards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (window.electronAPI) {
        const res = await window.electronAPI.invoke('api:getGlosario', parseInt(id));
        if (res.success && res.data.length > 0) {
          setFlashcards(res.data);
          // Shuffle deck for initial session
          const shuffled = [...res.data].sort(() => Math.random() - 0.5);
          setDeck(shuffled);
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

  const handleCorrect = (e) => {
    e.stopPropagation();
    setIsFlipped(false);
    
    // Si quedan cartas
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setSessionCompleted(true);
    }
  };

  const handleIncorrect = (e) => {
    e.stopPropagation();
    setIsFlipped(false);
    
    // Enviar carta al final del mazo
    const currentCard = deck[currentIndex];
    const newDeck = [...deck, currentCard];
    setDeck(newDeck);
    setCurrentIndex(currentIndex + 1);
  };

  if (flashcards.length === 0) {
    return (
      <Layout>
        <h2 className="section-title">Glosario</h2>
        <p className="empty-state">No hay palabras configuradas para este tema.</p>
      </Layout>
    );
  }

  if (sessionCompleted) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', marginTop: '10vh' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉 ¡Excelente!</h2>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1' }}>Has completado todas las tarjetas de esta sesión.</p>
          <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => {
            setDeck([...flashcards].sort(() => Math.random() - 0.5));
            setCurrentIndex(0);
            setSessionCompleted(false);
          }}>Repasar de nuevo</button>
        </div>
      </Layout>
    );
  }

  const currentCard = deck[currentIndex];

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="section-title">Flashcards</h2>
        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
          Cartas restantes: {deck.length - currentIndex}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', perspective: '1000px' }}>
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            width: '400px',
            height: '250px',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            cursor: 'pointer'
          }}
        >
          {/* Frente (Inglés) */}
          <div className="card glass-panel" style={{
            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem'
          }}>
            <button className="btn-icon" onClick={(e) => speak(e, currentCard.frente_ingles)} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <Volume2 size={20} />
            </button>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>{currentCard.frente_ingles}</h1>
            <p style={{ color: '#94a3b8' }}>Toca para ver la respuesta</p>
          </div>

          {/* Reverso (Español) */}
          <div className="card glass-panel" style={{
            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '2rem'
          }}>
            <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
      </div>
    </Layout>
  );
};

export default Glosario;
