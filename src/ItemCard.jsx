import { useState } from "react"
import './itemCard.css';

function ItemCard(props) {
  const [estado, setEstado] = useState(props.estado)

  const coloresTexto = {
    pendiente: "#f59e0b",
    reclamado: "#3b82f6",
    entregado: "#10b981"
  }

  const handleEstadoChange = (e) => {
    const nuevoEstado = e.target.value;
    setEstado(nuevoEstado);
    props.onUpdate(props.id, nuevoEstado);
  };

  return (
    <section className={`item-card ${estado}`}>
    
      <div className="card-name">
        <h3>{props.nombre}</h3>
      </div>

     
      <div className="card-white-row">
        <p><strong>UBICACIÓN:</strong> {props.habitacion}</p>
        
        <p>
          <strong>ESTADO:</strong> 
          <span style={{ color: coloresTexto[estado], fontWeight: 'bold' }}>
            {estado.toUpperCase()}
          </span>
        </p>

        <p><strong>FECHA:</strong> {props.fecha}</p>
        
        <p><strong>POR:</strong> {props.registradoPor}</p>
        <div className="info-group">
        <span style={{ color: '#64748b', fontStyle: 'italic' }}>
            {props.comentario && props.comentario.trim() !== "" ? props.comentario : "Sin notas"}
          </span>
</div>
        <div className="card-controls">
          <select value={estado} onChange={handleEstadoChange}>
            <option value="pendiente">Pendiente</option>
            <option value="reclamado">Reclamado</option>
            <option value="entregado">Entregado</option>
          </select>
          
          <button className="delete-btn" onClick={props.onDelete}>✕</button>
        </div>
      </div>
    </section>
  )
}

export default ItemCard;