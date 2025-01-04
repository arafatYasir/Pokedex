import Header from './components/Header'
import SideNav from './components/SideNav'
import PokeCard from './components/PokeCard'
import { useState } from 'react'

function App() {

  const [selectedpokemon, setSelectedpokemon] = useState(0);

  return (
    <>
      <Header />
      <SideNav selectedpokemon={selectedpokemon} setSelectedpokemon={setSelectedpokemon} />
      <PokeCard selectedpokemon={selectedpokemon} />
    </>
  )
}

export default App
