import { useState, useContext } from "react"
import { RoleContext } from "./RoleContext"
import Logo from './Logo'

export default function Login() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const { login } = useContext(RoleContext)
  const [errorMsg, setErrorMsg] = useState(null)
  
  async function handleLogin() {
    const resultado = await login(email, password);
    
    if (resultado) {
      setErrorMsg(resultado.message || "Usuario o contraseña incorrectos");
    }
  }

  return (
    /* .login-screen + body (Fondo degradado y centrado absoluto) */
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-br from-[#0a0f1e] to-[#1a2744] px-4">
      
      {/* Contenedor del formulario (Mobile-first, máx 448px en pantallas grandes) */}
      <div className="w-full max-w-md flex flex-col items-center">
        
        <Logo />
        
        {/* .login-screen h1 */}
        <h1 className="text-white text-[2.5rem] tracking-[4px] mb-8 uppercase font-bold text-center">
          LostDesk
        </h1>

        {/* Formulario con separación vertical automática de 16px (space-y-4) */}
        <form className="w-full space-y-4">
          
          {/* Input Email (.input-form + placeholder) */}
          <input 
            type="email" 
            className="w-full py-3 px-4 border border-white/20 rounded-lg bg-white/5 text-base text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors" 
            placeholder="email@email.com" 
            onChange={(e) => setEmail(e.target.value)} 
          />

          {/* Input Password (.input-form + placeholder) */}
          <input 
            type="password" 
            required 
            className="w-full py-3 px-4 border border-white/20 rounded-lg bg-white/5 text-base text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors" 
            placeholder="1234..." 
            onChange={(e) => setPassword(e.target.value)} 
          />

          {/* Botón Confirmar (.login-screen button + :hover) */}
          <button 
            type="submit" 
            className="w-full py-3 bg-transparent border border-white/40 rounded-lg text-white text-base tracking-[2px] uppercase cursor-pointer transition-all duration-300 ease-in-out hover:bg-white/10 hover:border-white focus:outline-none"
            onClick={(e) => { 
              e.preventDefault(); 
              handleLogin(); 
            }}
          >
            Confirmar
          </button>

          {/* Mensaje de Error (Estilizado para diseño oscuro) */}
          {errorMsg && (
            <p className="text-red-400 text-sm text-center font-medium mt-2">
              {errorMsg}
            </p>
          )}

          {/* .demo-credentials (Texto de ayuda con 60% de opacidad) */}
          <div className="text-white/60 text-[0.85rem] mt-4 text-center space-y-1">
            <p className="font-semibold text-white/80">Credenciales de prueba:</p>
            <p>recepcion@lostdesk.com / Recepcion123</p>
            <p>housekeeping@lostdesk.com / Housekeeping123</p>
            <p>management@lostdesk.com / Management123</p>
          </div>
          
        </form>
      </div>
    </div>
  )
}