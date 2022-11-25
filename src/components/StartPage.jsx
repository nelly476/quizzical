export default function StartPage(props) {
  return (
    <div className="start-page">
      <h1>Quizzical</h1>
      <button className="start--btn" onClick={props.handleStart}>
        Start quiz
      </button>
    </div>
  );
}