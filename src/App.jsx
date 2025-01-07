import Header from './components/Header'
import SideNav from './components/SideNav'
import PokeCard from './components/PokeCard'
import { useState } from 'react'

function App() {

  const [selectedPokemon, setSelectedpokemon] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(false);

  function handleToggleMenu()
  {
    setShowSideMenu(!showSideMenu);
  }


  return (
    <>
      <Header handleToggleMenu={handleToggleMenu} />
      <SideNav selectedpokemon={selectedPokemon} setSelectedpokemon={setSelectedpokemon} showSideMenu={showSideMenu} handleToggleMenu={handleToggleMenu} />
      <PokeCard selectedpokemon={selectedPokemon} />
    </>
  )
}

export default App
