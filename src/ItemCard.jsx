import {useState} from "react"
import './itemCard.css';
 

function ItemCard(props){

  const[estado, setEstado] = useState("pendiente")

  return (
    <section className={`item-card ${estado}`}>
      
        
        <h3>Nombre del objeto: {props.nombre} </h3>
      <div className="item-card">
        <p>Ubicacion: {props.habitacion} </p>
      <span className={`estado ${estado}`}>
        <p>Estado: {props.estado} </p>
      </span>
        <p> Fecha: {props.fecha} </p>
        <p>Registrado por:{props.registradoPor} </p>
       
        <button className = "btn-eliminar" onClick={props.onDelete}>✕</button>
        <label htmlFor="estado">Estado</label>
        <select id="estado" className ="select-estado" value={estado} onChange={(e) => {
  setEstado(e.target.value)
  props.onUpdate(props.id, e.target.value)
}}>

  <option value="pendiente">Pendiente</option>
  <option value="reclamado">Reclamado</option>
  <option value="entregado">Entregado</option>
</select>
</div>
      
       </section>


  )



}

export default ItemCard
