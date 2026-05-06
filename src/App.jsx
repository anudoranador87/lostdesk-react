import Header from './Header';
import StatBar from './StatBar';
import ItemCard from './ItemCard';
import ItemForm from './ItemForm';
import { useState, useEffect, useReducer } from 'react'
import {RoleContext} from './RoleContext';
import { useLostItems } from './useLostItems'



function App() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const[activo, setActivo] = useState("recepcion")
  const { state, dispatch, handleAddItem } = useLostItems()
  return (

  <RoleContext.Provider value={{ activo, setActivo }}> 
    <div>
      <Header />
      <button onClick={() => setActivo("recepcion")}>Recepcion</button> 
      <button onClick={() => setActivo("houseKeeping")}>House Keeping</button> 
      <button onClick={() => setActivo("management")}>Management</button> 
      <StatBar />
      <button onClick={() => setMostrarFormulario(true)}>Registrar objeto</button>
      {mostrarFormulario && <ItemForm onAddItem={handleAddItem} onClose={() => setMostrarFormulario(false)} />}
      {state.map(item => ( 
     <ItemCard key={item.id}  // key es propia de react, no componente
     id={item.id} // para que itemCard acceda 
     nombre={item.nombre}
     habitacion={item.habitacion}
     estado={item.estado}
     fecha={item.fecha}
     registradoPor={item.registradoPor}
     onDelete={() => dispatch({ type: "DELETE_ITEM", payload: item.id})}
     onUpdate={(id, estado) => dispatch({
       type: "UPDATE_STATUS",
       payload: { id, estado }
     })} />
      ))}
    </div>

    </RoleContext.Provider>  
  );
}

export default App;