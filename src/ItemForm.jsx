import { useState, useContext } from 'react';
import { RoleContext } from './RoleContext';
import './ItemForm.css';
import { supabase } from './supabase'

function ItemForm(props) {
  const [nombre, setNombre] = useState("");
  const [hab, setHab] = useState("");
  const [date, setDate] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [comentario, setComentario] = useState(""); 
  const { rol } = useContext(RoleContext);
  const [foto, setFoto] = useState(null)
  
const handleSubmit = async (e) => {
    e.preventDefault();
    //antes de agregar el itemm hay que subir la foto
   const nombreArchivo = `${Date.now()}_${foto.name}`
   await supabase.storage.from('fotos-objetos').upload(nombreArchivo, foto)
   const { data: urlData } = supabase.storage.from('fotos-objetos').getPublicUrl(nombreArchivo)
    const nuevoItem = { 
      registrado_por: rol,
       nombre: nombre,
      habitacion: hab, 
      estado: estado,
      fecha: date,
      comentario: comentario,
      foto_url: urlData.publicUrl
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
              <div className="input-box">
                <label>Foto del objeto</label>
                <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} />
</div>
            </div>
          </div>

          <button type="submit" className="submit-form-btn">Confirmar Registro</button>
        </form>
      </div>
    </div>
  );
}

export default ItemForm;