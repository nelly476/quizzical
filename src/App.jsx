import { useState, useEffect } from "react";
import "./App.css";
import StartPage from "./components/StartPage";
import Question from "./components/Question";
import { nanoid } from "nanoid";

function App() {
  const [start, setStart] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);

  function handleStart() {
    setStart((prevState) => !prevState);
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        setQuestionsData(
          data.results.map((item) => {
            return { ...item, key: nanoid() };
          })
        );
        // console.log("h");
      });
  }, []);

  const elem = questionsData.map((item) => {
    return (
      <Question
        question={item.question}
        correct={item.correct_answer}
        incorrect={item.incorrect_answers}
        key={item.key}
      />
    );
  });

  return (
    <div className="app">
      <span className="dot-right"></span>
      <span className="dot-left"></span>

      {start ? (
        <div className="quiz--section">
          <div>{elem}</div>
          <div className="button--section">
            <button className="check--button">Check</button>
          </div>
        </div>
      ) : (
        <StartPage handleStart={handleStart} />
      )}
    </div>
  );
}

export default App;
