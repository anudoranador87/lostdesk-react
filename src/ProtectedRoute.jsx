import { Navigate } from 'react-router-dom'
import { RoleContext } from './RoleContext';
import {useContext} from "react"


function ProtectedRoute({children}){
    
    const { rol } = useContext(RoleContext)
    return rol ? children : <Navigate to="/login" />

}

export default ProtectedRoute