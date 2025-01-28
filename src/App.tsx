import React, { useContext } from 'react';
import './App.scss';
import { PokemonModalContext, PokemonModalContextType } from 'context/PokemonModalProvider';
import PokemonsContainer from 'components/pokemonsContainer/PokemonsContainer';
import TypesBar from 'components/typesBar/TypesBar';
import Modal from 'components/modal/mainModal/Modal';
import { Link } from 'react-router-dom';


function App() {
   const { type } = useContext(PokemonModalContext) as PokemonModalContextType;

  return (
    <>
        <div className='wrapper'>
        <h1 className='logo-pokemon'>Let's get to know the   Pokémon</h1>
          <TypesBar />
          <Link className='button-play' to={`/game`}><span >Let's play</span></Link>
         <PokemonsContainer type={type} />
        </div>
        <Modal />
        </>
  )
}

export default App
