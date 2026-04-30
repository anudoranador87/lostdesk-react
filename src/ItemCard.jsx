function ItemCard(props){
  return (
     <section>
        <h3>Nombre del objeto: {props.nombre} </h3>
        <p>Ubicacion: {props.habitacion} </p>
        <p>Estado: {props.estado} </p>
        <p> Fecha: {props.fecha} </p>

       </section>


  )



}

export default ItemCard