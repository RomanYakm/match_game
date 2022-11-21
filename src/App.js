import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardsImages = [
  {'src': '/img/amarant-1.png', matched: false},
  {'src': '/img/basil-1.png', matched: false},
  {'src': '/img/colage-1.png', matched: false},
  {'src': '/img/flower-1.png', matched: false},
  {'src': '/img/flowers-1.png', matched: false},
  {'src': '/img/strawberries-1.png', matched: false},
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiseOne(null);
    setChoiseTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
  };

  const resetTurn = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };
  

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.src === choiseTwo.src) {
        setCards(prevCards => {
          return prevCards.map(prevCard => {
            if (prevCard.src === choiseOne.src) {
              return {...prevCard, matched: true};
            } else {
              return prevCard;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    };
  }, [choiseOne, choiseTwo]);

  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h2>Nature Match</h2>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id}
            card={card} 
            handleChoise={handleChoise} 
            flipped={card === choiseOne || card === choiseTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
