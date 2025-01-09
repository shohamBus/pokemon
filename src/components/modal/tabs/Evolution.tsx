import  { useContext } from 'react';
import useEvolution from '../../../hooks/useEvolution';
import { PokemonModalContext, PokemonModalContextType } from '../../../context/PokemonModalProvider';

const Evolution = () => {
    const { currentPokemon } = useContext(PokemonModalContext) as PokemonModalContextType;
    const chain = useEvolution(currentPokemon?.id || 0);
    
    return (
        <>
                {
                    ! chain.length ?
                        <strong className='error-msg'>This Pokémon doesn't Evolve</strong>
                    :
                    chain.map((evolution) => {
                        const { current, next } = evolution;

                        return (
                            <div className='evolution-container' key={ next?.name }>
                                <div>
                                    <div className='poke-img'>
                                        <div className='pokeball-bg'></div>

                                        <img src={ current?.image } alt='pokemon-image' />
                                    </div>

                                    <span>{ current?.name }</span>
                                </div>

                                <span className='arrow'></span>

                                <div>
                                    <div className='poke-img'>
                                        <div className='pokeball-bg'></div>

                                        <img src={ next?.image } alt='pokemon-image' />
                                    </div>

                                    <span>{ next?.name }</span>
                                </div>
                            </div>
                        );
                    })
                }
            </>
    );
};

export default Evolution;
