import { getTypeIconSrc } from '../../utils/pokemon-helper';
import { PokemonModalContext, PokemonModalContextType } from 'context/PokemonModalProvider';
import useTypes from '../../hooks/useTypes';
import './style.scss';
import React, { useContext } from 'react';



const TypesBar = () => {
    const types = useTypes();
    const { toggleType } = useContext(PokemonModalContext) as PokemonModalContextType;
    return (

        <nav className='types-bar'>
            {
                types?.map((type: { name: string }) => {
                    const typeImg = getTypeIconSrc(type.name);

                    return (
                        type.name !== 'stellar' &&
                        <a
                            key={type.name}
                            className={type.name}
                            onClick={() => toggleType(type.name)}
                        >
                            <img src={typeImg} alt={type.name} />
                        </a>
                    );
                })
            }
        </nav>
    );
};

export default TypesBar;