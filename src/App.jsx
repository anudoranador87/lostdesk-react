import React, { useState, useCallback } from 'react';
import Header from './Header';
import StatBar from './StatBar';
import ItemCard from './ItemCard';
import ItemForm from './ItemForm';
import { useLostItems } from './useLostItems';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from "./Login"
import { Spinner } from "./Spinner"


function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  // Aquí obtenemos el 'state', que es la lista de objetos
  const { state, dispatch, handleAddItem, handleDeleteItem, handleNuevoEstado, spinner  } = useLostItems();
  // voy a declarar aqui un callBack para usar use memo y no reenderizar siempre lo mismo
  const handleDelete = useCallback((id) => {
    dispatch({ type: "DELETE_ITEM", payload: id })
  }, [dispatch])

  return (
    <Routes>
<Route path="/login" element={<Login />} />
<Route path="/" element={   
<>
{spinner && <Spinner />}
      <div className="main-app-container">
        
        {/* PASAMOS LA LONGITUD DEL ARRAY AL HEADER */}
       <Header totalObjetos={state.length} />
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
              onDelete={() => handleDeleteItem(item.id)}
              onUpdate={(id, nuevoEstado) => handleNuevoEstado(id, nuevoEstado)} 
            />
          ))}
        </div>
      </div>
      </>
      } />
     </Routes>
  );

}

export default App;