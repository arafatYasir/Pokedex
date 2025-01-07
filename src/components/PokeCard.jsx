import { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import TypeCard from "./TypeCard"
import Modal from "./Modal";

const PokeCard = ({ selectedpokemon }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [skill, setSkill] = useState(null);
    const [loadingSkill, setLoadingSkill] = useState(false);
    const { name, height, abilities, stats, types, moves, sprites } = data || {};


    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) { return false; }
        if (['versions', 'other'].includes(val)) { return false; }
        return true;
    })

    async function fetchMoveData(move, moveUrl) {
        if(loadingSkill || !localStorage || !moveUrl) {
            return;
        }
        let c = {};
        if(localStorage.getItem("pokemon-moves")) {
            c = JSON.parse(localStorage.getItem("pokemon-moves"));
        }

        if(move in c) {
            setSkill(c[move]);
            console.log("Move found in the cache.");
            
            return;
        }

        try {
            setLoadingSkill(true);
            const res = await fetch(moveUrl);
            const moveData = await res.json();
            console.log("Fetched move data from api.", moveData);

            const description = moveData?.flavor_text_entries.filter(val => {
                return val?.version_group?.name == "firered-leafgreen"
            })[0]?.flavor_text;

            const skillData = {
                name: move,
                description
            };
            setSkill(skillData);

            c[move] = skillData;
            localStorage.setItem("pokemon-moves", JSON.stringify(c));
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setLoadingSkill(false);
        }
    }

    useEffect(() => {
        if (loading || !localStorage) {
            return;
        }

        let cache = {};
        if (localStorage.getItem("pokedex")) {
            cache = JSON.parse(localStorage.getItem("pokedex"));
        }

        if (selectedpokemon in cache) {
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
                const pokemonData = await res.json();

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

    if (loading || !data) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="poke-card">
            {
                skill && (
                    <Modal handleCloseModal={() => { setSkill(null) }}>
                        <div>
                            <h6>Name</h6>
                            <h2></h2>
                        </div>
                        <div>
                            <h6>Description</h6>
                            <p>DESCRIPTION</p>
                        </div>
                    </Modal>
                )
            }
            <div>
                <h4>#{getFullPokedexNumber(selectedpokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {
                    types.map((typeObj, typeIndx) => {
                        return (
                            <TypeCard key={typeIndx} type={typeObj?.type?.name} />
                        )
                    })
                }
            </div>
            <img className="default-img" src={"/pokemon/" + getFullPokedexNumber(selectedpokemon) + ".png"} alt={name} />

            <div className="img-container">
                {
                    imgList.map((spriteUrl, spriteIndx) => {
                        const imgUrl = sprites[spriteUrl];
                        return (
                            <img key={spriteIndx} src={imgUrl} alt={`${name}-img-${spriteUrl}`} />
                        )
                    })
                }
            </div>

            <h3>Stats</h3>
            <div className="stats-card">
                {
                    stats.map((statObj, statIndx) => {
                        const { base_stat, stat } = statObj;

                        return (
                            <div className="stat-item" key={statIndx}>
                                <p>{stat?.name.replaceAll('-', ' ')}</p>
                                <h4>{base_stat}</h4>
                            </div>
                        )
                    })
                }
            </div>
            <h3>Moves</h3>
            <div className="pokemon-move-grid">
                {
                    moves.map((moveObj, moveIndx) => {
                        return (
                            <button className="button-card pokemon-move" key={moveIndx} onClick={() => {
                                fetchMoveData(moveObj?.move?.name, moveObj?.move?.url)
                             }}>
                                <p>{moveObj?.move?.name.replaceAll('-', ' ')}</p>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PokeCard;