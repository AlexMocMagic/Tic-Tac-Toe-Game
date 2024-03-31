import { useState } from 'react';
import './App.css';
import { cells } from './cells';

function App() {
  const [player, setPlayer] = useState("X");
  const [win, setWin] = useState(false);
  const [moves, setMoves] = useState(1)

  const choose = (index:number) => {
    console.log(moves);
    setMoves(moves + 1);
    if (!win) {
      const updatedCells = [...cells];
      if (updatedCells[index].value === "") {
        updatedCells[index].value = player;
        if (checkWin(updatedCells)) {
          setWin(true);
        } else {
          setPlayer(player === "X" ? "O" : "X");
        }
        updatedCells[index].clicked = true;
      }
      if(moves === 9){
        setPlayer("draw")
      }
    }
  };

  const checkWin = (updatedCells:any) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (
        updatedCells[a].value !== "" &&
        updatedCells[a].value === updatedCells[b].value &&
        updatedCells[b].value === updatedCells[c].value
      ) {
        return true;
      }
    }

    return false;
  };

  const update = () => {
    window.location.reload();
  };

  return (
    <div className='container'>
      <div className='game'>
        {cells.map((cell, index) => (
          <button 
            onClick={() => choose(index)} 
            key={index} 
            data-cell-index={index} 
            className={cell.class}
            disabled={cell.clicked}
          >
            {cell.value}
          </button>
        ))}
      </div>
      <div className='text'>{win ? `${player} won!`: player === "draw" ? `draw` : `${player}'s turn`}</div>
      <button onClick={update} className='button'>Reset</button>
    </div>
  );
}

export default App;
