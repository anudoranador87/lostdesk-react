import { useContext } from 'react'
import { RoleContext } from './RoleContext';
import './Header.css';
import Logo from './Logo'
function Header({ totalObjetos }) { 
  const { activo } = useContext(RoleContext)

  return (
    <>
    <button>Logout</button>
    <div className="header-class">
    <Logo />
      <h1>The Palace Hotel</h1>
      <div className="header-info">
        
       
        <span className="count-badge">
          {totalObjetos} {totalObjetos === 1 ? 'Objeto' : 'Objetos'} Registrados
        </span>
      </div>
      <span className="rol-badge">{activo}</span>
    </div>
    </>)
}

export default Header;