import React, { useState } from 'react';
import { Stages } from './stages/Stages';
import { NameToPictureGame } from './nameToPictureGame/NameToPictureGame';
import { Pokemon } from 'interface/pokemon';

interface NameToPictureProps {
  type: string;
  pokemons:Pokemon[]
}

export const NameToPicture = ( props: NameToPictureProps ) =>{
  const { type, pokemons } = props;
  const [ stage, setStage ] = useState<number>( 1 );

  return (
    <div>
      <Stages type={type} stage={stage} />
      <NameToPictureGame type={type} stage={stage} setStage={setStage} pokemons={[...pokemons]} />
    </div>
  );
};
