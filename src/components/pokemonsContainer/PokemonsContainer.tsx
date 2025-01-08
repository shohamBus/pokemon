import PokemonCard from '../pokemonCard/PokemonCard';
import usePokemons from '../../hooks/usePokemons';
import { Pokemon } from '../../utils/types';

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
                return <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
}) }
        </div>
    );
};

export default PokemonsContainer;