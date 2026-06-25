import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft, BookOpen } from 'lucide-react';

const Layout = ({ children, title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <div className="page-container glass-panel animate-fade-in">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
          <BookOpen className="icon" size={32} color="#818cf8" />
          <h1>{title || 'App de Repaso de Inglés'}</h1>
        </div>
        
        <nav style={{ display: 'flex', gap: '1rem' }}>
          {!isHome && (
            <>
              <button className="btn-icon" onClick={() => navigate(-1)} title="Atrás">
                <ArrowLeft size={24} />
              </button>
              <button className="btn-icon" onClick={() => navigate('/')} title="Inicio">
                <Home size={24} />
              </button>
            </>
          )}
        </nav>
      </header>
      
      <main className="content-container" style={{ overflowY: 'auto', height: '100%', paddingRight: '1rem' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
