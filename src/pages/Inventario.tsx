import React from 'react';
import { useLostItems } from '../hooks/useLostItems';
import './Historial.css'; // Reutilizamos estilos de tabla

export default function Inventario() {
  const { state: items, spinner } = useLostItems();

  if (spinner) return <div className="historial-container">Cargando inventario...</div>;

  return (
    <div className="historial-container">
      <h2>Inventario Completo (Vista Tabla)</h2>
      <div className="table-responsive">
        <table className="historial-table">
          <thead>
            <tr>
              <th>ID Corto</th>
              <th>Objeto</th>
              <th>Habitación</th>
              <th>Fecha de Hallazgo</th>
              <th>Estado Actual</th>
              <th>Registrado Por</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{String(item.id).split('-')[0]}</td>
                  <td>{item.nombre}</td>
                  <td>{item.habitacion}</td>
                  <td>{item.fecha}</td>
                  <td>
                    <span className={`accion-badge ${item.estado}`}>
                      {item.estado}
                    </span>
                  </td>
                  <td>{item.registrado_por}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center' }}>No hay objetos en el inventario.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
