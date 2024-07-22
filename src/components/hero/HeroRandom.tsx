import React, { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";
import { getRandomMovie } from "../../api/filmApi";
import { getFavoritesFilms, setFavoritesFilms } from "../../api/authApi";
import { MiniInfo } from "../miniInfo/MiniInfo";
import { BackImageBlock } from "./backImageBlock/BackImageBlock";
import { MainFilmInfo } from "./mainFilmInfo/MainFilmInfo";
import { Link } from "react-router-dom";
import { Movie } from "./Hero";



export function HeroRandom() {
  const [randomFilm, setRandomFilm] = useState<Movie | null>(null);
  const [imageWidth, setImageWidth] = useState(window.innerWidth * 0.4);
  const backRef = useRef<HTMLDivElement>(null);

  async function handleResetFilm() {
    const film = await getRandomMovie();
    setRandomFilm(film);
    return film;
  }
  async function handleAddFavorite() {
    if (!randomFilm) return;
    setFavoritesFilms(randomFilm.id);
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const film = await handleResetFilm();

        if (film.posterUrl) {
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
      <BackImageBlock ref={backRef} film={randomFilm as Movie}></BackImageBlock>
      <div className="frame">
        {randomFilm && (
          <div className={styles.content}>
            <MiniInfo movie={randomFilm}></MiniInfo>
            <MainFilmInfo movie={randomFilm}></MainFilmInfo>

            <ul className={styles.btnBlock}>
              <button className={`btn btn--active   ${styles.filmButton}`}>
                Трейлер
              </button>
              <Link
                to={`/movie/${randomFilm.id}`}
                className={`btn    ${styles.filmButton}`}
              >
                О Фильме
              </Link>
              <button
                className={`btn  btnSmall  ${styles.filmButton}`}
                onClick={handleAddFavorite}
              >
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0ZM10.9339 15.6038C11.8155 15.0485 12.61 14.4955 13.3549 13.9029C16.3337 11.533 18 8.9435 18 6C18 3.64076 16.463 2 14.5 2C13.4241 2 12.2593 2.56911 11.4142 3.41421L10 4.82843L8.5858 3.41421C7.74068 2.56911 6.5759 2 5.5 2C3.55906 2 2 3.6565 2 6C2 8.9435 3.66627 11.533 6.64514 13.9029C7.39 14.4955 8.1845 15.0485 9.0661 15.6038C9.3646 15.7919 9.6611 15.9729 10 16.1752C10.3389 15.9729 10.6354 15.7919 10.9339 15.6038Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button
                className={`btn btnSmall  ${styles.filmButton}`}
                onClick={handleResetFilm}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2C12.7486 2 15.1749 3.38626 16.6156 5.5H14V7.5H20V1.5H18V3.99936C16.1762 1.57166 13.2724 0 10 0C4.47715 0 0 4.47715 0 10H2C2 5.58172 5.58172 2 10 2ZM18 10C18 14.4183 14.4183 18 10 18C7.25144 18 4.82508 16.6137 3.38443 14.5H6V12.5H0V18.5H2V16.0006C3.82381 18.4283 6.72764 20 10 20C15.5228 20 20 15.5228 20 10H18Z"
                    fill="white"
                  />
                </svg>
              </button>
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  return heroBlock;
}
export { Movie };

