import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './Historial.css';

export default function Historial() {
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchHistorial() {
      try {
        const { data, error } = await supabase
          .from('historial')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          setError('Error al cargar el historial');
          console.error(error);
        } else {
          setHistorial(data || []);
        }
      } catch (err) {
        setError('Error de conexión');
      } finally {
        setCargando(false);
      }
    }

    fetchHistorial();
  }, []);

  if (cargando) return <div className="historial-container">Cargando historial...</div>;
  if (error) return <div className="historial-container error">{error}</div>;

  return (
    <div className="historial-container">
      <h2>Historial de Actividad</h2>
      <div className="table-responsive">
        <table className="historial-table">
          <thead>
            <tr>
              <th>Fecha/Hora</th>
              <th>Objeto</th>
              <th>Ubicación</th>
              <th>Acción</th>
              <th>Estado Nuevo</th>
              <th>Usuario/Rol</th>
            </tr>
          </thead>
          <tbody>
            {historial.length > 0 ? (
              historial.map((reg) => (
                <tr key={reg.id}>
                  <td>{new Date(reg.created_at).toLocaleString()}</td>
                  <td>{reg.nombre_objeto}</td>
                  <td>{reg.habitacion}</td>
                  <td>
                    <span className={`accion-badge ${reg.accion.replace(/\s+/g, '-')}`}>
                      {reg.accion}
                    </span>
                  </td>
                  <td>{reg.estado_nuevo || '-'}</td>
                  <td>{reg.rol}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center' }}>No hay registros de actividad.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
