
import {createContext, useState} from "react"
import { supabase } from './supabase'
import { useNavigate } from 'react-router-dom'
export const RoleContext = createContext("")
export function RoleProvider({ children }) {




const[rol, setRol] = useState(null)
const navigate = useNavigate() 



   async function login(email, password){
    console.log("login llamado", email, password)
                try{
                   const{data, error} = await supabase.auth.signInWithPassword({ email, password })
              
                    if(error){
                  console.log(error);
              
              
                       }
                          else{
                            const roles = {
                              'recepcion@lostdesk.com': 'recepcion',
                              'housekeeping@lostdesk.com': 'housekeeping',
                              'management@lostdesk.com': 'management'
                            }
                            console.log("rol asignado", roles[data.user.email])
                            setRol(roles[data.user.email])
                            navigate('/') 
                  }
                   }
                       catch(err){
                   console.log(err)
              }
              }
              function logout(){
                setRol(null)
              }   
 
return (
    <RoleContext.Provider value={{rol, login, logout}}>
      {children}
      
    </RoleContext.Provider>
  )
}



