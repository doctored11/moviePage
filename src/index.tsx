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
import { MainPage } from "./pages/main/MainPage";
import "./styles/normalize.css"
import "./styles/global.css"

getMoviesByCount(22).then(console.log);


// regUser("почта", "нагоршкесидиткороль", "я", "янович").then((data) =>
//   console.log(data)

const App = () => {
  return (
    <>
      <MainPage></MainPage>
      <h1>Это App у нас - родитель под корнем)</h1>

      <img src="source/test.png" alt="так к рессурсам идем"></img>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
