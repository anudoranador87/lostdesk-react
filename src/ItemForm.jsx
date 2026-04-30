import { useState } from 'react'

function ItemForm(props) {
  const [nombre, setNombre] = useState("")
  const [hab, setHab] = useState("")
  const [date, setDate] = useState("")
  const [estado, setEstado] = useState("pendiente")

  function handleSubmit(e){
    e.preventDefault() 
    const nuevoItem = { 
        id: Date.now(),
        nombre: nombre,
        habitacion: hab,
        estado: estado,
        fecha: date
      }
      props.onAddItem(nuevoItem)
      // hay que limpiar los campos,SETTERS, son funciones!! no variables
    setNombre("")
    setHab("")
    setDate("")
    setEstado("pendiente")  
// al añadir el formulario, se vacia y ademas, desaparece: 
props.onClose()
  }
  return (
    <form onSubmit={handleSubmit}> 
      <label htmlFor="nombre">Nombre: </label>
      <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <label htmlFor="Hab">Habitacion: </label>
      <input type="text" id="Hab" value={hab} onChange={(e) => setHab(e.target.value)} />

      <label htmlFor="date">Fecha: </label>
      <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <label htmlFor="estado">Estado</label>
      <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="pendiente">Pendiente</option>
        <option value="reclamado">Reclamado</option>
        <option value="entregado">Entregado</option>
      </select>

      <button type="submit">Añadir Item</button>
    </form>
  )
}

export default ItemForm