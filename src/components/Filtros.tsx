import "./Filtros.css";

function Filtros({
  filtroEstado,
  setFiltroEstado,
  filtroNombre,
  setFiltroNombre,
  filtroHabitacion,
  setFiltroHabitacion,
  filtroFechaInicio,
  setFiltroFechaInicio,
  filtroFechaFin,
  setFiltroFechaFin,
}) {
  const tienesFiltrosActivos = filtroEstado || filtroNombre || filtroHabitacion || filtroFechaInicio || filtroFechaFin;

  const limpiarFiltros = () => {
    setFiltroEstado("");
    setFiltroNombre("");
    setFiltroHabitacion("");
    setFiltroFechaInicio("");
    setFiltroFechaFin("");
  };

  return (
    <section className={`filtros-container ${tienesFiltrosActivos ? 'filtros-activos' : ''}`}>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
        className="filtro-input"
        aria-label="Filtrar por nombre del objeto"
      />

      <input
        type="text"
        placeholder="Buscar por habitación..."
        value={filtroHabitacion}
        onChange={(e) => setFiltroHabitacion(e.target.value)}
        className="filtro-input"
        aria-label="Filtrar por habitación"
      />

      <select
        value={filtroEstado}
        onChange={(e) => setFiltroEstado(e.target.value)}
        className="filtro-select"
        aria-label="Filtrar por estado del objeto"
      >
        <option value="">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="reclamado">Reclamado</option>
        <option value="entregado">Entregado</option>
      </select>

      <div className="filtro-fechas">
        <input 
          type="date" 
          value={filtroFechaInicio}
          onChange={(e) => setFiltroFechaInicio(e.target.value)}
          className="filtro-input"
          aria-label="Fecha inicio"
          title="Desde"
        />
        <input 
          type="date" 
          value={filtroFechaFin}
          onChange={(e) => setFiltroFechaFin(e.target.value)}
          className="filtro-input"
          aria-label="Fecha fin"
          title="Hasta"
        />
      </div>

      {tienesFiltrosActivos && (
        <button className="btn-limpiar-filtros" onClick={limpiarFiltros} aria-label="Limpiar todos los filtros">
          ✕ Limpiar
        </button>
      )}

    </section>
  );
}

export default Filtros;