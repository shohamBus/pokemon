import React, { useContext } from 'react';
import './introModal.scss'
import { PokemonModalContext, PokemonModalContextType } from 'context/PokemonModalProvider';
import { getTypeIconSrc } from 'utils/pokemon-helper';

const IntroModal = () => {
    const { currentPokemon, closeModal } = useContext(PokemonModalContext) as PokemonModalContextType;

    return (
        <div className='pokemon-intro'>
            <a
                className='arrow-back'
                onClick={closeModal}
            ></a>

            <div className='current-pokemon'>
                <img src={currentPokemon?.imgSrc} alt='Pokemon-Image' />

                <div>
                    <span className='id-number'>#{currentPokemon?.paddedId}</span>
                    <span className='pokemon-name'>{currentPokemon?.name}</span>

                    <div className='types'>
                        {
                            currentPokemon?.types.map(({ name }: { name: string }) => {
                                const typeImg = getTypeIconSrc(name);
                                return (
                                    <div key={name} className={name}>
                                        <img src={typeImg} alt={name} />
                                        <span className='type-name'>{name}</span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroModal;
