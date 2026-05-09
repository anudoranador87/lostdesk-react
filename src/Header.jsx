import { useContext } from 'react'
import { RoleContext } from './RoleContext';
import './Header.css';

function Header({ totalObjetos }) { 
  const { activo } = useContext(RoleContext)

  return (
    <div className="header-class">
      <h1>Hotel Paraíso</h1>
      <div className="header-info">
        <h2>LostDesk</h2>
       
        <span className="count-badge">
          {totalObjetos} {totalObjetos === 1 ? 'Objeto' : 'Objetos'} Registrados
        </span>
      </div>
      <span className="rol-badge">{activo}</span>
    </div>
  )
}

export default Header;