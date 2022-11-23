import React from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  // const answers = props.incorrect.map((item) => {
  //   return <button key={nanoid()}>{item}</button>;
  // });

  return (
    <div>
      <h2>{props.question}</h2>
      {/* <span>{answers}</span> */}
    </div>
  );
}
