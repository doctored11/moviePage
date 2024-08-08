import React, { useEffect, useState } from "react";
import styles from "./aboutBlock.module.css";
import { Movie } from "../hero/Hero";

function isEmpty(value: any): boolean {
  if (value == null) {
    return true;
  }

  if (typeof value === "string" && value.trim() === "") {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }

  return false;
}
const infoObj: { [key: string]: string } = {
  originalTitle: "Оригинальное название",
  status: "Статус",
  production: "Продакшен",
  releaseYear: "Год выпуска",
  language: "Язык оригинала",
  languages: "Доступные языки",
  genres: "Жанр",
  budget: "Бюджет",
  awardsSummary: "Награды",
  director: "Режиссер",
  cast: "Актерский состав",
};
console.log(1, infoObj);
export function AboutBlock({ movie }: { movie: Movie }) {
  if (!movie) {
    return <div>Loading...</div>;
  }
  console.log(movie);
  const {
    awardsSummary,
    budget,
    cast,
    director,
    genres,
    language,
    languages,
    originalTitle,
    production,
    releaseYear,
    status,
  } = movie;
  const film = {
    originalTitle,
    genres,
    language,
    languages,
    budget,
    director,
    production,
    cast,
    releaseYear,
    status,
    awardsSummary,
  };
  console.log(film);
  return (
    <ul className={styles.infoList}>
      {Object.entries(film).map(([key, value]) => {
        console.log(value);
        return !isEmpty(value) ? (
          <li className={`simpleTxt ${styles.infoItem} `}>
            <div className={styles.infoSide}>
              <p className={`simpleTxt ${styles.aboutTxt} `}>
                {String(infoObj[key])}
              </p>
              <div className={styles.line}></div>{" "}
            </div>
            <p className={`simpleTxt ${styles.aboutTxt} ${styles.infoSide} `}>
              {Array.isArray(value) ? value.join(", ") : value}
            </p>
          </li>
        ) : null;
      })}
    </ul>
  );
}
