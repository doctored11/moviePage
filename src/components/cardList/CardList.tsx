import React, { useEffect, useRef, useState } from "react";
import styles from "./cardList.module.css";
import { SimpleCard } from "./card/SimpleCard";
import { getTop10 } from "../../api/filmApi";
import { Movie } from "components/hero/Hero";

export function CardList({ cardList }: { cardList: Array<Movie> }) {
  //наверное передаваить массив - для переиспользования компонента
  return (
    <>
      <ul className={styles.cardList}>
        {cardList.map((card, index) => (
          <SimpleCard movie={card} num={index + 1} />
        ))}
      </ul>{" "}
    </>
  );
}
