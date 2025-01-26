import PokemonCard from '../pokemonCard/PokemonCard';
import usePokemons from '../../hooks/usePokemons';
import './style.scss';
import { Pokemon } from '../../interface/pokemon';
interface PokemonsContainerProps {
    type: string
}


const PokemonsContainer = (props:PokemonsContainerProps) => {
    const {type} = props;
    
    const pokemons = usePokemons(type);
    
    return (
        <div className='pokemons-container'>
            { pokemons?.map((pokemon:Pokemon) =>
            { 
            console.log(pokemon)
            
                return <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
}) }
        </div>
    );
};

export default PokemonsContainer;