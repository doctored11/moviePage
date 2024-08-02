import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./moviePage.module.css";
import { Header } from "../../components/header/Header";
import { Hero, Movie } from "../../components/hero/Hero";
import { CategoryBlock } from "../../components/categoryBlock/CategoryBlock";
import { AboutBlock } from "../../components/aboutBlock/AboutBlock";
import { getMovieById } from "../../api/filmApi";


export function MoviePage() {
  const { id } = useParams<{ id: string }>();

  const [movie, setMovie] = useState<Movie | null>(null);

  console.log(id);

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        try {
          const movie = await getMovieById(Number(id));
          setMovie(movie);
        } catch (error) {
          console.error("не получил фильм", error);
        }
      }
    };

    fetchMovie();
  }, [id]);

  

  const block = (
    <>
      <Header></Header>
      <Hero movie={movie as Movie}></Hero>
      <CategoryBlock header="топ фильмов">
        <div className={styles.limiter}>
          <AboutBlock movie={movie as Movie}></AboutBlock>
        </div>
      </CategoryBlock>
      
      
    </>
  );
  return block;
}
