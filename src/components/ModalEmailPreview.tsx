import React from 'react';
import './ModalEmailPreview.css';

interface ModalEmailPreviewProps {
  nombre: string;
  habitacion: string;
  email: string;
  booking?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalEmailPreview({
  nombre,
  habitacion,
  email,
  booking,
  onClose,
  onConfirm,
}: ModalEmailPreviewProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content email-preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="email-preview-header">
          <h2>Vista Previa del Email</h2>
          <button className="close-x-btn" onClick={onClose} aria-label="Cerrar preview">✕</button>
        </div>

        <p className="email-preview-to">
          Para: <strong>{email}</strong>
        </p>

        <div className="email-template">
          <div className="email-template-header">
            <span className="email-brand">🏨 LOSTDESK</span>
            <span className="email-subject">Notificación de Objeto Encontrado</span>
          </div>

          <div className="email-template-body">
            <p>Estimado huésped,</p>
            <p>
              Le informamos que hemos localizado un objeto que podría pertenecerle
              en nuestras instalaciones:
            </p>

            <div className="email-detail-box">
              <div className="email-detail-row">
                <span className="email-detail-label">Artículo</span>
                <span className="email-detail-value">{nombre}</span>
              </div>
              <div className="email-detail-row">
                <span className="email-detail-label">Ubicación</span>
                <span className="email-detail-value">Habitación / Zona {habitacion}</span>
              </div>
              {booking && (
                <div className="email-detail-row">
                  <span className="email-detail-label">Reserva</span>
                  <span className="email-detail-value">{booking}</span>
                </div>
              )}
            </div>

            <p>
              Puede ponerse en contacto con recepción para coordinar la recogida
              o el envío de su pertenencia.
            </p>
            <p className="email-signature">
              Atentamente,<br />
              <strong>Departamento de Objetos Perdidos</strong>
            </p>
          </div>

          <div className="email-template-footer">
            <span>Este es un correo automático generado por LostDesk.</span>
          </div>
        </div>

        <div className="email-preview-actions">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={onConfirm}>✉️ Confirmar Envío</button>
        </div>
      </div>
    </div>
  );
}
