import { useState, useContext } from "react"
import './itemCard.css';
import ModalReclamado from './ModalReclamado'; 
import React from 'react'
import { RoleContext } from './RoleContext';

function ItemCard(props) {
  const { rol } = useContext(RoleContext)
  const [estaReclamado, setEstaReclamado] = useState(false)
  const coloresTexto = {
    pendiente: "#f59e0b",
    reclamado: "#3b82f6",
    entregado: "#10b981"
  }

  const itemData = {
    nombre: props.nombre,
    habitacion: props.habitacion,
    registradoPor: props.registradoPor
  };

  const handleEstadoChange = (e) => {
    const nuevoEstado = e.target.value;
    if(nuevoEstado === "reclamado"){
      setEstaReclamado(true)
    } else { 
      props.onUpdate(props.id, nuevoEstado, itemData);
    }
  };

  const handleEnviarEmail = () => {
    alert(`Simulando envío de email a: ${props.email_cliente || 'No asignado'}`);
  };

  return (
    <section className={`item-card ${props.estado}`}>
      <div className="card-name">
        <h3>{props.nombre}</h3>
      </div>

      <div className="card-white-row">
        <p><strong>UBICACIÓN:</strong> {props.habitacion}</p>
        
        <p>
          <strong>ESTADO:</strong> 
          <span style={{ color: coloresTexto[props.estado], fontWeight: 'bold' }}>
            {props.estado.toUpperCase()}
          </span>
        </p>

        <p><strong>FECHA:</strong> {props.fecha}</p>
        
        {rol === "management" && <p><strong>POR:</strong> {props.registradoPor}</p>}
        
        {props.estado === "reclamado" && (
          <div className="datos-reclamacion" style={{
            backgroundColor: '#eff6ff',
            borderLeft: '4px solid #3b82f6',
            padding: '10px',
            borderRadius: '4px',
            margin: '10px 0',
            fontSize: '0.9rem'
          }}>
            <p style={{ margin: '2px 0' }}><strong>Reclamado por:</strong> {props.reclamado_por || "No especificado"}</p>
            {props.booking_cliente && <p style={{ margin: '2px 0' }}><strong>Reserva:</strong> {props.booking_cliente}</p>}
            {props.email_cliente && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ wordBreak: 'break-all' }}><strong>Email:</strong> {props.email_cliente}</span>
                <button 
                  onClick={handleEnviarEmail}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: '#ffffff',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  ✉️ Enviar Email
                </button>
              </div>
            )}
          </div>
        )}

        <div className="info-group">
          <span style={{ color: '#64748b', fontStyle: 'italic' }}>
            {props.comentario && props.comentario.trim() !== "" ? props.comentario : "Sin notas"}
          </span>
        </div>

        <div className="card-controls">
          <select value={props.estado} onChange={handleEstadoChange}>
            <option value="pendiente">Pendiente</option>
            <option value="reclamado">Reclamado</option>
            <option value="entregado">Entregado</option>
          </select>
          
          {rol === "management" && <button className="delete-btn" onClick={props.onDelete}>✕</button>}
        </div>
      </div>

      {estaReclamado && (
        <ModalReclamado 
          id={props.id} 
          setEstaReclamado={setEstaReclamado} 
          onUpdate={(id, estado, camposDelModal) => {
            props.onUpdate(id, estado, itemData, camposDelModal);
          }} 
        />
      )}
    </section>
  )
}

export default React.memo(ItemCard);