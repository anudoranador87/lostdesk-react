import './StatBar.css';
import {useMemo} from "react"

function StatBar({ items }) {
  // calculamos aqui 
// voy a meter las variables que cambiar como objeto para useMemo
  const stats = useMemo(() => {
    return {
      total: items.length,
      pendientes: items.filter(item => item.estado === "pendiente").length,
      reclamados: items.filter(item => item.estado === "reclamado").length,
      entregados: items.filter(item => item.estado === "entregado").length
    }
  }, [items])
  

  return (
    <div className="stat-bar-container">
      <div className="stat-card total">
        <span className="stat-label">Total objetos</span>
        <span className="stat-value">{stats.total}</span>
      </div>
      
      <div className="stat-card pending">
        <span className="stat-label">Pendientes</span>
        <span className="stat-value">{stats.pendientes}</span>
      </div>
      
      <div className="stat-card claimed">
        <span className="stat-label">Reclamados</span>
        <span className="stat-value">{stats.reclamados}</span>
      </div>

      {/* He añadido entregados por si quieres tener el cuadro completo */}
      <div className="stat-card delivered">
        <span className="stat-label">Entregados</span>
        <span className="stat-value">{stats.entregados}</span>
      </div>
    </div>
  );
}

export default StatBar;