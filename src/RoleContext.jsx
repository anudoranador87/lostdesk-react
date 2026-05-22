
import {createContext, useState, useEffect} from "react"
import { supabase } from './supabase'
import { useNavigate } from 'react-router-dom'
export const RoleContext = createContext("")
export function RoleProvider({ children }) {




const[rol, setRol] = useState(null)
const [cargando, setCargando] = useState(true)
const navigate = useNavigate() 
const roles = {
  'recepcion@lostdesk.com': 'recepcion',
  'housekeeping@lostdesk.com': 'housekeeping',
  'management@lostdesk.com': 'management'
               }


   async function login(email, password){
    console.log("login llamado", email, password)
                try{
                   const{data, error} = await supabase.auth.signInWithPassword({ email, password })
              
                   if(error) {
                    return error
                  }
                          else{
                          
                            console.log("rol asignado", roles[data.user.email])
                            setRol(roles[data.user.email])
                            navigate('/') 
                              }
                             }
                       catch(err){
                   return err
              }
              }
             
               
 

              
 async function restaurarSesion(){
 
  try{
    const{data, error} =  await supabase.auth.getSession()
    console.log(data.session)
    if(error){
      console.log(error);
  }
    else{
      if (data.session) {
        setRol(roles[data.session.user.email])
        console.log("rol restaurado", roles[data.session.user.email])           }
        }
   
      }
  catch(err){
  return err
}

finally{
  setCargando(false)
}
 }


 useEffect(() => {
  restaurarSesion();
}, []);


async function  logOut(){
  try{
    const{ error } = await supabase.auth.signOut()
    if(error) {
      return error
    }
      else{
        setRol(null)
        navigate('/login')  	
           }

    }
   catch(error){
    return error
   }}
return (
    <RoleContext.Provider value={{rol, login, logOut, cargando}}>
      {children}
      
    </RoleContext.Provider>
  )

}

