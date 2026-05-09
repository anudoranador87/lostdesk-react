import { useState, useContext } from 'react';
import { RoleContext } from './RoleContext';
import './ItemForm.css';

function ItemForm(props) {
  const [nombre, setNombre] = useState("");
  const [hab, setHab] = useState("");
  const [date, setDate] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [comentario, setComentario] = useState(""); 
  const { activo } = useContext(RoleContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoItem = { 
      registradoPor: activo,
      id: Date.now(),
      nombre: nombre,
      habitacion: hab, 
      estado: estado,
      fecha: date,
      comentario: comentario 
    };
    props.onAddItem(nuevoItem);
    props.onClose();
  };

  return (
    <div className="form-overlay">
      <div className="form-card">
        <div className="form-header">
          <h2>Nuevo Registro</h2>
          <button type="button" className="close-x-btn" onClick={props.onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          <div className="input-box">
            <label>Nombre del Objeto</label>
            <input 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
            />
          </div>

          <div className="input-box">
            <label>Ubicación</label>
            <input 
              type="text" 
              value={hab} 
              onChange={(e) => setHab(e.target.value)} 
              required 
            />
          </div>

          <div className="input-box">
            <label>Observaciones</label>
            <textarea 
              value={comentario} 
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Ej: Rayadura en el cristal..."
              rows="2"
            />
          </div>

          <div className="form-row-split">
            <div className="input-box">
              <label>Fecha</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
              />
            </div>
            <div className="input-box">
              <label>Estado Inicial</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="pendiente">Pendiente</option>
                <option value="reclamado">Reclamado</option>
                <option value="entregado">Entregado</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-form-btn">Confirmar Registro</button>
        </form>
      </div>
    </div>
  );
}

export default ItemForm;