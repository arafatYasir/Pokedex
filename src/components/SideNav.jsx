import { useState } from "react";
import {first151Pokemon, getFullPokedexNumber, pokemonTypeColors} from "../utils"

const SideNav = ({selectedpokemon, setSelectedpokemon}) => {
    const [searchValue, setSearchValue] = useState("");

    const filteredPokemon = first151Pokemon.filter((el, elIndx) => {
        if(getFullPokedexNumber(elIndx).includes(searchValue)) {
            return true;
        }
        if(el.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
        return false;
    }) 
    return (
        <nav>
            <div className={"header"}>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <input placeholder="Search E.g. 001 Bulbasaur" value={searchValue} onChange={(e) => {
                setSearchValue(e.target.value);
            }} />
            {
                filteredPokemon.map((pokemon, pokemonIndx) => {
                    const truePokedexNumber = first151Pokemon.indexOf(pokemon);
                    return (
                        <button onClick={() => (setSelectedpokemon(truePokedexNumber))} className={"nav-card " + (pokemonIndx === selectedpokemon   ? "nav-card-selected" : "")} key={pokemonIndx}>
                            <p>{getFullPokedexNumber(truePokedexNumber)}</p>
                            <p>{pokemon}</p>
                        </button>
                    )
                })
            }
        </nav>
    );
};

export default SideNav;