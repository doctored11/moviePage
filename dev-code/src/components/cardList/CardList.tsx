import React, { useEffect, useRef, useState } from "react";
import styles from "./cardList.module.css";
import { SimpleCard } from "./card/SimpleCard";
import { FavoriteCard } from "./card/FavoriteCard";
import { getTop10 } from "../../api/filmApi";
import { Movie } from "components/hero/Hero";

interface CardListProps {
  cardList: Array<Movie>;
  isIterable?: boolean;
  cardType?: "simple" | "favorite";
  callback?: ()=>void ;
}

export function CardList({
  cardList,
  isIterable = false,
  cardType = "simple",
  callback,
  
}: CardListProps) {
  return (
    <ul className={styles.cardList}>
      {cardList.map((card, index) => {
        const CardComponent =
          cardType === "favorite" ? FavoriteCard : SimpleCard;
        return (
          <CardComponent
            key={card.id}
            movie={card}
            num={isIterable ? index + 1 : undefined}
            {...(callback ? { callback } : {})} 
          />
        );
      })}
    </ul>
  );
}
