import { useState, useContext } from "react"
import './itemCard.css';
import ModalReclamado from './ModalReclamado';
import ModalQR from './ModalQR';
import ModalEmailPreview from './ModalEmailPreview';
import React from 'react'
import { RoleContext } from '../context/RoleContext';
import { ToastContext } from '../context/ToastContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

function ItemCard(props) {
  const { rol } = useContext(RoleContext)
  const { addToast } = useContext(ToastContext)
  const [estaReclamado, setEstaReclamado] = useState(false)
  const [mostrarQR, setMostrarQR] = useState(false)
  const [mostrarEmailPreview, setMostrarEmailPreview] = useState(false)
  const [ref, isVisible] = useIntersectionObserver();
  const estados = ["pendiente", "reclamado", "entregado"];

  const itemData = {
    nombre: props.nombre,
    habitacion: props.habitacion,
    registradoPor: props.registradoPor
  };

  const handleEstadoChange = (nuevoEstado) => {
    if(nuevoEstado === "reclamado"){
      setEstaReclamado(true)
    } else {
      props.onUpdate(props.id, nuevoEstado, itemData);
      const mensajes = {
        pendiente: "Estado cambiado a Pendiente",
        reclamado: "Objeto marcado como Reclamado",
        entregado: "Objeto entregado exitosamente"
      };
      addToast(mensajes[nuevoEstado], "success", 2000);
    }
  };

  const handleEnviarEmail = () => {
    setMostrarEmailPreview(true);
  };

  const handleConfirmarEmail = () => {
    setMostrarEmailPreview(false);
    addToast(`Email enviado a ${props.email_cliente}`, "success", 3000);
  };

  if (!isVisible) {
    return <div ref={ref} className="item-card-skeleton" />;
  }

  return (
    <section ref={ref} className={`item-card ${props.estado}`}>
      <div className="card-name">
        <h3>{props.nombre}</h3>
      </div>

      {props.foto_url && (
        <div className="card-image-container">
          <img src={props.foto_url} alt={props.nombre} className="card-item-image" loading="lazy" />
        </div>
      )}

      <div className="card-white-row">
        <p><strong>UBICACIÓN:</strong> {props.habitacion}</p>

        <p>
          <strong>ESTADO:</strong>
          <span className={`estado-text ${props.estado}`}>
            {props.estado.toUpperCase()}
          </span>
        </p>

        <p><strong>FECHA:</strong> {props.fecha}</p>

        {rol === "management" && <p><strong>POR:</strong> {props.registradoPor}</p>}

        {props.estado === "reclamado" && (
          <div className="datos-reclamacion">
            <p><strong>Reclamado por:</strong> {props.reclamado_por || "No especificado"}</p>
            {props.booking_cliente && <p><strong>Reserva:</strong> {props.booking_cliente}</p>}
            {props.email_cliente && (
              <div className="reclamacion-email-row">
                <span><strong>Email:</strong> {props.email_cliente}</span>
                <button
                  onClick={handleEnviarEmail}
                  className="btn-send-email"
                >
                  ✉️ Enviar Email
                </button>
              </div>
            )}
          </div>
        )}

        <div className="info-group">
          <span>
            {props.comentario && props.comentario.trim() !== "" ? props.comentario : "Sin notas"}
          </span>
        </div>

        <div className="card-controls">
          <div className="estado-buttons">
            {estados.map(estado => (
              <button
                key={estado}
                className={`estado-btn ${estado} ${props.estado === estado ? 'active' : ''}`}
                onClick={() => handleEstadoChange(estado)}
                aria-label={`Cambiar estado a ${estado}`}
                aria-pressed={props.estado === estado}
              >
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
              </button>
            ))}
          </div>

          <button className="qr-btn" onClick={() => setMostrarQR(true)} aria-label="Ver código QR del objeto" title="Ver QR">
            📱
          </button>

          {rol === "management" && <button className="delete-btn" onClick={props.onDelete} aria-label="Eliminar objeto">✕</button>}
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

      {mostrarQR && (
        <ModalQR
          id={props.id}
          nombre={props.nombre}
          onClose={() => setMostrarQR(false)}
        />
      )}

      {mostrarEmailPreview && props.email_cliente && (
        <ModalEmailPreview
          nombre={props.nombre}
          habitacion={props.habitacion}
          email={props.email_cliente}
          booking={props.booking_cliente}
          onClose={() => setMostrarEmailPreview(false)}
          onConfirm={handleConfirmarEmail}
        />
      )}
    </section>
  )
}

export default React.memo(ItemCard);