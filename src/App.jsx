import React, { useState } from 'react';
import Header from './Header';
import StatBar from './StatBar';
import ItemCard from './ItemCard';
import ItemForm from './ItemForm';
import { RoleContext } from './RoleContext';
import { useLostItems } from './useLostItems';
import './App.css';

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [activo, setActivo] = useState("recepcion");
  
  // Aquí obtenemos el 'state', que es la lista de objetos
  const { state, dispatch, handleAddItem } = useLostItems();

  return (
    <RoleContext.Provider value={{ activo, setActivo }}> 
      <div className="main-app-container">
        
        {/* PASAMOS LA LONGITUD DEL ARRAY AL HEADER */}
        <Header totalObjetos={state.length} />

        <div className="role-selector-bar">
          <button className={`btn-role ${activo === "recepcion" ? "active" : ""}`} onClick={() => setActivo("recepcion")}>Recepción</button> 
          <button className={`btn-role ${activo === "houseKeeping" ? "active" : ""}`} onClick={() => setActivo("houseKeeping")}>House Keeping</button> 
          <button className={`btn-role ${activo === "management" ? "active" : ""}`} onClick={() => setActivo("management")}>Management</button> 
        </div>

        <StatBar items={state} />

        <div className="action-bar">
          <button className="btn-register-main" onClick={() => setMostrarFormulario(true)}>
            <span className="icon">+</span> Registrar Nuevo Objeto
          </button>
        </div>

        {mostrarFormulario && (
          <ItemForm onAddItem={handleAddItem} onClose={() => setMostrarFormulario(false)} />
        )}

        <div className="cards-container">
          {state.map(item => ( 
            <ItemCard 
              key={item.id}
              id={item.id}
              nombre={item.nombre}
              habitacion={item.habitacion}
              estado={item.estado}
              fecha={item.fecha}
              registradoPor={item.registradoPor}
              onDelete={() => dispatch({ type: "DELETE_ITEM", payload: item.id })}
              onUpdate={(id, nuevoEstado) => dispatch({
                type: "UPDATE_STATUS",
                payload: { id, estado: nuevoEstado }
              })} 
            />
          ))}
        </div>
      </div>
    </RoleContext.Provider>  
  );
}

export default App;