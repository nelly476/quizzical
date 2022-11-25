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
    fetch("https://opentdb.com/api.php?amount=6")
      .then((res) => res.json())
      .then((data) => {
        setQuestionsData(
          data.results.map((item) => {
            // console.log(item);
            return { ...item, key: nanoid() };
          })
        );
        // console.log(questionsData);
      });
  }, [start]);

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
        <div className="questions-section">{elem}</div>
      ) : (
        <StartPage handleStart={handleStart} />
      )}
    </div>
  );
}

export default App;
