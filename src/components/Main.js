import { forwardRef, useEffect, useRef, useState } from 'react';
import FlipMove from 'react-flip-move';
import shuffle from 'shuffle-array';
import Card from './Card';
import data from '../data.json';

const CardForwardRef = forwardRef(Card);

function Main() {
  const selectedDumplingsId = useRef(new Set());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [dumplings, setDumplings] = useState(shuffleDumplings(data));
  const [loading, setLoading] = useState(true);

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

  function handleDumplingSelection(dumplingId) {
    if (selectedDumplingsId.current.has(dumplingId)) {
      selectedDumplingsId.current = new Set();
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
    } else {
      selectedDumplingsId.current.add(dumplingId);
      setScore((prevScore) => prevScore + 1);
    }
    setDumplings(shuffleDumplings([...dumplings]));
  }

  function shuffleDumplings(dumplings) {
    return shuffle(dumplings);
  }

  return (
    <main className="app-main">
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
