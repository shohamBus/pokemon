import './App.scss';
import  { Suspense, useState } from 'react';
import { Loader } from './components/loader/Loader';
import { PokemonModalProvider } from './context/PokemonModalProvider';
import PokemonsContainer from './components/pokemonsContainer/PokemonsContainer';
import TypesBar from './components/typesBar/TypesBar';
import Modal from './components/modal/Modal';


function App() {
  const [type, setType] = useState('ice');

  return (
    <Suspense fallback={ <Loader /> }>
      <PokemonModalProvider>
          <div className='wrapper'>
            <h1 className='logo-pokemon'>Pokédex</h1>
            <TypesBar toggleType={ setType } />
            <PokemonsContainer type={ type } />
          </div>
          <Modal />
      </PokemonModalProvider>
    </Suspense>
  )
}

export default App
