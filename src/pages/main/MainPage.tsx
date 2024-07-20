import React, { useEffect, useState } from "react";
import styles from "./mainPage.module.css";
import { getProfile, logoutUser } from "../../api/authApi";
import { Modal } from "../../components/modal/Modal";
import { getRandomMovie } from "../../api/filmApi";

interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  posterUrl: string;
  plot: string;
  runTime: number;
  tmdbRating: number;
  trailerUrl:string;
}
export function Main() {
  const [randomFilm, setRandomFilm] = useState<Movie | null>(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const film = await getRandomMovie();
        // console.log(film);
        setRandomFilm(film);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div
      className={styles.mainImage}
      style={{
        backgroundImage: randomFilm ? `url(${randomFilm.posterUrl})` : "none",
      }}
    >
      {randomFilm && (
        <>
          <h2>{randomFilm.title}</h2>
          <p>{randomFilm.plot}</p>
          <p>{randomFilm.runTime}</p>
          <p>{randomFilm.tmdbRating}</p>
          {/* ну и прочее */}
        </>
      )}
    </div>
  );
}
