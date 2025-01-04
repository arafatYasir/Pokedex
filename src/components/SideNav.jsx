import {first151Pokemon, getFullPokedexNumber} from "../utils"

const SideNav = () => {
    return (
        <nav>
            <div className={"header"}>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <input />
            {
                first151Pokemon.map((pokeamon, pokeamonIndx) => {
                    return (
                        <button className={"nav-card"} key={pokeamonIndx}>
                            <p>{getFullPokedexNumber(pokeamonIndx)}</p>
                            <p>{pokeamon}</p>
                        </button>
                    )
                })
            }
        </nav>
    );
};

export default SideNav;