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

      <div style={{ marginTop: '4rem' }}>
        <h2 className="section-title">Formatos de Importación</h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>A continuación, te mostramos las plantillas y formatos requeridos para cargar contenido en la aplicación correctamente.</p>

        <div className="card" style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: '#60a5fa', margin: 0 }}>1. Vocabulario y Verbos (Glosario)</h3>
            <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }} onClick={() => window.electronAPI?.invoke('api:exportPlantilla', 'glosario')}>
              Descargar Plantilla
            </button>
          </div>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Tipo de archivo:</strong> <code>.md</code> o <code>.csv</code><br />
            <strong>Descripción:</strong> Se debe cargar un archivo que contenga tablas en formato Markdown. El sistema ignorará cualquier línea que no sea parte de una tabla. Si deseas establecer una categoría, coloca un título de nivel 2 (<code>## Categoría</code>) antes de las tablas.
          </p>
          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontFamily: 'monospace', color: '#e2e8f0', whiteSpace: 'pre' }}>
{`## Frutas
| Inglés | Español |
|---|---|
| Apple | Manzana |
| Banana | Plátano |

## Verbos
| Verbo | Pasado | Participio | Traducción |
|---|---|---|---|
| Go | Went | Gone | Ir |`}
          </div>
        </div>

        <div className="card" style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: '#60a5fa', margin: 0 }}>2. Ejercicios Prácticos</h3>
            <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }} onClick={() => window.electronAPI?.invoke('api:exportPlantilla', 'ejercicios')}>
              Descargar Plantilla
            </button>
          </div>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Tipo de archivo:</strong> <code>.json</code><br />
            <strong>Descripción:</strong> Un arreglo de objetos JSON. Cada objeto representa un ejercicio. Los tipos de ejercicio soportados son <code>Completar</code> y <code>Ordenar</code>.
          </p>
          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontFamily: 'monospace', color: '#e2e8f0', whiteSpace: 'pre' }}>
{`[
  {
    "tipo_ejercicio": "Completar",
    "prompt": "I ___ a student. (be)",
    "respuesta_esperada": "am"
  },
  {
    "tipo_ejercicio": "Ordenar",
    "prompt": "you / how / are / ?",
    "respuesta_esperada": "how are you?"
  }
]`}
          </div>
        </div>

        <div className="card" style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: '#60a5fa', margin: 0 }}>3. Reglas Gramaticales</h3>
            <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }} onClick={() => window.electronAPI?.invoke('api:exportPlantilla', 'reglas')}>
              Descargar Plantilla
            </button>
          </div>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Tipo de archivo:</strong> <code>.md</code><br />
            <strong>Descripción:</strong> Un archivo de texto en Markdown clásico que <strong>no contenga</strong> tablas de glosario (sin <code>|---|---|</code>). Todo el contenido se renderizará como la explicación o teoría del tema. El nombre del archivo se usará como título.
          </p>
          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontFamily: 'monospace', color: '#e2e8f0', whiteSpace: 'pre' }}>
{`### El Verbo To Be
El verbo *to be* significa ser o estar.
- I am
- You are
- He is`}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Configuracion;
