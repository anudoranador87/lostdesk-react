import { useState, useContext } from "react"
import { RoleContext } from "./RoleContext"
import './Login.css';
import Logo from './Logo'

export default function Login() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const { login } = useContext(RoleContext)
  const [errorMsg, setErrorMsg] = useState(null)
  return (
  <div className="login-screen">
   
    <Logo />
    <form>
          <input type="email" className="input-form" placeholder="email@email.com" onChange={(e)=> setEmail(e.target.value)} />
          <input type="password" required className="input-form" placeholder="1234..." onChange={(e)=>setPassword(e.target.value)} />
          <button type="submit" onClick={(e) => { e.preventDefault(); login(email, password) }}>Confirmar</button>
          <div className="demo-credentials">
           <p>Credenciales de prueba:</p>
           <p>recepcion@lostdesk.com / Recepcion123</p>
           <p>housekeeping@lostdesk.com / Housekeeping123</p>
           <p>management@lostdesk.com / Management123</p>
</div>
    
    </form>
    </div>
  )
}