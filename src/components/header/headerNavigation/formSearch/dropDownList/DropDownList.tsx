import React, { useEffect, useState } from "react";
import styles from "./dropDownList.module.css";
import { Movie } from "../../../../../components/hero/Hero";
import { SmallCard } from "../../../../../components/cardList/card/SmallCard";

export function DropDownList({
  movies,
  click,
  handleToClose,
}: {
  movies: Movie[];
  click: () => void;
  handleToClose: () => void;
}) {
  const block = (
    <>
      <div className={styles.outClickBlock} onClick={handleToClose}></div>
      <div className={styles.ddRoot} onClick={click}>
        {movies.slice(0, 5).map((movie) => {
          return SmallCard({ movie });
        })}
      </div>
    </>
  );

  return block;
}
