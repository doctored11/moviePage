import React, { useEffect, useRef, useState } from "react";
import styles from "./miniInfo.module.css";
import { Movie } from "../../components/hero/Hero"

interface MiniInfoProps {
  movie: Movie;
}

export function MiniInfo({ movie }: MiniInfoProps) {
  // console.log(12, movie);
  return (
    <ul className={styles.stats}>
      <p className={`${styles.statisticValue} simpleTxt ${styles.accentPlate}`}>
        <svg
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.iconSimple}
        >
          <path
            d="M8.00105 12.1733L3.29875 14.8054L4.34897 9.51991L0.392578 5.86118L5.74394 5.22669L8.00105 0.333313L10.2581 5.22669L15.6095 5.86118L11.6531 9.51991L12.7033 14.8054L8.00105 12.1733Z"
            fill="white"
          />
        </svg>
        {movie.tmdbRating}
      </p>
      <p
        className={`${styles.statisticValue} simpleTxt ${styles.infoIndicator}`}
      >
        {" "}
        {movie.releaseYear}
      </p>
      <p
        className={`${styles.statisticValue} simpleTxt ${styles.infoIndicator}`}
      >
        {" "}
        {movie.genres[0]}
      </p>
      <p
        className={`${styles.statisticValue} simpleTxt ${styles.infoIndicator}`}
      >
        {movie.runtime}
      </p>
    </ul>
  );
}
