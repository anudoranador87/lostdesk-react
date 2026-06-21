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
import Historial from "./pages/Historial";
import Inventario from "./pages/Inventario";
import Usuarios from "./pages/Usuarios";
import PublicObjeto from "./pages/PublicObjeto";
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
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");

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

      let coincideFecha = true;
      if (filtroFechaInicio && filtroFechaFin) {
        coincideFecha = item.fecha >= filtroFechaInicio && item.fecha <= filtroFechaFin;
      } else if (filtroFechaInicio) {
        coincideFecha = item.fecha >= filtroFechaInicio;
      } else if (filtroFechaFin) {
        coincideFecha = item.fecha <= filtroFechaFin;
      }

      return (
        coincideNombre &&
        coincideHabitacion &&
        coincideEstado &&
        coincideFecha
      );
    });
  }, [state, filtroNombre, filtroHabitacion, filtroEstado, filtroFechaInicio, filtroFechaFin]);

  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/objeto/:id" element={<PublicObjeto />} />

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
                    filtroFechaInicio={filtroFechaInicio}
                    setFiltroFechaInicio={setFiltroFechaInicio}
                    filtroFechaFin={filtroFechaFin}
                    setFiltroFechaFin={setFiltroFechaFin}
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
              <div className="main">
                <Panel />
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/historial"
        element={
          <ProtectedRoute>
            <div className="layout">
              <Sidebar />
              <div className="main">
                <Historial />
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/inventario"
        element={
          <ProtectedRoute>
            <div className="layout">
              <Sidebar />
              <div className="main">
                <Inventario />
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/usuarios"
        element={
          <ProtectedRoute>
            <div className="layout">
              <Sidebar />
              <div className="main">
                <Usuarios />
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