import React, { useEffect, useState } from "react";
import styles from "./cardList.module.css";
import { getGenres, getMoviesByGenry } from "../../api/filmApi";
import { GenreCard } from "../../components/cardList/card/GenreCard";
import { Movie } from "../../components/hero/Hero";

// долго - мб искать в подгружженных сначала по категории а тех что нет запрашивать, или сначала с заглушкой показать.
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
        //тут сначала надо проверить первую строку в массиве  genry у фильмов из LS
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
    if (localFilms.length > 0) {
      genreFilms = localFilms.filter(
        (film) => film.genres[0] == genry && film.posterUrl != null
      );
    }

   
   
    if (genreFilms.length == 0 || !genreFilms) {

      console.log("Запрос на ", genry);
      genreFilms = await getMoviesByGenry(genry);
    }
    const max = genreFilms.length - 1;

    return genreFilms[Math.floor(Math.random() * max)];
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
