import React, { useState, useEffect } from 'react';
import '../css/Inicio.css';

const TypingEffect = ({ staticText, dynamicWords, colors, speed = 200 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Efecto para manejar la escritura y el borrado de la última palabra
  useEffect(() => {
    if (subIndex === dynamicWords[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % dynamicWords.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, dynamicWords, speed]);

  return (
    <h2>
      {staticText}{' '}
      <span style={{ color: colors[index] }} >
        {dynamicWords[index].substring(0, subIndex)}
<<<<<<< HEAD
        <span className="cursor">_</span>
=======
        <span className="cursor">|</span>
>>>>>>> victor
      </span>
    </h2>
  );
};

<<<<<<< HEAD
export default TypingEffect;
=======
export default TypingEffect;
>>>>>>> victor
