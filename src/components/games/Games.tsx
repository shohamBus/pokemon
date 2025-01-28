import React, { useContext } from 'react'
import { NameToPicture } from './nameToPicture/NameToPicture'
import './games.scss'
import { PokemonModalContext, PokemonModalContextType } from 'context/PokemonModalProvider';
import { Link } from 'react-router-dom';

export const Games = () => {
  const { type } = useContext(PokemonModalContext) as PokemonModalContextType;
  return (
    <div>
    <Link to={`/`} className='go-back-section'>
      <div className='arrow-back' />
      <span className='go-back'>Go Back</span>
    </Link>
    <NameToPicture type={type} />
  </div>
  )
}
