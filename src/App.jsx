import { useState, useEffect } from "react";
import "./App.css";
import StartPage from "./components/StartPage";
import Question from "./components/Question";
import { nanoid } from "nanoid";

function App() {
  const [start, setStart] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [game, setGame] = useState(false);

  function handleStart() {
    setStart((prevState) => !prevState);
  }

  useEffect(() => {
    setCorrectAnswers(
      questionsData
        .map((item) => {
          return !item.isAnswered
            ? 0
            : item.answers
                .map((answer) => {
                  return answer.isRight && answer.isHeld ? 1 : 0;
                })
                .reduce((total, num) => {
                  return total + num;
                }, 0);
        })
        .reduce((total, num) => {
          return total + num;
        }, 0)
    );
  }, [questionsData]);

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
              isAnswered: false,
              isHighlighted: false,
            };
          })
        );
        console.log(start);
      });
  }, [start]);

  function handleClick(questionId, answerId) {
    setQuestionsData((prev) => {
      return prev.map((item) => {
        return item.id != questionId
          ? item
          : {
              ...item,
              isAnswered: true,
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
        isAnswered={item.isAnswered}
        isHighlighted={item.isHighlighted}
      />
    );
  });

  function checkAnswers() {
    setQuestionsData((prev) => {
      return prev.map((item) => {
        function answered(i) {
          return i.isAnswered;
        }

        if (prev.every(answered)) {
          return {
            ...item,
            isDisabled: true,
            isChecked: true,
            isHighlighted: false,
          };
        } else if (!item.isAnswered) {
          return {
            ...item,
            isHighlighted: true,
          };
        } else {
          return item;
        }
      });
    });
  }

  function areAllChecked(i) {
    return i.isChecked;
  }

  function startGame() {
    setGame((prev) => !prev);
  }

  return (
    <div className="app">
      <span className="dot-right"></span>
      <span className="dot-left"></span>

      {game ? (
        <div className="quiz--section">
          <div>{elem}</div>
          <div className="button--section">
            {questionsData.every(areAllChecked) ? (
              <span>
                <p>
                  <strong>You scored {correctAnswers}/5 correct answers</strong>
                </p>
                <button className="restart--button" onClick={handleStart}>
                  Play again
                </button>
              </span>
            ) : (
              <button className="check--button" onClick={checkAnswers}>
                Check
              </button>
            )}
          </div>
        </div>
      ) : (
        <StartPage startGame={startGame} />
      )}
    </div>
  );
}

export default App;
