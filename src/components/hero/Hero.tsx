import React, { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";
import { getMovieById, getRandomMovie } from "../../api/filmApi";
import { getFavoritesFilms, setFavoritesFilms } from "../../api/authApi";
import { MiniInfo } from "../miniInfo/MiniInfo";
import { useParams } from "react-router-dom";
import { BackImageBlock } from "./backImageBlock/BackImageBlock";
import { MainFilmInfo } from "./mainFilmInfo/MainFilmInfo";
import { FavoriteBtn } from "./favoriteBtn/FavoriteBtn";

export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  posterUrl: string;
  plot: string;
  runtime: number;
  tmdbRating: number;
  trailerUrl: string;
  releaseYear: number;
  genres: Array<string>;

  awardsSummary: string | null;
  budget: number | null;
  cast: Array<string>;
  director: string | null;
  language: string;
  languages: Array<string>;
  production: string | null;
  status: string;
}

export function Hero({ movie }: { movie: Movie }) {
  const film = movie;
  const [imageWidth, setImageWidth] = useState(window.innerWidth * 0.4);

  const backRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (film?.posterUrl) {
          const img = new Image();
          img.src = film.posterUrl;
          img.onload = () => {
            console.log(img.width, img.height);
            setImageWidth(img.width);
          };
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (backRef.current) {
      backRef.current.style.width = `${imageWidth}px`;
    }
  }, [imageWidth]);

  const heroBlock = (
    <div className={styles.hero}>
      <BackImageBlock ref={backRef} film={film as Movie}></BackImageBlock>
      <div className="frame">
        {film && (
          <div className={styles.content}>
            <MiniInfo movie={film}></MiniInfo>
            <MainFilmInfo movie={film}></MainFilmInfo>

            <ul className={styles.btnBlock}>
              {/* реализовать + стилизация кнопок глобальна */}
              <button className={`btn btn--active   ${styles.filmButton}`}>
                Трейлер
              </button>

              <FavoriteBtn film={film as Movie}  ></FavoriteBtn>
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  return heroBlock;
}
