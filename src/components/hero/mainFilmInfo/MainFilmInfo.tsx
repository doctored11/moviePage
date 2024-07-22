import { Movie } from "../../../components/hero/Hero"

import React, { useEffect, useRef, useState } from "react";
import styles from "./mainFilmInfo.module.css"

export function MainFilmInfo({ movie }: { movie: Movie }) {
  return (
    <>
      {" "}
      <h2 className={styles.title}>{movie.title}</h2>
      <p className={`simpleTxt ${styles.description}  `}>{movie.plot}</p>
    </>
  );
}
