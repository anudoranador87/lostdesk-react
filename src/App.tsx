import React, {
  useState,
  useCallback,
  useContext,
  useMemo
} from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import StatBar from "./components/StatBar";
import ItemCard from "./components/ItemCard";
import ItemForm from "./components/ItemForm";
import Sidebar from "./components/Sidebar";
import Filtros from "./components/Filtros";
import Login from "./pages/Login";
import Panel from "./pages/Panel";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toast } from "./components/Toast";
import { ToastProvider } from "./context/ToastContext";

import { useLostItems } from "./hooks/useLostItems";
import { RoleContext } from "./context/RoleContext";
import { Spinner } from "./components/Spinner";

import "./App.css";

function AppContent() {

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroHabitacion, setFiltroHabitacion] = useState("");

  const { rol } = useContext(RoleContext);

  const {
    state,
    handleAddItem,
    handleDeleteItem,
    handleNuevoEstado,
    spinner
  } = useLostItems();

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
                        aria-label="Abrir formulario para registrar nuevo objeto"
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

      <Route
        path="/panel"
        element={
          <ProtectedRoute>
            <div className="layout">
              <Sidebar />
              <div className="main" style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
                <Panel />
              </div>
            </div>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
      <Toast />
    </ToastProvider>
  );
}

export default App;