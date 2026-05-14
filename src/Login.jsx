import { useState, useContext } from "react"
import { RoleContext } from "./RoleContext"

export default function Login() {
  const [pin, setPin] = useState(null)
  const [seleccionado, setSeleccionado] = useState(null)
  const { login } = useContext(RoleContext)

  return (
    <div className="login-screen">
      <button onClick={() => setSeleccionado("recepcion")}>Recepción</button>
      <button onClick={() => setSeleccionado("housekeeping")}>Housekeeping</button>
      <button onClick={() => setSeleccionado("management")}>Management</button>
      <input type="password" onChange={(e) => setPin(e.target.value)} />
      <button onClick={() => login(pin, seleccionado)}>Confirmar</button>
    </div>
  )
}