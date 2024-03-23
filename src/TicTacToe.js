import React, { useState, useEffect } from 'react';

// Function to calculate the winner of the Tic Tac Toe game
const calculateWinner = (board) => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(square => square !== null)) {
    return 'Draw';
  }

  return null;
};

const TicTacToe = ({ username }) => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isUserTurn, setIsUserTurn] = useState(true);

  useEffect(() => {
    if (!isUserTurn && !winner) {
      const timer = setTimeout(() => {
        handleComputerMove();
      }, 1000); // Adjust the delay as needed
      return () => clearTimeout(timer);
    }
  }, [isUserTurn, winner]);

  const handleClick = (index) => {
    if (winner || board[index] || !isUserTurn) return;
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setIsUserTurn(false);
    setWinner(calculateWinner(newBoard));
  };

  const handleComputerMove = () => {
    const bestMove = findBestMove(board);
    const newBoard = [...board];
    newBoard[bestMove] = 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setIsUserTurn(true);
    setWinner(calculateWinner(newBoard));
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinner(null);
    setIsUserTurn(true);
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  let status;
  if (winner) {
    if (winner === 'X') {
      status = 'You win!';
    } else if (winner === 'O') {
      status = 'Computer wins!';
    } else {
      status = 'Draw!';
    }
    // Reset the game when there is a winner or draw
    setTimeout(() => {
      resetGame();
    }, 2000); // Reset the game after 2 seconds
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="tic-tac-toe">
      <div className="username">Hey.. {username}</div>
      <br/>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <style jsx>{`
        .tic-tac-toe {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .board-row {
          display: flex;
        }

        .square {
          font-size: 36px;
          width: 60px;
          height: 60px;
          margin: 4px;
          background-color: #eee;
          border: 1px solid #999;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out;
        }

        .square:hover {
          background-color: #ddd;
        }

        .status {
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

// Function to find the best move for the computer
const findBestMove = (board) => {
  // Prioritize winning moves
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = 'O';
      if (calculateWinner(newBoard) === 'O') {
        return i;
      }
    }
  }

  // Block opponent's winning moves
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = 'X';
      if (calculateWinner(newBoard) === 'X') {
        return i;
      }
    }
  }

  // Prioritize center
  if (board[4] === null) {
    return 4;
  }

  // Prioritize corners
  const corners = [0, 2, 6, 8];
  for (let corner of corners) {
    if (board[corner] === null) {
      return corner;
    }
  }

  // Choose any available edge
  const edges = [1, 3, 5, 7];
  for (let edge of edges) {
    if (board[edge] === null) {
      return edge;
    }
  }

  // If no preferred move is available, choose a random empty spot
  const emptySpots = board.reduce((acc, val, idx) => {
    if (val === null) acc.push(idx);
    return acc;
  }, []);
  
  return emptySpots[Math.floor(Math.random() * emptySpots.length)];
};


export default TicTacToe;
