import React, { useEffect, useState } from "react";
import styles from "./cardList.module.css";
import { getGenres, getMoviesByGenry } from "../../api/filmApi";
import { GenreCard } from "./card/GenreCard";
import { Movie } from "../hero/Hero";

export function GenreList() {
  const [categories, setCategories] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});

  useEffect(() => {
    async function handleGetGenres() {
      const categories = await getGenres();

      setCategories(categories);
      console.log(categories);

      const moviesData: { [key: string]: Movie | null } = {};
      for (const genry of categories) {
        const randomMovie: Movie = await getRandomGenryMovie(genry);
        moviesData[genry] = randomMovie;
      }
      setMoviesByGenre(moviesData);
    }
    handleGetGenres();
  }, []);

  async function getRandomGenryMovie(genry: string) {
    let films = localStorage.getItem("localFilms") || "{}";

    const localFilms: Array<Movie> = JSON.parse(films);
    let genreFilms: Array<Movie> = [];
  

    // оказывается на первой позиции ни в одном фильме не стоит стендап - поэтому мини костыль
    const localGenre = genry == "stand-up" ? "comedy" : genry;

    let genreFilm;
    let matchCount = 0;
    const randomMovieFaceCount = 8;

    for (const film of localFilms) {
     
      if (!film || !film.genres) continue
      if (film.genres[0] == localGenre && film.posterUrl !== null) {
        matchCount++;
        if (matchCount <= randomMovieFaceCount) {
          if (Math.random() < 1 / matchCount) {
            genreFilm = film;
          }
        } else {
          break;
        }
      }
    }

    if (!genreFilm) {
      console.log("Запрос на ", genry);
      genreFilms = await getMoviesByGenry(genry);
      const max = genreFilms.length - 1;
      genreFilm = genreFilms[Math.floor(Math.random() * max)];
    }

    return genreFilm;
  }

  return (
    <ul className={styles.cardList}>
      {categories.map((genry) => {
        const gFilm = moviesByGenre[genry];
        return gFilm ? (
          <GenreCard key={genry} movie={gFilm} genry={genry} />
        ) : null;
      })}
    </ul>
  );
}
