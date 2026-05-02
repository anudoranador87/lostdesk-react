import { useContext } from 'react'
import {RoleContext} from './RoleContext';

function Header() {

      const { activo } = useContext(RoleContext)
  return (
  <div>
       
        <h1>Hotel Paraiso</h1>
  <h2>LostDesk</h2>
  <p>Rol activo: {activo}</p>
  </div>)
  }
  
  export default Header