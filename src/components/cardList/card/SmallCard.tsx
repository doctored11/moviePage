import React, { useEffect, useRef, useState } from "react";
import styles from "./card.module.css";
import { MiniInfo } from "../../miniInfo/MiniInfo";
import { Link } from "react-router-dom";
import { Movie } from "../../hero/Hero";

export interface SimpleCardProps {
  movie: Movie;
  num?: number;
}

export function SmallCard({ movie, num }: SimpleCardProps) {
  const card = (
    <div className={styles.smallCardContainer}>
      <Link className={styles.smallCard} to={`/movie/${movie.id}`}>
        <div
          className={styles.cardImg}
          style={{
            backgroundImage: `url(${movie.posterUrl})`,
          }}
        ></div>
        <div className={styles.cardLandscapeContent}>
          <h3 className={`simpleTxt ${styles.cardTitle}  ${styles.smallCardTitle}`}> {movie.title}</h3>
          <MiniInfo movie={movie}></MiniInfo>
        </div>
      </Link>
      {num && <p className={`${styles.cardNum} simpleTxt`}> {num}</p>}
    </div>
  );
  return card;
}
