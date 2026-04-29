import Header from './Header';
import StatBar from './StatBar';
import ItemCard from './ItemCard';
function App() {
  return (
    <div>
      <Header />
      <StatBar />
      <ItemCard nombre="Cartera negra" habitacion="105" estado="Pendiente" date="29/04/2026" />
<ItemCard nombre="Gafas de sol" habitacion="302" estado="Reclamado" date="28/04/2026" />
<ItemCard nombre="Paraguas azul" habitacion="201" estado="Pendiente" date="27/04/2026" />
    </div>
  );
}

export default App;

