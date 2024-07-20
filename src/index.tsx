import { getProfile, loginUser, logoutUser, regUser } from "./api/authApi";
import { getMoviesByCount, getRandomMovie } from "./api/filmApi";
import React from "react";
import ReactDOM from "react-dom";

getMoviesByCount(22).then(console.log);

// regUser("почта", "нагоршкесидиткороль", "я", "янович").then((data) =>
//   console.log(data)


// );



// loginUser("почта", "нагор2шкесидиткороль").then((data) =>
//   console.log(data)
// );

loginUser({email:"почта", password:"нагоршкесидиткороль"}).then((data) =>{
  console.log(data)
}
);

// getProfile().then((data) => console.log(data));
// logoutUser().then((data) =>
//   console.log(data)
// );

const App = () => {
  return (
    <>
      <h1>Это App у нас - родитель под корнем)</h1>

      <img src="source/test.png" alt="так к рессурсам идем"></img>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
