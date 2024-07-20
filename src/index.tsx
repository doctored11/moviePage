import { Header } from "./components/header/Header";
import {
  getProfile,
  loginUser,
  logoutUser,
  regUser,
  registerUser,
} from "./api/authApi";
import { getMoviesByCount, getRandomMovie } from "./api/filmApi";
import React from "react";
import ReactDOM from "react-dom";
import { Main } from "./pages/main/MainPage";

getMoviesByCount(22).then(console.log);

// regUser("почта", "нагоршкесидиткороль", "я", "янович").then((data) =>
//   console.log(data)

const App = () => {
  return (
    <>
      <Header></Header>
      <Main></Main>
      <h1>Это App у нас - родитель под корнем)</h1>

      <img src="source/test.png" alt="так к рессурсам идем"></img>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
