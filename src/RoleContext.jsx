
import {createContext, useState} from "react"
export const RoleContext = createContext("")
export function RoleProvider({ children }) {


//tenemos que crear dentro una funcion login y meter toda la logica dentro
// tenemos que  definir los estados de rol y pin. primero rol

const[rol, setRol] = useState(null) // por defecto 


const pins ={ recepcion: 1234,                           
              housekeeping: 2233,
              management: 1844 }

function login(pin, rol){  
if( pin === pins[rol])   { return setRol(rol)} else{ return alert( "Pin incorrecto")}


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

