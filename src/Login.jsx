import { useState, useContext } from "react"
import { RoleContext } from "./RoleContext"

export default function Login() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const { login } = useContext(RoleContext)

  return (
    <form>
          <input type="email" className="input-form" placeholder="email@email.com" onChange={(e)=> setEmail(e.target.value)} />
          <input type="password" required className="input-form" placeholder="1234..." onChange={(e)=>setPassword(e.target.value)} />
          <button type="submit" onClick={(e) => { e.preventDefault(); login(email, password) }}>Confirmar</button>
  
    
    </form>
  )
}