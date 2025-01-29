import React, { useEffect, useState } from 'react';
import './Bulk.scss';

interface Pokemon {
  name: string;
}

interface BulkProps {
  pokemons: Pokemon[];
}

const Bulk: React.FC<BulkProps> = ({ pokemons }) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  useEffect(() => {
    const randomPokemons = getRandomPokemons(pokemons, 10);
    const newGrid = generateGrid(10, 10, randomPokemons.map(p => p.name.toLowerCase()));
    setGrid(newGrid);
  }, [pokemons]);

  const getRandomPokemons = (pokemons: Pokemon[], count: number) => {
    return pokemons.sort(() => 0.5 - Math.random()).slice(0, count);
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
      const maxAttempts = 100; // Maximum number of attempts to place a word
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
    // for (let i = 0; i < rows; i++) {
    //   for (let j = 0; j < cols; j++) {
    //     if (grid[i][j] === '') {
    //       grid[i][j] = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // 'a' is 97 in ASCII
    //     }
    //   }
    // }

    return grid;
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCells([...selectedCells, { row, col }]);
  };

  useEffect(() => {
    if (selectedCells.length > 1) {
      const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).join('');
      const reversedSelectedWord = selectedWord.split('').reverse().join('');
      const words = pokemons.map(p => p.name.toLowerCase());

      if (words.includes(selectedWord) || words.includes(reversedSelectedWord)) {
        setFoundWords([...foundWords, selectedWord]);
      }

      setSelectedCells([]);
    }
  }, [selectedCells, grid, pokemons, foundWords]);

  return (
    <div className='bulk-container'>
      <div className='name-list'>
        <h2>Random Pokemons</h2>
        <ol>
          {pokemons.slice(0, 10).map((pokemon, index) => (
            <li key={index} className={`pokemon-name ${foundWords.includes(pokemon.name.toLowerCase()) ? 'found' : ''}`}>
              {pokemon.name.toLowerCase()}
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
                className={`bulk-cell ${selectedCells.some(selected => selected.row === rowIndex && selected.col === cellIndex) ? 'selected' : ''}`}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
              >
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bulk;