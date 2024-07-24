import React, { useEffect, useState } from "react";
import styles from "./cardList.module.css";
import { getGenres, getMoviesByGenry } from "../../api/filmApi";
import { GenreCard } from "../../components/cardList/card/GenreCard";
import { Movie } from "../../components/hero/Hero";

// долго - мб искать в подгружженных сначала по категории а тех что нет запрашивать, или сначала с заглушкой показать
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
    const categories = await getMoviesByGenry(genry);
    const max = categories.length - 1;
    return categories[Math.floor(Math.random() * max)];
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
