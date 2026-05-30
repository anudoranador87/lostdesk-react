import React, {
  useState,
  useCallback,
  useContext,
  useMemo
} from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import StatBar from "./StatBar";
import ItemCard from "./ItemCard";
import ItemForm from "./ItemForm";
import Sidebar from "./Sidebar";
import Filtros from "./Filtros";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

import { useLostItems } from "./useLostItems";
import { RoleContext } from "./RoleContext";
import { Spinner } from "./Spinner";



function App() {

  // ---------------- ESTADOS ----------------

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroHabitacion, setFiltroHabitacion] = useState("");

  // ---------------- CONTEXT ----------------

  const { rol } = useContext(RoleContext);

  // ---------------- HOOK ----------------

  const {
    state,
    handleAddItem,
    handleDeleteItem,
    handleNuevoEstado,
    spinner
  } = useLostItems();

  // ---------------- FILTROS ----------------

  const itemsFiltrados = useMemo(() => {
    return state.filter((item) => {

      const coincideNombre =
        filtroNombre === "" ||
        item.nombre.toLowerCase().includes(filtroNombre.toLowerCase());

      const coincideHabitacion =
        filtroHabitacion === "" ||
        item.habitacion.toLowerCase().includes(filtroHabitacion.toLowerCase());

      const coincideEstado =
        filtroEstado === "" ||
        item.estado === filtroEstado;

      return (
        coincideNombre &&
        coincideHabitacion &&
        coincideEstado
      );
    });
  }, [state, filtroNombre, filtroHabitacion, filtroEstado]);

  // ---------------- RENDER ----------------

  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>

            <>
              {spinner && <Spinner />}

              <div className="layout">

                <Sidebar />

                <div className="main">

                  <Header totalObjetos={state.length} />

                  <StatBar items={state} />

                  {(rol === "management" || rol === "recepcion") && (
                    <div className="action-bar">
                      <button
                        className="btn-register-main"
                        onClick={() => setMostrarFormulario(true)}
                      >
                        <span className="icon">+</span>
                        {" "}
                        Registrar Nuevo Objeto
                      </button>
                    </div>
                  )}

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

                    {itemsFiltrados.map((item) => (
                      <ItemCard
                        key={item.id}
                        {...item}
                        onDelete={() => handleDeleteItem(item.id, item)}
                        onUpdate={handleNuevoEstado}
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