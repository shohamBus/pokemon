import React, { useContext } from 'react';
import './App.scss';
import { PokemonModalContext, PokemonModalContextType } from 'context/PokemonModalProvider';
import PokemonsContainer from 'components/pokemonsContainer/PokemonsContainer';
import TypesBar from 'components/typesBar/TypesBar';
import Modal from 'components/modal/mainModal/Modal';


function App() {
  const { type } = useContext(PokemonModalContext) as PokemonModalContextType;

  return (
    <>
      <div className='wrapper'>
        <h1 className='logo-pokemon'>The world of Pokémons</h1>
        <TypesBar />
        <button className='button-play' onClick={() => window.location.href = '/game'}><span>Let's play</span></button>
        <PokemonsContainer type={type} />
      </div>
      <Modal />
    </>
  )
}

export default App
