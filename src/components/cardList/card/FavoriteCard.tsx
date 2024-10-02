import React, { useEffect, useRef, useState } from "react";
import styles from "./card.module.css";
import { MiniInfo } from "../../miniInfo/MiniInfo";
import { Link } from "react-router-dom";
import { SimpleCard, SimpleCardProps } from "./SimpleCard";
import { deleteFavoritesFilms } from "../../../api/authApi";

function handleOnDelete(id: number, callback?: Function) {
  deleteFavoritesFilms(id).then(() => {
    if (callback) callback();
  });
}

interface FavoriteCardProps extends SimpleCardProps {
  callback?: () => void;
}
export function FavoriteCard({ movie, num, callback }: FavoriteCardProps) {
  const card = (
    <div className={styles.favCardContainer}>
      <button
        className={styles.deleteButton}
        onClick={() => {
          handleOnDelete(movie.id, callback);
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
            fill="black"
          />
        </svg>
      </button>
      <SimpleCard movie={movie} num={num}></SimpleCard>
    </div>
  );
  return card;
}
