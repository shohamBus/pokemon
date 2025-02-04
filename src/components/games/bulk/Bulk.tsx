import React, { useState } from 'react';
import BulkGame from './bulkGame/BulkGame';
import { Pokemon } from 'interface/pokemon';
import ButtonsGroup from './buttonsGroup/ButtonsGroup';
interface BulkProps {
  pokemons: Pokemon[];
}

const Bulk: React.FC<BulkProps> = ({ pokemons }) => {
  const [level, setLevel] = useState(1)
  return (
    <div >
      <div >
        <ButtonsGroup level={level} setLevel={setLevel} />
      </div>
      <BulkGame pokemons={pokemons} level={level} />
    </div >
  );
};

export default Bulk;