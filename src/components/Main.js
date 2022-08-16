import { useEffect, useRef, forwardRef, useState } from 'react';
import FlipMove from 'react-flip-move';
import shuffle from 'shuffle-array';
import Card from './Card';
import MessageOverlay from './MessageOverlay';
import data from '../data.json';

const CardForwardRef = forwardRef(Card);
const MessageOverlayForwardRef = forwardRef(MessageOverlay);

function Main() {
  const selectedDumplingsId = useRef(new Set());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [dumplings, setDumplings] = useState(shuffleDumplings(data));

  useEffect(() => {
    function loadImage(src) {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = src;
        loadImg.onload = () => {
          setTimeout(() => {
            resolve(src);
          }, 2000);
        };
        loadImg.onerror = (error) => reject(error);
      });
    }

    Promise.all(
      dumplings.map(({ image }) =>
        loadImage(`${process.env.PUBLIC_URL}/images/${image}`)
      )
    )
      .then(() => setLoading(false))
      .catch((error) => console.log('Failed to load images', error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  function handleDumplingSelection(dumplingId) {
    if (selectedDumplingsId.current.has(dumplingId)) {
      setMessage('You clicked the same knödel twice!');
    } else {
      selectedDumplingsId.current.add(dumplingId);
      setScore((prevScore) => prevScore + 1);
      if (selectedDumplingsId.current.size === dumplings.length) {
        setMessage('Good job! You won the game!');
      } else {
        setDumplings(shuffleDumplings([...dumplings]));
      }
    }
  }

  function shuffleDumplings(dumplings) {
    return shuffle(dumplings);
  }

  function reset() {
    selectedDumplingsId.current = new Set();
    setScore(0);
    setDumplings(shuffleDumplings([...dumplings]));
  }

  function handleModalClose() {
    reset();
    setMessage(null);
  }

  return (
    <main className="app-main">
      {message && (
        <FlipMove typeName={null} appearAnimation="fade">
          <MessageOverlayForwardRef
            key={message}
            message={message}
            onClick={handleModalClose}
          />
        </FlipMove>
      )}
      {loading ? (
        <p style={{ fontSize: '18px', textAlign: 'center' }}>Loading data...</p>
      ) : (
        <>
          <div className="score-container">
            <p>Score: {score}</p>
            <p>Best score: {bestScore}</p>
          </div>
          <FlipMove className="cards" appearAnimation="elevator">
            {dumplings.map((dumpling) => (
              <CardForwardRef
                key={dumpling.id}
                imgSrc={dumpling.image}
                name={dumpling.name}
                onClick={() => handleDumplingSelection(dumpling.id)}
              />
            ))}
          </FlipMove>
        </>
      )}
    </main>
  );
}

export default Main;
