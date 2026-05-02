import {useState} from "react"


function ItemCard(props){

  const[estado, setEstado] = useState("pendiente")

  return (
     <section>
        <h3>Nombre del objeto: {props.nombre} </h3>
        <p>Ubicacion: {props.habitacion} </p>
        <p>Estado: {props.estado} </p>
        <p> Fecha: {props.fecha} </p>
        <p>Registrado por:{props.registradoPor} </p>
        <button onClick={props.onDelete}>Eliminar</button>
        <label htmlFor="estado">Estado</label>
        <select id="estado" value={estado} onChange={(e) => {
  setEstado(e.target.value)
  props.onUpdate(props.id, e.target.value)
}}>
  <option value="pendiente">Pendiente</option>
  <option value="reclamado">Reclamado</option>
  <option value="entregado">Entregado</option>
</select>
      
       </section>


  )



}

export default ItemCard
