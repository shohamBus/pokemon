import React, { useState } from 'react';
import { Stages } from './stages/Stages';
import { NameToPictureGame } from './nameToPictureGame/NameToPictureGame';
import './nameToPicture.scss';
import TypesBar from 'components/typesBar/TypesBar';
interface NameToPictureProps
{
  type: string;
}

export const NameToPicture = ( props: NameToPictureProps ) =>{
  const { type } = props;
  const [ stage, setStage ] = useState<number>( 1 );

  return (
    <div>
      <TypesBar  />
      <div className={`header ${ type }`}>
        <h3>world of pokemon in type:</h3>
        <h1>{type}</h1>
      </div>
      <Stages type={type} stage={stage} />
      <NameToPictureGame type={type} stage={stage} setStage={setStage} />
    </div>
  );
};
