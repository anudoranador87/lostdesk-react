import Header from './Header';
import StatBar from './StatBar';
import ItemCard from './ItemCard';
import ItemForm from './ItemForm';
import { useState } from 'react'

function App() {
  const [items, setItems] = useState([
    {id: 1, nombre: "Paraguas azul", habitacion: "105", estado: "pendiente", fecha: "21/04/2026"},
    {id: 2, nombre: "Gafas de sol", habitacion: "202", estado: "Reclamado", fecha: "20/01/2026"},
    {id: 3, nombre: "Manta termica", habitacion: "101", estado: "entregado", fecha: "29/04/2026"}
  ])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
// esto es para que el formulario aparezca cerrado por defecto

  function handleAddItem(nuevoItem) {
    setItems([...items, nuevoItem])
  }

  return (
    <div>
      <Header />
      <StatBar />
      <button onClick={() => setMostrarFormulario(true)}>Registrar objeto</button>
      {mostrarFormulario && <ItemForm onAddItem={handleAddItem} onClose={() => setMostrarFormulario(false)} />} 
      {items.map(item => (
        <ItemCard key={item.id}
                  nombre={item.nombre}
                  habitacion={item.habitacion}
                  estado={item.estado}
                  fecha={item.fecha} />
      ))}
    </div>
  );
}

export default App;