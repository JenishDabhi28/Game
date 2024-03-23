import React, { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import UsernameInput from './UsernameInput';
import TicTacToe from './TicTacToe'; // Import the TicTacToe component


const cardImg = [
  { "src": "/img/1.png", matched: false },
  { "src": "/img/2.png", matched: false },
  { "src": "/img/3.jpg", matched: false },
  { "src": "/img/4.png", matched: false },
  { "src": "/img/5.png", matched: false },
  { "src": "/img/6.png", matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [win, setWin] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameSubmitted, setUsernameSubmitted] = useState(false);
  const [showStartMessage, setShowStartMessage] = useState(true);
  const [showTicTacToe, setShowTicTacToe] = useState(false); // State to toggle the display of Tic Tac Toe game

  const shuffleCards = () => {
    const shuffleCards = [...cardImg, ...cardImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), flipped: false }));
    setCards(shuffleCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn(0);
    setWin(false);
    setShowStartMessage(false); // Hide the start message when new game starts
  };

  const handleChoice = (card) => {
    if (!card.matched) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
      setCards(prevCards => {
        return prevCards.map(c => {
          if (c.id === card.id) {
            return { ...c, flipped: true };
          }
          return c;
        });
      });
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
          resetFlipped();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.every(card => card.matched) && cards.length > 0) {
      setWin(true);
    } else {
      setWin(false);
    }
  }, [cards]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn(prevTurn => prevTurn + 1);
  };

  const resetFlipped = () => {
    setCards(prevCards => {
      return prevCards.map(card => {
        return { ...card, flipped: false };
      });
    });
  };

  const handleUsernameSubmit = (username) => {
    setUsername(username);
    setUsernameSubmitted(true);
  };

  const handleTicTacToeClick = () => {
    setShowTicTacToe(true);
  };

  return (
    <div className="App">
      {usernameSubmitted && !showTicTacToe ? (
  <>
    <div className="username-container">
      <p>Hello.. {username}!!</p>
    </div>
    {showStartMessage && (
      <div className="start-message">
        <p>Select the Game!! All the Best</p>
      </div>
    )}
    <h1>Games</h1>
    {/* Conditionally render the turn count button */}
    {showTicTacToe ? null : (
      <button style={{ position: 'absolute', top: 0, right: 0, padding: '6px 12px', paddingTop: 0, paddingBottom: 0 }}>Turns: {turn}</button>
    )}
    <button onClick={shuffleCards}>Magic Game</button>
    <div className='card-grid'>
      {cards.map(card => (
        <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice} 
          flipped={card.flipped || card.matched}
        />
      ))}
    </div>
    {win && (
      <div className="win-message">
        <p>You Win, {username}!</p>
      </div>
    )}
    <button onClick={handleTicTacToeClick}>Play Tic Tac Toe</button>
  </>
) : !showTicTacToe ? (
  <UsernameInput onSubmit={handleUsernameSubmit} />
) : (
  <TicTacToe username={username} />
)}

    </div>
  );
}

export default App;
