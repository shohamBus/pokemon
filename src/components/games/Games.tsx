import React, { useContext, useState } from 'react'
import { NameToPicture } from './nameToPicture/NameToPicture'
import './games.scss'
import { PokemonModalContext, PokemonModalContextType } from 'context/PokemonModalProvider';
import usePokemons from 'hooks/usePokemons';
import TypesBar from 'components/typesBar/TypesBar';
import Bulk from './bulk/Bulk';

export const Games = () => {
  const { type } = useContext(PokemonModalContext) as PokemonModalContextType;
  const [game, setGame] = useState<number>(0);
  const pokemons = usePokemons(type || 'fighting') || [];

  const handleButtonClick = (index: number) => {
    setGame(index);
    const buttons = document.querySelectorAll('.button-play');
    buttons.forEach((button, i) => {
      if (i === index) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
      if (i === index) {
        button.classList.add('rotate');
        setTimeout(() => {
          button.classList.remove('rotate');
        }, 2000);
      }
    });
  };
  return (
    <div className='game-container'>
      <button onClick={() => window.location.href = '/'} className='go-back-section'>
        <div className='arrow-back' />
        <span className='go-back'>Go Back</span>
      </button>
      <div className='wrapper-buttons'>
        <button className={`button-play`} onClick={() => handleButtonClick(0)}><span>Let's play Name To Picture</span></button>
        <button className={`button-play`} onClick={() => handleButtonClick(1)} ><span>Let's play Bulk</span></button>
      </div>
      <TypesBar />
      <div className={`header ${type}`}>
        <h3>world of pokemon in type:</h3>
        <h1>{type}</h1>
      </div>
      {game ? <Bulk pokemons={pokemons} /> : <NameToPicture type={type} pokemons={pokemons} />}
    </div>
  )
}
