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

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
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
              isDisabled: false,
              answers: shuffle(answersArr),
              isChecked: false,
            };
          })
        );
        // console.log()
      });
  }, []);

  function handleClick(questionId, answerId) {
    setQuestionsData((prev) => {
      return prev.map((item) => {
        return item.id != questionId
          ? item
          : {
              ...item,
              answers: item.answers.map((answer) => {
                answer.isHeld = false;
                return answer.id != answerId
                  ? answer
                  : { ...answer, isHeld: !answer.isHeld };
              }),
            };
      });
    });
  }

  const elem = questionsData.map((item) => {
    return (
      <Question
        question={item.question}
        key={item.key}
        id={item.id}
        answers={item.answers}
        handleClick={handleClick}
        isDisabled={item.isDisabled}
        isChecked={item.isChecked}
      />
    );
  });

  function checkAnswers() {
    setQuestionsData((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          isDisabled: true,
          isChecked: true,
        };
      });
    });
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
