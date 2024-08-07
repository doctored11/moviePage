import React, { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";
import { getRandomMovie } from "../../api/filmApi";
import { getFavoritesFilms, setFavoritesFilms } from "../../api/authApi";
import { MiniInfo } from "../miniInfo/MiniInfo";
import { BackImageBlock } from "./backImageBlock/BackImageBlock";
import { MainFilmInfo } from "./mainFilmInfo/MainFilmInfo";
import { Link } from "react-router-dom";
import { Movie } from "./Hero";
import { FavoriteBtn } from "./favoriteBtn/FavoriteBtn";
import { ModalVideo } from "../../components/modal/ModalVideo";

// todo заадаптировать от 900px примерно картинку в колонку

export function HeroRandom() {
  const [randomFilm, setRandomFilm] = useState<Movie | null>(null);
  const [imageWidth, setImageWidth] = useState(window.innerWidth * 0.4);
  const backRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  async function handleResetFilm() {
    const film = await getRandomMovie();
    setRandomFilm(film);
    return film;
  }
  async function handleAddFavorite() {
    if (!randomFilm) return;
    setFavoritesFilms(randomFilm.id);
    const lovrF = await getFavoritesFilms();
    console.log("любимые", lovrF);
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
    getFavoritesFilms();
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
              <button
                className={`btn btn--active   ${styles.filmButton}`}
                onClick={openModal}
              >
                Трейлер
              </button>
              <Link
                to={`/movie/${randomFilm.id}`}
                className={`btn    ${styles.filmButton}`}
              >
                О Фильме
              </Link>
              <FavoriteBtn film={randomFilm}></FavoriteBtn>
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
      {isModalOpen && (
        <ModalVideo
          isOpen={isModalOpen}
          onClose={closeModal}
          link={
            randomFilm?.trailerUrl ||
            "https://www.youtube.com/watch?v=xvFZjo5PgG0"
          }
          title={randomFilm?.title||"Фильм"}
        ></ModalVideo>
      )}
    </div>
  );

  return heroBlock;
}
export { Movie };
