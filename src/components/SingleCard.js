import React from 'react';
import './SingleCard.css';

const SingleCard = ({ card, handleChoice, flipped }) => {
  const handleClick = () => {
    if (!flipped) {
      handleChoice(card);
    }
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className='flipper'>
        <div className='front'>
          <img src='/img/c.png' alt='card front' />
        </div>
        <div className='back'>
          <img src={card.src} alt='card back' />
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
