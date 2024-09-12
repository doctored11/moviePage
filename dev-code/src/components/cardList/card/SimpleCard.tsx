import React, { useEffect, useRef, useState } from "react";
import styles from "./card.module.css";
import { MiniInfo } from "../../miniInfo/MiniInfo";
import { Link } from "react-router-dom";

export interface SimpleCardProps {
  movie: any;
  num?: number;
}

export function SimpleCard({ movie, num }: SimpleCardProps) {
  const card = (
    <div className={styles.cardContainer}>
      <Link 
        className={styles.sCard}
        to={`/moviePage/movie/${movie.id}`}
        style={{
          backgroundImage: `url(${movie.posterUrl})`,
        }}
      >
        <div className={styles.cardDescription}>
          <h3 className={`simpleTxt ${styles.cardTitle} `}> {movie.title}</h3>
          <MiniInfo movie={movie}></MiniInfo>
        </div>
      </Link >
      {num && <p className={`${styles.cardNum} simpleTxt`}> {num}</p>}
    </div>
  );
  return card;
}
