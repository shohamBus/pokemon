import { Pokemon } from 'interface/pokemon';
import React, { useState } from 'react';

export interface PokemonModalContextType {
    closeModal: () => void;
    currentPokemon: Pokemon | null ;
    openModal: (pokemon: Pokemon) => void;
    isModalOpen: boolean;
}

export const PokemonModalContext = React.createContext<PokemonModalContextType | null>(null);



// interface PokemonModalProviderProps {
//     children: React.ReactNode;
// }

export const PokemonModalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [modal, setModal] = useState<{ isOpen: boolean; pokemon: Pokemon | null }>({ isOpen: false, pokemon: null });
    const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));
    const currentPokemon = modal.pokemon;
    const openModal = (pokemon: Pokemon) => setModal({ isOpen: true, pokemon: pokemon || null });
    const isModalOpen = modal.isOpen;


    return (
        <PokemonModalContext.Provider value={{ closeModal, currentPokemon, openModal, isModalOpen }}>
            { children }
        </PokemonModalContext.Provider>
    );
};

