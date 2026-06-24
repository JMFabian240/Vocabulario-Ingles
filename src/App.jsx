import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';

const SeleccionNivel = () => {
  const [niveles, setNiveles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNiveles = async () => {
      if (window.electronAPI) {
        const response = await window.electronAPI.invoke('api:getNiveles');
        if (response.success) {
          setNiveles(response.data);
        }
      }
    };
    fetchNiveles();
  }, []);

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="section-title">Selecciona tu Nivel</h2>
        <button className="btn-primary" onClick={() => navigate('/config')}>Configuración</button>
      </div>
      
      <div className="grid-cards">
        {niveles.length === 0 ? (
          <p className="empty-state">No hay niveles disponibles. Ve a Configuración para crearlos.</p>
        ) : (
          niveles.map(nivel => (
            <div key={nivel.id} className="card interactive">
              <h3>{nivel.nombre}</h3>
              <p>{nivel.descripcion}</p>
              <button className="btn-primary" onClick={() => navigate(`/nivel/${nivel.id}`)}>Ingresar</button>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

import Configuracion from './components/Configuracion';

import ConfiguracionNivel from './components/ConfiguracionNivel';
import ConfiguracionTema from './components/ConfiguracionTema';
import NivelHome from './components/NivelHome';
import Glosario from './components/Glosario';
import Gramatica from './components/Gramatica';
import Ejercicios from './components/Ejercicios';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SeleccionNivel />} />
        <Route path="/config" element={<Configuracion />} />
        <Route path="/config/nivel/:id" element={<ConfiguracionNivel />} />
        <Route path="/config/tema/:id" element={<ConfiguracionTema />} />
        <Route path="/nivel/:id" element={<NivelHome />} />
        <Route path="/glosario/:id" element={<Glosario />} />
        <Route path="/gramatica/:id" element={<Gramatica />} />
        <Route path="/ejercicios/:id" element={<Ejercicios />} />
      </Routes>
    </Router>
  );
};

export default App;
