import React from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  let answers = props.incorrect.map((item) => {
    return { answer: item, isRight: "" };
  });

  answers.push({ answer: props.correct, isRight: "true" });

  const answerElem = answers.map((item) => {
    return (
      <button
        key={nanoid()}
        right={item.isRight}
        onClick={(e) => props.handleAnswer(e, item.isRight)}
        style={{ backgroundColor: item.isRight ? "green" : "red" }}
      >
        {item.answer}
      </button>
    );
  });

  // const wrongAnswers = props.incorrect.map((item) => {
  //   return (
  //     <button
  //       key={nanoid()}
  //       answer="wrong"
  //       onClick={(e) => props.handleAnswer(e)}
  //     >
  //       {item}
  //     </button>
  //   );
  // });

  // const rightAnswer = (
  //   <button
  //     key={nanoid()}
  //     answer="right"
  //     onClick={(e) => props.handleAnswer(e)}
  //   >
  //     {props.correct}
  //   </button>
  // );

  // function shuffle(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1));
  //     return ([array[i], array[j]] = [array[j], array[i]]);
  //   }
  // }

  return (
    <div>
      <h2>{props.question}</h2>
      {answerElem}
      {/* {wrongAnswers}
      {rightAnswer} */}
      {/* {answers} */}
    </div>
  );
}
