import { Navigate } from 'react-router-dom'
import { RoleContext } from '../context/RoleContext';
import {useContext} from "react"


function ProtectedRoute({children}){
    
    const { rol, cargando } = useContext(RoleContext)
    if(cargando) return null
    return rol ? children : <Navigate to="/login" />

}

export default ProtectedRoute