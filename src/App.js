import React, { useEffect, useState } from "react";
import axios from "axios";
import Figure from "./components/Figure";
import Header from "./components/Header";
import Popup from "./components/Popup";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";
import Notification from "./components/Notification";
import show from "./helpers/helpers";

function App() {
  const [word, setWord] = useState("");
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotifiaction, setShowNotification] = useState(false);

  const selectedWord = () => {
    axios.get("https://random-words-api.vercel.app/word").then(res => {
      setWord(res.data[0].word.toLowerCase());
    });
  };

  useEffect(() => {
    selectedWord();
  }, []);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (word.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable, word]);

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    selectedWord();
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word word={word} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        word={word}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotifiaction={showNotifiaction} />
    </>
  );
}

export default App;
