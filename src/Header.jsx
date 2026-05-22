import { useContext } from 'react'
import { RoleContext } from './RoleContext';
import './Header.css';
import Logo from './Logo'
import { supabase } from './supabase'
function Header({ totalObjetos }) { 
  const { rol, logOut } = useContext(RoleContext)

  return (
    <>
    
    <div className="header-class">
    <Logo />
      <h1>The Palace Hotel</h1>
      <div className="header-info">
        
       
        <span className="count-badge">
          {totalObjetos} {totalObjetos === 1 ? 'Objeto' : 'Objetos'} Registrados
        </span>
      </div>
      <span className={`rol-badge rol-${rol}`}>{rol}</span>
    </div>
    <button className="logout-btn" onClick={logOut}>
      Logout
    </button>
    </>)
}

export default Header;