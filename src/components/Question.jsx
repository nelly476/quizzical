import React from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  const [answersData, setAnswersData] = React.useState([]);

  React.useEffect(() => {
    setAnswersData(
      props.incorrect.map((item) => {
        return { answer: item, isRight: "", isHeld: false, id: nanoid() };
      })
    );
    setAnswersData((prev) => [
      ...prev,
      { answer: props.correct, isRight: "true", isHeld: false, id: nanoid() },
    ]);
  }, [props.incorrect]);

  // console.log(answersData);

  function handle(answerId) {
    setAnswersData((prev) =>
      prev.map((answer) => {
        return answer.id === answerId ? { ...answer, isHeld: true } : answer;
      })
    );
  }

  const answerElem = answersData.map((item) => {
    return (
      <button
        className="answer--button"
        id={item.id}
        key={item.id}
        right={item.isRight}
        onClick={() => handle(item.id)}
        style={{ backgroundColor: item.isHeld ? "#d6dbf5" : "" }}
      >
        {item.answer}
      </button>
    );
  });

  // function shuffle(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1));
  //     return ([array[i], array[j]] = [array[j], array[i]]);
  //   }
  // }

  return (
    <div>
      <h2>{props.question}</h2>
      <div className="answers--section">{answerElem}</div>
    </div>
  );
}
