import { Header } from "./components/header/Header";

import { getMoviesByCount, getRandomMovie } from "./api/filmApi";
import React from "react";

import { MainPage } from "./pages/main/MainPage";
import "./styles/normalize.css";
import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MoviePage } from "./pages/moviePage/MoviePage";
import { createRoot } from "react-dom/client";
import { CategoryPage } from "./pages/categoryPage/CategoryPage";

// getMoviesByCount(22).then(console.log);

// regUser("почта", "нагоршкесидиткороль", "я", "янович").then((data) =>
//   console.log(data)

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/categories" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}
