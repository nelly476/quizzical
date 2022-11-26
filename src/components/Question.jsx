import React from "react";
import { decode } from "html-entities";

export default function Question(props) {
  const answerElem = props.answers.map((item) => {
    function getBackgroundColor() {
      if (item.isHeld && item.isGreen) {
        return "green";
      } else if (item.isHeld && item.isRed) {
        return "red";
      } else if (item.isHeld) {
        return "#d6dbf5";
      }
    }
    // const styles = {

    //   // backgroundColor: item.isHeld ? "#d6dbf5" : "",
    // };

    return (
      <button
        className="answer--button"
        id={item.id}
        key={item.id}
        onClick={() => props.handleClick(props.id, item.id)}
        style={{ backgroundColor: getBackgroundColor() }}
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
