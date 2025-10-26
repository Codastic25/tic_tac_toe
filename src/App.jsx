import './App.css'
import { useState } from 'react';

function Square ({value, onSquareClick}){
  return (
      <button className='square' onClick={onSquareClick}>
      {value}
      </button>
  );
}

function App({xIsNext, squares, onPlay}) {

  function handleClick(i){//event quand je clique
    if (squares[i] || calculateWinner(squares)){//si la case est deja occupée, on return et on écrase pas la valeur d'une case occupée
      return;
    }
    const nextSquares = squares.slice();//copie du tableau grace a la methode slice()
    if (xIsNext){
      nextSquares[i] = "X";
    }
    else{
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  //const [xIsNext, setXIsNext] = useState(true);//booléen pour savoir quel sera le joueur suivant
  //const [squares, setSquares] = useState(Array(9).fill(null))//tableau de 9 éléments initialisés à null

  const winner = calculateWinner(squares);
  let status;
  if (winner){
    status = winner + " a gagné !"
  }
  else{
    status = "Prochain tour : " + (xIsNext ? "X" : "O");
  }

  return (
    <>

    <div className='status'>{status}</div>

    <div className='board_row'>
      <Square value = {squares[0]} onSquareClick={() => handleClick(0)}/> {/*() => handleClick(0) est une fonction fléchée, qd je clique sur la case, je run le code après la flèche*/}
      <Square value = {squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value = {squares[2]} onSquareClick={() => handleClick(2)}/>
    </div >
    <div className='board_row'>
      <Square value = {squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value = {squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value = {squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className='board_row'>
      <Square value = {squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value = {squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value = {squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
    </>
  );
}

function calculateWinner (squares){
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

  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);//historique des états du tableau de jeu
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = ([...history.slice(0, currentMove + 1), nextSquares]);//crée un nouveau tableau qui contient tous les éléments existants de history, suivis de nextSquares
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0){
      description = "Aller au coup #" + move;
    }
    else{
      description = "Revenir au début";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game_app'>
        <App xIsNext = {xIsNext} squares = {currentSquares} onPlay = {handlePlay}/>
      </div>
      <div className='game_info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game
