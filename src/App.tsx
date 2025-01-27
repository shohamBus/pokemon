import React, { useState } from 'react';
import './App.scss';
import { PokemonModalProvider } from 'context/PokemonModalProvider';
import PokemonsContainer from 'components/pokemonsContainer/PokemonsContainer';
import TypesBar from 'components/typesBar/TypesBar';
import Modal from 'components/modal/mainModal/Modal';
import { Link } from 'react-router-dom';


function App() {
  const [type, setType] = useState('ice');

  return (
       <PokemonModalProvider>
        <div className='wrapper'>
        <h1 className='logo-pokemon'>Let's get to know the   Pokémon</h1>
          <TypesBar toggleType={setType} />
        <Link className='button-play' to="/game"><span style={{}} >Let's play</span></Link>
         <PokemonsContainer type={type} />
        </div>
        <Modal />
      </PokemonModalProvider>
  )
}

export default App
