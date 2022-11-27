import React from "react";
import { decode } from "html-entities";

export default function Question(props) {
  const answerElem = props.answers.map((item) => {
    function getBackgroundColor() {
      if (props.isChecked) {
        if (item.isRight && !item.isHeld) {
          return "#94D7A2";
        } else if (item.isRight && item.isHeld) {
          return "#94D7A2";
        } else if (!item.isRight && item.isHeld) {
          return "#F8BCBC";
        }
      }
      if (item.isHeld) {
        return "#d6dbf5";
      }
    }

    function getButtonHighlight() {
      if (props.isHighlighted) {
        return "1px solid red";
      }
    }

    return (
      <button
        className="answer--button"
        id={item.id}
        key={item.id}
        onClick={() => props.handleClick(props.id, item.id)}
        style={{
          backgroundColor: getBackgroundColor(),
          border: getButtonHighlight(),
        }}
        disabled={props.isDisabled ? true : false}
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
