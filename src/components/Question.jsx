import React from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

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

    setAnswersData((prev) => shuffle(prev));
  }, [props]);

  // console.log(answersData);

  function handle(answerId) {
    setAnswersData((prev) =>
      prev.map((answer) => {
        return answer.id === answerId ? { ...answer, isHeld: true } : answer;
      })
    );
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
        {decode(item.answer)}
      </button>
    );
  });

  return (
    <div>
      <h2>{decode(props.question)}</h2>
      <div className="answers--section">{answerElem}</div>
    </div>
  );
}
