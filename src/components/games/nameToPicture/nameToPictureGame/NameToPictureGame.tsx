import usePokemons from 'hooks/usePokemons';
import React, { useEffect, useMemo, useState } from 'react'
import './nameToPictureGame.scss';

interface NameToPictureGameProps{
  type:string
  stage:number
  setStage:React.Dispatch<React.SetStateAction<number>>
}

interface Card {
  name: string;
  img: string;
  bg: string;
}
export const NameToPictureGame = (props:NameToPictureGameProps) => {
  const {type, stage,setStage }=props;

  const pokemons = usePokemons(type || 'fighting');
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
  }, [pokemons, stage]);
  
  const resSet = useMemo(() => new Set(), []);
  const maxAttempts = useMemo(() => {
    if (stage === 1) return 6;
    if (stage === 2) return 12;
    return 18;
  }, [stage]);

  const [selectCardName, setSelectCardName] = useState<string | undefined>(undefined);
  const [selectCardImg, setSelectCardImg] = useState<string | undefined>(undefined);
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
    if (selectCardName && selectCardImg) {
      if (selectCardName === selectCardImg) {
        resSet.add(selectCardName)
      }
      setTimeout(() => {
        setSelectCardImg(undefined);
        setSelectCardName(undefined);
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
            setSelectCardName(undefined);
            setSelectCardImg(undefined);
          }, 2000); 
        }
        return newAttempts;
      });
    }
  }, [selectCardName, selectCardImg, resSet, cards, setStage, pokemonsForTheGame, maxAttempts, cardsForName]);


  return (
    <div>
      {showTitle && stage!==3 && <div className="big-title-success">Well done! Let's progress to stage {stage + 1}</div>}
      {showTitle && stage===3 && 
      <div className="big-title-success">
        Well done! You Are the king of the {type} world, Try another world
      </div>}
      {showMaxAttemptsTitle && <div className="big-title-failed">You failed, no worries. Let's try again!</div>}
    <div className='count-section'>
    <div className='count-box'>
      <div>Count</div>
      <span className={`${(selectCardName===selectCardImg&&selectCardImg!==undefined)   ? 'animate' : ''}`}>{resSet.size}/{cards.length}</span>
    </div>
    <div className='count-box'>
      <div>Attempts</div>
      <span className={`attempts ${attempts[1] ? 'animate' : ''}`} onAnimationEnd={() => setAttempts([attempts[0], false])}>{attempts[0]}/{maxAttempts}</span>
    </div>
  </div>
    <div className="name-page-section">
      <div className='cards-section'>
        {cardsForName?.map((card, index) => (
          <div onClick={() =>(!selectCardName  && !resSet.has(card.name)) && setSelectCardName(card.name)}  key={`name-${index}`} className={`card ${type} pokeball-bg-card ${selectCardName === card.name ? 'selected' : resSet.has(card.name) ? 'matched' : ''}`}>
            <span className={`text-card `}>{card.name}</span></div>
        ))}
      </div>
      <div className='cards-section'>
        {cardsForImage?.map((card, index) => (
          <div onClick={() => (!selectCardImg && !resSet.has(card.name)) && setSelectCardImg(card.name) } key={`img-${index}`} className={`card ${type} pokeball-bg-card ${selectCardImg === card.name ? 'selected' : resSet.has(card.name) ? 'matched' : ''}`}>
            <img src={card.img} alt={card.name} className={`image-card `} />
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
