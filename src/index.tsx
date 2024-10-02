import { Header } from "./components/header/Header";

import { getMoviesByCount, getMoviesPage, getRandomMovie } from "./api/filmApi";
import React, { useState } from "react";

import { MainPage } from "./pages/main/MainPage";
import "./styles/normalize.css";
import "./styles/global.css";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";

import { MoviePage } from "./pages/moviePage/MoviePage";
import { createRoot } from "react-dom/client";
import { CategoryPage } from "./pages/categoryPage/CategoryPage";
import { GenreFilmPage } from "./pages/genreFilmsPage/GenreFilmPage";
import { PersonPage } from "./pages/personPage/PersonPage";
import { ClickAwayProvider } from "./components/сlickAwayZone/ClickAwayContext";
import { UserContext } from "./components/userContext/UserContext";

getMoviesByCount(44).then(console.log);

// regUser("почта", "нагоршкесидиткороль", "я", "янович").then((data) =>
//   console.log(data)
// getRandomMovie().then(console.log)
// TODO сверстать футер + сделать адаптив 720 - 2000
const App = () => {
  const [user, setUser] = useState(null);

  return (
    // BrowserRouter
    <HashRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div id="modal"></div>
        <Routes>
          <Route path="/" element={<MainPage></MainPage>} />
          <Route path="/moviePage" element={<MainPage></MainPage>} />
          <Route path="/moviePage/main" element={<MainPage></MainPage>} />
          <Route path="/main" element={<MainPage></MainPage>} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/:category" element={<GenreFilmPage />} />
          <Route path="/person" element={<PersonPage />} />
          <Route path="*" element={<MainPage></MainPage>} />
        </Routes>
      </UserContext.Provider>
    </HashRouter>
  );
};

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <ClickAwayProvider>
      <App />
    </ClickAwayProvider>
  );
}
