import React, { useState, useCallback, useContext } from 'react';

import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Header from './Header';
import StatBar from './StatBar';
import ItemCard from './ItemCard';
import ItemForm from './ItemForm';
import Sidebar from './Sidebar';
import Filtros from './Filtros'; 
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

import { useLostItems } from './useLostItems';
import { RoleContext } from './RoleContext';

import { Spinner } from './Spinner';

import './App.css';

function App() {

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const { rol } = useContext(RoleContext);
  const[filtroEstado, setFiltroEstado] = useState(null)
const[filtroNombre, setFiltroNombre] = useState("")
const[filtroHabitacion, setFiltroHabitacion] = useState("")

  const {
    state,
    dispatch,
    handleAddItem,
    handleDeleteItem,
    handleNuevoEstado,
    spinner
  } = useLostItems();

  const handleDelete = useCallback((id) => {
    dispatch({ type: "DELETE_ITEM", payload: id });
  }, [dispatch]);

  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* APP PROTEGIDA */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <>
              {spinner && <Spinner />}

              <div className="layout">

                {/* SIDEBAR */}
                <Sidebar />

                {/* CONTENIDO PRINCIPAL */}
                <div className="main">

                  <Header totalObjetos={state.length} />

                  <StatBar items={state} />

                  <div className="action-bar">
                    {(rol === "management" || rol === "recepcion") && (
                      <button
                        className="btn-register-main"
                        onClick={() => setMostrarFormulario(true)}
                      >
                        <span className="icon">+</span> Registrar Nuevo Objeto
                      </button>
                    )}
                  </div>

                  {mostrarFormulario && (
                    <ItemForm
                      onAddItem={handleAddItem}
                      onClose={() => setMostrarFormulario(false)}
                    />
                  )}
                  <Filtros
                    filtroEstado={filtroEstado}
                    setFiltroEstado={setFiltroEstado}
                   filtroNombre={filtroNombre}
                   setFiltroNombre={setFiltroNombre}
                    filtroHabitacion={filtroHabitacion}
                  setFiltroHabitacion={setFiltroHabitacion}
/>
                  <div className="cards-container">
                    {state.map(item => (
                      <ItemCard
                        key={item.id}
                        id={item.id}
                        nombre={item.nombre}
                        habitacion={item.habitacion}
                        estado={item.estado}
                        fecha={item.fecha}
                        registradoPor={item.registrado_por}
                        onDelete={() => handleDeleteItem(item.id)}
                        onUpdate={(id, nuevoEstado) =>
                          handleNuevoEstado(id, nuevoEstado)
                        }
                      />
                    ))}
                  </div>

                </div>
              </div>
            </>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;