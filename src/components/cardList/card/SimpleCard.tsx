import React, { useEffect, useRef, useState } from "react";
import styles from "./card.module.css";

export function SimpleCard(movie:any) {
    // ? посмотреть не в ночь по mov.mov
  const card = (
    <a
      className={styles.sCard}
      href={`/movie/${movie.movie.id}`} 
      style={{
        backgroundImage: `url(${movie.movie.posterUrl})`,
      }}
    ></a>
  );
  return card;
}
