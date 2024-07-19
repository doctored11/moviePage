import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <>
      <h1>Это App у нас - родитель под корнем)</h1>
   
        <img src="source/test.png" alt="так к рессурсам идем"></img>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
