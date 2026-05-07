import { useContext } from 'react'
import {RoleContext} from './RoleContext';
import './Header.css';
 

function Header() {

      const { activo } = useContext(RoleContext)
  return (
<div className="header-class">
       
        <h1>Hotel Paraiso</h1>
  <h2>LostDesk</h2>
  <span className="rol-badge">{activo}</span>
  </div>
  )
  }
  
  export default Header