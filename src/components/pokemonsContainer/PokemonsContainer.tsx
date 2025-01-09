import PokemonCard from '../pokemonCard/PokemonCard';
import usePokemons from '../../hooks/usePokemons';
import './style.scss';
interface PokemonsContainerProps {
    type: string
}


const PokemonsContainer = (props:PokemonsContainerProps) => {
    const {type} = props;
    
    const pokemons = usePokemons(type);
    
    return (
        <div className='pokemons-container'>
            { pokemons?.map((pokemon:any) =>
                { 
                return <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
}) }
        </div>
    );
};

export default PokemonsContainer;