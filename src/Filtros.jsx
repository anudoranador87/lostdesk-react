import "./Filtros.css";

function Filtros({
  filtroEstado,
  setFiltroEstado,
  filtroNombre,
  setFiltroNombre,
  filtroHabitacion,
  setFiltroHabitacion,
}) {
  return (
    <section className="filtros-container">

      {/* FILTRO POR NOMBRE */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
      />

      {/* FILTRO POR HABITACIÓN */}
      <input
        type="text"
        placeholder="Buscar por habitación..."
        value={filtroHabitacion}
        onChange={(e) => setFiltroHabitacion(e.target.value)}
      />

      {/* FILTRO POR ESTADO */}
      <select
        value={filtroEstado}
        onChange={(e) => setFiltroEstado(e.target.value)}
      >
        <option value="">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="reclamado">Reclamado</option>
        <option value="entregado">Entregado</option>
      </select>

    </section>
  );
}

export default Filtros;