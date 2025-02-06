import React, { useState } from 'react';
import PokemonCard from '../pokemonCard/PokemonCard';
import usePokemons from '../../hooks/usePokemons';
import './style.scss';
import { Pokemon } from '../../interface/pokemon';

interface PokemonsContainerProps {
    type: string
}

const PokemonsContainer = (props: PokemonsContainerProps) => {
    const { type } = props;
    const pokemons = usePokemons(type);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedPokemons = pokemons?.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='pokemons-container'>
            <div className='pokemons-cards'>
                {selectedPokemons?.map((pokemon: Pokemon) => {
                    return <PokemonCard key={pokemon.id} pokemon={pokemon} />
                })}
            </div>
            <div className='pagination-controls'>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={(selectedPokemons?.length ?? 0) < itemsPerPage}>Next</button>
            </div>
        </div>
    );
};

export default PokemonsContainer;