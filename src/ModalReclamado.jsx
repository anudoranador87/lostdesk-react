import { useState } from "react";
import "./modalReclamado.css"; 

function ModalReclamado({ id, setEstaReclamado, onUpdate }) {
  const [reclamadoPor, setReclamadoPor] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [bookingCliente, setBookingCliente] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reclamadoPor.trim()) {
      alert("Por favor, introduce el nombre de la persona que reclama.");
      return;
    }

    onUpdate(id, "reclamado", {
      reclamado_por: reclamadoPor,
      email_cliente: emailCliente,
      booking_cliente: bookingCliente,
    });

    setEstaReclamado(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registrar Reclamación</h2>
        <p>Introduce los datos del cliente para el objeto verificado.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Reclamante:</label>
            <input
              type="text"
              value={reclamadoPor}
              onChange={(e) => setReclamadoPor(e.target.value)}
              placeholder="Ej. John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Email del Cliente:</label>
            <input
              type="email"
              value={emailCliente}
              onChange={(e) => setEmailCliente(e.target.value)}
              placeholder="Ej. john@booking.com"
            />
          </div>

          <div className="form-group">
            <label>Código de Reserva (Booking):</label>
            <input
              type="text"
              value={bookingCliente}
              onChange={(e) => setBookingCliente(e.target.value)}
              placeholder="Ej. 453216789"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setEstaReclamado(false)}
            >
              Cancelar
            </button>
            
            <button type="submit" className="btn-primary">
              Confirmar Reclamación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalReclamado;