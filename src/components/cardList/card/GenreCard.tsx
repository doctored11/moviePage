import React, { useEffect, useRef, useState } from "react";
import styles from "./card.module.css";
import { MiniInfo } from "../../../components/miniInfo/MiniInfo";
import { Link } from "react-router-dom";

interface GenryCardProps {
  movie: any;
  genry:string
 
}

export function GenreCard({ movie,genry }: GenryCardProps) {
  const card = (
    <div className={styles.cardContainer}>
      <Link 
        className={styles.sCard}
        to={`/${genry}`}
        style={{
          backgroundImage: `url(${movie.posterUrl})`,
        }}
      >
        <div className={styles.cardTitleBlock}>
          <h3 className={` ${styles.cardTitle} `}> {genry}</h3>
          
        </div>
      </Link >
      
    </div>
  );
  return card;
}
