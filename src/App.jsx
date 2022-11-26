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
            const answersArr = item.incorrect_answers.map((i) => {
              return {
                answer: i,
                isRight: false,
                isHeld: false,
                id: nanoid(),
              };
            });

            answersArr.push({
              answer: item.correct_answer,
              isRight: true,
              isHeld: false,
              id: nanoid(),
            });

            return {
              ...item,
              key: nanoid(),
              id: nanoid(),
              answers: answersArr,
            };
          })
        );
        // console.log()
      });
  }, []);

  function handleClick(questionId, answerId) {
    // console.log(answerId, questionId);

    setQuestionsData((prev) => {
      return prev.map((item) => {
        return item.id != questionId
          ? item
          : {
              ...item,
              answers: item.answers.map((answer) => {
                return answer.id != answerId
                  ? answer
                  : { ...answer, isHeld: true };
              }),
            };
      });
    });
  }

  const elem = questionsData.map((item) => {
    return (
      <Question
        question={item.question}
        correct={item.correct_answer}
        incorrect={item.incorrect_answers}
        key={item.key}
        id={item.id}
        answers={item.answers}
        handleClick={handleClick}
      />
    );
  });

  function checkAnswers() {
    console.log(questionsData);
  }

  return (
    <div className="app">
      <span className="dot-right"></span>
      <span className="dot-left"></span>

      {start ? (
        <div className="quiz--section">
          <div>{elem}</div>
          <div className="button--section">
            <button className="check--button" onClick={checkAnswers}>
              Check
            </button>
          </div>
        </div>
      ) : (
        <StartPage handleStart={handleStart} />
      )}
    </div>
  );
}

export default App;
