import './StatBar.css';

function StatBar({ items }) {
  // calculamos aqui 
  const total = items.length;
  const pendientes = items.filter(item => item.estado === "pendiente").length;
  const reclamados = items.filter(item => item.estado === "reclamado").length;
  const entregados = items.filter(item => item.estado === "entregado").length;

  return (
    <div className="stat-bar-container">
      <div className="stat-card total">
        <span className="stat-label">Total objetos</span>
        <span className="stat-value">{total}</span>
      </div>
      
      <div className="stat-card pending">
        <span className="stat-label">Pendientes</span>
        <span className="stat-value">{pendientes}</span>
      </div>
      
      <div className="stat-card claimed">
        <span className="stat-label">Reclamados</span>
        <span className="stat-value">{reclamados}</span>
      </div>

      {/* He añadido entregados por si quieres tener el cuadro completo */}
      <div className="stat-card delivered">
        <span className="stat-label">Entregados</span>
        <span className="stat-value">{entregados}</span>
      </div>
    </div>
  );
}

export default StatBar;