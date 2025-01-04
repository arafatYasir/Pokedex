import { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";

const PokeCard = ({ selectedpokemon }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(loading || !localStorage) {
            return;
        }

        let cache = {};
        if(localStorage.getItem("pokedex")) {
            cache = JSON.parse(localStorage.getItem("pokedex"));
        }

        if(selectedpokemon in cache) {
            setData(cache[selectedpokemon]);
            console.log("Data found!"); 
            return;
        }

        // fetching pokemon data
        async function fetchpokemonData() {
            setLoading(true);
            try {
                const baseUrl = "https://pokeapi.co/api/v2/";
                const suffix = "pokemon/" + getPokedexNumber(selectedpokemon);
                const finalUrl = baseUrl + suffix;
                const res = await fetch(finalUrl);
                const pokemonData = res.json();

                setData(pokemonData);
                console.log(pokemonData);

                cache[selectedpokemon] = pokemonData;
                localStorage.setItem("pokedex", JSON.stringify(cache));
            }
            catch (error) {
                console.log(error.message)
            }
            finally {
                setLoading(false);
            }
        }

        fetchpokemonData();
        
    }, [selectedpokemon]);

    if(loading) {
        return (
            <div>Loading...</div>
        )
    }
    
    return (
        <div className="poke-card">
            <div>
                <h4>#{getFullPokedexNumber(selectedpokemon)}</h4>
                <h2></h2>
            </div>

        </div>
    );
};

export default PokeCard;