import { useContext } from 'react'
import { RoleContext } from '../context/RoleContext';
import './Header.css';
import Logo from './Logo'

function Header({ totalObjetos }) {
  const { rol } = useContext(RoleContext)

  return (
    <div className="header-container">
      <h1>Lost & Found</h1>
      <span className="header-badge">
        {totalObjetos} {totalObjetos === 1 ? 'Objeto' : 'Objetos'}
      </span>
    </div>
  )
}

export default Header;