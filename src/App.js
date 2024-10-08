import { useState } from 'react';
import strawberryImg from './graphics/strawberry.png';
import whippedCreamImg from './graphics/dollop.png';

const strawberryTic = (
  <span className="marker strawberry"></span>
);

const whippedCreamTac = (
  <span className="marker whipped-cream"></span>
  );

function Square({ value, onSquareClick }) {
  let display = null;
  if (value === "strawberry") {
    display = <img src={strawberryImg} alt="Strawberry" className="toppings" />;
  } else if (value === "whipped cream"){
    display = <img src={whippedCreamImg} alt="Whipped Cream" className="toppings" />;
  }
  return (
    <button className="square" onClick={onSquareClick}>
      { display }
    </button>
  );
}

function Board({ squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    const nextSquares = squares.slice();
    const xIsNext = !squares.includes("strawberry") || (squares.filter(s => s === "strawberry").length === squares.filter(s => s === "whipped cream").length);
    if (xIsNext) {
      nextSquares[i] = "strawberry";
    } else {
      nextSquares[i] = "whipped cream";
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <div className = "background">
      <div className = "play-grid">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>

        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>

        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
      </div>
      </div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = "Winner: " + winner +"!";
  } else if (!currentSquares.includes(null)) {
    status = "It's a draw!"
  } else {
    const xIsNext = currentMove % 2 === 0;
    status = "Next player: " + (xIsNext ? "strawberry" : "whipped cream");
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXIsNext(true);
  }

  function goBack() {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
      setXIsNext((currentMove - 1) % 2 === 0);
    }
  }

  return (
    <div className="game">
      <div>
        <h1 className="title">Tic • Tac • Toe</h1>
      </div>
      <div className="status">{status}</div>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>
          <button className="buttons" onClick={restartGame}>Restart Game</button>
          <button className="buttons" onClick={() => goBack()}>Go back</button>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}