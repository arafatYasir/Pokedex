import Header from './components/Header'
import SideNav from './components/SideNav'
import PokeCard from './components/PokeCard'
import { useState } from 'react'

function App() {

  const [selectedPokemon, setSelectedpokemon] = useState(0);

  return (
    <>
      <Header />
      <SideNav selectedpokemon={selectedPokemon} setSelectedpokemon={setSelectedpokemon} />
      <PokeCard selectedpokemon={selectedPokemon} />
    </>
  )
}

export default App
