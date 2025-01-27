// import { PokemonModalContext, PokemonModalContextType } from 'context/PokemonModalProvider';
import usePokemons from 'hooks/usePokemons';
import React, { useEffect } from 'react'
import './nameToPicture.scss';
interface PokemonsNameToPictureProps {
  type: string
}
export const NameToPicture = ( props:PokemonsNameToPictureProps) => {
  const {type} = props;
    const pokemons = usePokemons(type);
    const [cards, setCards] = React.useState<{ name: string; img: string,bg:string }[]>([]);
    // const [selectCardName, setSelectCardName] = React.useState<string>();
    // const [selectCardImg, setSelectCardImg] = React.useState<string>();

    useEffect(() => {
      setCards(
        pokemons?.map((pokemon) => {
          console.log(pokemon);
          
          return { name: pokemon.name, img: pokemon.imgSrc,bg: pokemon.types[0].name };
        }) || []
      );
    }, [pokemons]);

    
  return (
    <div className="name-page-section">
    <div className='cards-section'>
      {cards.sort(() => Math.random() - 0.5).map((card, index) => (
        <div key={`name-${index}`} className={`card ${card.bg}`}>
          <span onClick={()=>console.log(card.name)} className="text-card">{card.name}</span>
        </div>
      ))}
    </div>
    <div className='cards-section'>
      {cards.sort(() => Math.random() - 0.5).map((card, index) => (
        <div key={`img-${index}`} className={`card ${card.bg}`}>
          <img onClick={()=>console.log(card.name)} src={card.img} alt={card.name} className='image-card' />
        </div>
      ))}
    </div>
  </div>
  )
}
