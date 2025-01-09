import { useContext } from 'react';
import { PokemonModalContext, PokemonModalContextType } from '../../context/PokemonModalProvider';
import { getTypeIconSrc } from '../../utils/pokemon-helper';

interface Pokemon {
    paddedId: string;
    name: string;
    types: { name: string }[];
    imgSrc: string;
}

interface PokemonCardProps {
    pokemon: Pokemon;
}


const PokemonCard = (props:PokemonCardProps) => {
    const { pokemon } = props;
    const { openModal } = useContext(PokemonModalContext) as PokemonModalContextType;
    return (
        <div
            onClick={ () => openModal(pokemon) }
            className={ `pokemon-card ${ pokemon.types[0].name }` }
        >
            <div>
                <span className='id-number'>{ '#' + pokemon?.paddedId }</span>
                <span className='pokemon-name'>{ pokemon?.name }</span>

                <div className='types'>
                    {
                       pokemon.types.map(({ name }) => {
                            const typeImg = getTypeIconSrc(name);
                            
                            return (
                                <div key={ name } className={ name }>
                                    <img src={ typeImg } alt={ name } />
                                    <span className='type-name'>{ name }</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            <div className='pokeball-bg'></div>
            <img className='pokemon-image' src={ pokemon.imgSrc } alt='pokemon-image' />
        </div>
    );
};

export default PokemonCard;