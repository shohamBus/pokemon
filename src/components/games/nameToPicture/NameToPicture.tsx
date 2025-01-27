// import { PokemonModalContext, PokemonModalContextType } from 'context/PokemonModalProvider';
import usePokemons from 'hooks/usePokemons';
import React, { useEffect, useMemo } from 'react'
import './nameToPicture.scss';
interface PokemonsNameToPictureProps {
  type: string
}
interface Card {
  name: string;
  img: string;
  bg: string;
}
export const NameToPicture = (props: PokemonsNameToPictureProps) => {
  const { type } = props;
  const pokemons = usePokemons(type);
  const pokemonsForTheGame = React.useMemo(() => pokemons?.sort(() => Math.random() - 0.5).slice(0, 10), [pokemons]);
  const res: string[] = useMemo(() => [], [])
  const [selectCardName, setSelectCardName] = React.useState<string | undefined>(undefined);
  const [selectCardImg, setSelectCardImg] = React.useState<string | undefined>(undefined);
  const [attempts, setAttempts] = React.useState<number>(0);
  const [cards, setCards] = React.useState<{ name: string; img: string, bg: string }[]>([]);
  const cardsForImage = React.useMemo(() => shuffleArray(cards), [cards]);
  const cardsForName = React.useMemo(() => shuffleArray(cards), [cards]);

  function shuffleArray(array: Card[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };



  useEffect(() => {
    setCards(
      pokemonsForTheGame?.map((pokemon) => {
        return { name: pokemon.name, img: pokemon.imgSrc, bg: pokemon.types[0].name };
      }) || []
    );
  }, [pokemonsForTheGame]);

  useEffect(() => {
    if (selectCardName && selectCardImg) {
      if (selectCardName === selectCardImg) {
        res.push(selectCardName)
      }
      setTimeout(() => {
        setSelectCardImg(undefined);
        setSelectCardName(undefined);
      }, 1000);
      setAttempts(prev => prev + 1)
    }
  }, [selectCardName, selectCardImg]);


  return (
    <div className="name-page-section">
      <div className='cards-section'>
        {cardsForName?.map((card, index) => (
          <div onClick={() => setSelectCardName(card.name)} key={`name-${index}`} className={`card ${type}`}>
            <span className={`text-card ${selectCardName === card.name ? 'selected' : res.includes(card.name) ? 'matched' : ''}`}>{card.name}</span></div>
        ))}
      </div>
      <div>
        <div className='count'>
          <div>Count</div>
          <span>{res.length}/{cards.length}</span>
        </div>
        <div className='count'>
          <div>Attempts</div>
          <span>{attempts}</span>
        </div>
      </div>

      <div className='cards-section'>
        {cardsForImage?.map((card, index) => (
          <div onClick={() => setSelectCardImg(card.name)} key={`img-${index}`} className={`card ${type}`}>
            <img src={card.img} alt={card.name} className={`image-card ${selectCardImg === card.name ? 'selected' : res.includes(card.name) ? 'matched' : ''}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
