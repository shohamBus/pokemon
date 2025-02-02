import React, { useContext, useState } from 'react';
import { PokemonModalContext, PokemonModalContextType } from 'context/PokemonModalProvider';
import PokemonsContainer from 'components/pokemonsContainer/PokemonsContainer';
import TypesBar from 'components/typesBar/TypesBar';
import Modal from 'components/modal/mainModal/Modal';
import './App.scss';
import { Games } from 'components/games/Games';

function App() {
  const { type } = useContext(PokemonModalContext) as PokemonModalContextType;
  const [currentPage, setCurrentPage] = useState('home');

  const navigateToGame = () => {
    setCurrentPage('game');
  };


  return (
    <>
      {currentPage === 'home' ? (
        <div className='wrapper'>
          <h1 className='logo-pokemon'>The world of Pokémons</h1>
          <TypesBar />
          <button className='button-play' onClick={navigateToGame}><span>Let's play</span></button>
          <PokemonsContainer type={type} />
        </div>
      ) : (
        <Games />
      )}
      <Modal />
    </>
  );
}

export default App;