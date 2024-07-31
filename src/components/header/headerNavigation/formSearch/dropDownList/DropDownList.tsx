import React, { useEffect, useState } from "react";
import styles from "./dropDownList.module.css";
import { Movie } from "../../../../../components/hero/Hero";
import { SmallCard } from "../../../../../components/cardList/card/SmallCard";

export function DropDownList({
  movies,
  click,
}: {
  movies: Movie[];
  click: ()=>void;
}) {
  const block = (
    <div className={styles.ddRoot} onClick={click}>
      {movies.map((movie) => {
        return SmallCard({ movie });
      })}
    </div>
  );

  return block;
}
