import React, { useEffect, useMemo, useState } from 'react';
import './bulkGame.scss';
import { Pokemon } from 'interface/pokemon';



interface BulkProps {
  pokemons: Pokemon[];
  level: number;
}

const BulkGame: React.FC<BulkProps> = ({ pokemons, level }) => {
  const maxLengthWord = useMemo(() => (level === 1 ? 7 : level === 2 ? 9 : 10), [level])
  const [grid, setGrid] = useState<string[][]>([]);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const foundWords = useMemo(() => new Set<string>(), []);
  const [foundCells, setFoundCells] = useState<{ row: number; col: number }[]>([]);
  const [tempFoundCells, setTempFoundCells] = useState<{ row: number; col: number }[]>([]);
  interface TransformedPokemon {
    name: string;
    bulkName: string;
    img: string;
    bg: string;
  }
  const pokemonsForTheGame: TransformedPokemon[] = useMemo(() => {
    foundWords.clear()
    return pokemons
      ?.filter(pokemon => pokemon.name.replace(/\s+/g, '').length <= maxLengthWord) // Filter Pokémon whose names (without spaces) are 10 characters or less
      .sort(() => Math.random() - 0.5)
      .slice(0, maxLengthWord - 3)
      .map(pokemon => ({
        name: pokemon.name,
        bulkName: pokemon.name.split(' ').join(''),
        img: pokemon.imgSrc,
        bg: pokemon.types[0].name
      }));
  }, [foundWords, maxLengthWord, pokemons]);

  useEffect(() => {
    const randomPokemons = getRandomPokemons(pokemonsForTheGame, maxLengthWord);
    const newGrid = generateGrid(maxLengthWord, maxLengthWord, randomPokemons.map(p => p.name.replace(/\s+/g, '').toLowerCase()));
    setGrid(newGrid);
    setFoundCells([]);
    setTempFoundCells([]);
    foundWords.clear()
  }, [level]);

  const getRandomPokemons = (pokemonsForTheGame: TransformedPokemon[], count: number) => {
    return pokemonsForTheGame.sort(() => 0.5 - Math.random()).slice(0, count);
  };


  const generateGrid = (rows: number, cols: number, words: string[]) => {
    const grid = Array.from({ length: rows }, () => Array(cols).fill(''));
    const directions = [
      { x: 0, y: 1 }, // horizontal
      { x: 1, y: 0 }, // vertical
      { x: 1, y: 1 }, // diagonal down-right
      { x: 1, y: -1 }, // diagonal down-left
    ];

    const placeWord = (word: string) => {
      const maxAttempts = 100;
      let attempts = 0;
      let placed = false;

      while (!placed && attempts < maxAttempts) {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const reverse = Math.random() > 0.5;
        if (reverse) word = word.split('').reverse().join('');

        const startX = Math.floor(Math.random() * rows);
        const startY = Math.floor(Math.random() * cols);
        let x = startX;
        let y = startY;
        let fits = true;

        for (let i = 0; i < word.length; i++) {
          if (x < 0 || x >= rows || y < 0 || y >= cols || (grid[x][y] !== '' && grid[x][y] !== word[i])) {
            fits = false;
            break;
          }
          x += direction.x;
          y += direction.y;
        }

        if (fits) {
          x = startX;
          y = startY;
          for (let i = 0; i < word.length; i++) {
            grid[x][y] = word[i];
            x += direction.x;
            y += direction.y;
          }
          placed = true;
        }

        attempts++;
      }

      if (!placed) {
        console.warn(`Could not place word: ${word}`);
      }
    };

    words.forEach(word => placeWord(word));

    // Fill remaining empty spaces with random lowercase letters
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] === '') {
          grid[i][j] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
      }
    }

    return grid;
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCells([...selectedCells, { row, col }]);
  };

  useEffect(() => {
    if (selectedCells.length > 1) {
      const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).join('');
      const words = pokemonsForTheGame.map(p => p.bulkName.toLowerCase());
      if (words.some(word => word.startsWith(selectedWord))) {
        if (words.includes(selectedWord)) {
          foundWords.add(selectedWord);
          setFoundCells([...foundCells, ...selectedCells]);
          setTempFoundCells([...foundCells, ...selectedCells]);
          setSelectedCells([]);
        }
      } else {
        setSelectedCells([]);
        setTempFoundCells([...foundCells,])
      }
    }
  }, [selectedCells, grid, pokemonsForTheGame, foundWords, foundCells]);

  return (
    <>
      {foundWords.size >= maxLengthWord - 4 && (
        <div className="success-title">Well done!</div>
      )}
      <div className='bulk-container'>
        <div className='name-list'>
          <h2>Random Pokemons</h2>
          <ol>
            {pokemonsForTheGame.slice(0, 10).map((pokemon, index) => (
              <li key={index} className={`pokemon-name ${foundWords.has(pokemon.bulkName) ? 'found' : ''}`}>
                {pokemon.name.toLowerCase()}
                {foundWords.has(pokemon.bulkName) ? <img src={pokemon.img} alt={pokemon.name} className={`image-pokemon`} />
                  : <div className='image-pokemon-bg' />
                }
              </li>
            ))}
          </ol>
        </div>
        <div className='bulk'>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className='bulk-row'>
              {row.map((cell, cellIndex) => (
                <span
                  key={cellIndex}
                  className={`bulk-cell  ${tempFoundCells.some(found => found.row === rowIndex && found.col === cellIndex) ? 'found' : ''} ${selectedCells.some(selected => selected.row === rowIndex && selected.col === cellIndex) ? 'selected' : ''}`}
                  onClick={() => {
                    handleCellClick(rowIndex, cellIndex);
                    if (foundCells.some(found => found.row === rowIndex && found.col === cellIndex)) {
                      setTempFoundCells(foundCells.filter(found => !(found.row === rowIndex && found.col === cellIndex)));
                      setSelectedCells([...selectedCells, { row: rowIndex, col: cellIndex }]);
                    }
                  }}
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BulkGame;