import { useState, useContext } from "react"
import { RoleContext } from "../context/RoleContext"
import './Login.css';
import Logo from '../components/Logo'

export default function Login() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const { login, loginInvitado } = useContext(RoleContext)
  const [errorMsg, setErrorMsg] = useState(null)
  
  // voy a definir una funcion handleLogin para manejo de errores durante login
  //si hay resultado, hay error, llamamos a setErrorMsg
  async function handleLogin() {
    const resultado = await login(email, password);
    
    if (resultado) {
      // Si 'resultado' existe, es que 'login' nos tiró el error.
      // Guardamos ese mensaje de error en el estado setErrorMsg
      setErrorMsg(resultado.message || "Usuario o contraseña incorrectos");
    }
  }
  return (
  <div className="login-wrapper">
    <div className="login-screen">
   
      <Logo />
      <form>
            <input type="email" className="input-form" placeholder="email@email.com" onChange={(e)=> setEmail(e.target.value)} />
            <input type="password" required className="input-form" placeholder="1234..." onChange={(e)=>setPassword(e.target.value)} />
            <button 
                type="submit" 
                onClick={(e) => { 
                e.preventDefault(); 
                handleLogin(); 
      
               }}
            >
           Confirmar
            </button>
            
            <button 
                type="button" 
                className="btn-invitado"
                onClick={() => loginInvitado()}
            >
              Entrar como Invitado
            </button>

            {errorMsg && <p className="Errores" style={{ color: '#ef4444', marginTop: '12px', fontSize: '0.9rem' }}>{errorMsg}</p>}
            <div className="demo-credentials">
             <p>Credenciales de prueba:</p>
             <p>recepcion@lostdesk.com / Recepcion123</p>
             <p>housekeeping@lostdesk.com / Housekeeping123</p>
             <p>management@lostdesk.com / Management123</p>
      </div>
      
      </form>
    </div>
  </div>
  )
}