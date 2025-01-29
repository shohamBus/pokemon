import React, { useEffect, useMemo, useState } from 'react'
import './nameToPictureGame.scss';
import { EMPTY_STRING } from 'utils/constants';
import { Pokemon } from 'interface/pokemon';

interface NameToPictureGameProps{
  type:string
  stage:number
  pokemons:Pokemon[]
  setStage:React.Dispatch<React.SetStateAction<number>>
}

interface Card {
  name: string;
  img: string;
  bg: string;
}

export const NameToPictureGame = (props:NameToPictureGameProps) => {
  const {type, stage,setStage, pokemons }=props;

  const pokemonsForTheGame = useMemo(() => {
    let numberOfPokemons;
    if (stage === 1) {
      numberOfPokemons = 4;
    } else if (stage === 2) {
      numberOfPokemons = 8;
    } else {
      numberOfPokemons = 12;
    }
    return pokemons?.sort(() => Math.random() - 0.5).slice(0, numberOfPokemons);
  }, [stage,type]);
  
  const resSet = useMemo(() => new Set(), []);
  const maxAttempts = useMemo(() => {
    if (stage === 1) return 6;
    if (stage === 2) return 12;
    return 18;
  }, [stage]);

  const [selectedCards, setSelectedCards] = useState<{ name?: string; image?: string }>({ name: undefined, image: undefined });

  const [attempts, setAttempts] = useState<[number, boolean]>([0, false]);
  const [cards, setCards] = useState<{ name: string; img: string, bg: string }[]>([]);
  const [showTitle, setShowTitle] = useState<boolean>(false);
  const [showMaxAttemptsTitle, setShowMaxAttemptsTitle] = useState<boolean>(false);
  const cardsForImage = useMemo(() => shuffleArray(cards), [cards]);
  const cardsForName = useMemo(() => shuffleArray(cards), [cards]);

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
    setAttempts([0,false])
    resSet.clear();
  }, [pokemonsForTheGame, resSet]);

  useEffect(() => {
    if (selectedCards.name && selectedCards.image) {
      if (selectedCards.name === selectedCards.image) {
        resSet.add(selectedCards.name)
      }
      setTimeout(() => {
        setSelectedCards({ name: undefined, image: undefined });
      }, 1000);
      if (resSet.size === pokemonsForTheGame?.length) {
        setShowTitle(true);
        setTimeout(() => {
          setShowTitle(false);
          setStage((prev: number) => prev + 1);
        }, 2000); 
      }
      setAttempts((prevAttempts) => {
        const newAttempts: [number, boolean] = [prevAttempts[0] + 1, true];
        const unmatchedPairs = ((cardsForName?.length) - resSet.size);
        const remainingAttempts = maxAttempts - newAttempts[0];
        if (newAttempts[0] >= maxAttempts || remainingAttempts < unmatchedPairs) {
          setShowMaxAttemptsTitle(true);
          setTimeout(() => {
            setShowMaxAttemptsTitle(false);
            setAttempts([0, false]);
            resSet.clear();
            setSelectedCards({ name: undefined, image: undefined });
          }, 2000); 
        }
        return newAttempts;
      });
    }
  }, [resSet, cards, setStage, pokemonsForTheGame, maxAttempts, cardsForName, selectedCards]);

    const getCardStyle=(name: string, check?: string)=>{
      const checkName=check || undefined;
     return  `card ${type} pokeball-bg-card ${checkName  === name ? 'selected' : resSet.has(name) ? 'matched' : EMPTY_STRING}`
    }

    const renderTitels=()=>{
      return (
        <>
          {showTitle && stage !== 3 && <div className="big-title-success">Well done! Let's progress to stage {stage + 1}</div>}
          {showTitle && stage === 3 && 
            <div className="big-title-success">
              Well done! You Are the king of the {type} world, Try another world
            </div>
          }
          {(showMaxAttemptsTitle && !showTitle) && <div className="big-title-failed">You failed, no worries. Let's try again!</div>}
        </>
      );
    }

  return (
    <div>
      {renderTitels()}
    <div className='count-section'>
    <div className='count-box'>
      <div>Count</div>
      <span className={`${(selectedCards.name===selectedCards.image&&selectedCards.image!==undefined)   ? 'animate' : EMPTY_STRING}`}>{resSet.size}/{cards.length}</span>
    </div>
    <div className='count-box'>
      <div>Attempts</div>
      <span className={`attempts ${attempts[1] ? 'animate' : EMPTY_STRING}`} onAnimationEnd={() => setAttempts([attempts[0], false])}>{attempts[0]}/{maxAttempts}</span>
    </div>
  </div>
    <div className="name-page-section">
      <div className='cards-section'>
        {cardsForName?.map((card, index) => (
          <div onClick={() =>(!selectedCards.name  && !resSet.has(card.name)) &&  setSelectedCards((prev)=>({...prev, name: card.name}))}  key={`name-${index}`} className={getCardStyle(card.name, selectedCards.name)}>
            <span className={`text-card `}>{card.name}</span></div>
        ))}
      </div>
      <div className='cards-section'>
        {cardsForImage?.map((card, index) => (
          <div onClick={() => (!selectedCards.image  && !resSet.has(card.name)) && setSelectedCards((prev)=>({...prev, image: card.name}))} key={`img-${index}`} className={getCardStyle(card.name,selectedCards.image)}>
            <img src={card.img} alt={card.name} className={`image-card `} />
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
