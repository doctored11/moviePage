import React, { useEffect, useRef, useState } from "react";
import styles from "./cardList.module.css";
import { SimpleCard } from "./card/SimpleCard";
import { getTop10 } from "../../api/filmApi";


export function CardList() {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const top = await getTop10();
      console.log(top);
      setCardList(top);
    }

    fetchData();
  }, []);

  //наверное передаваить массив - для переиспользования компонента
  return (
    <>
      <ul className={styles.cardList}>
        {cardList.map((card, index) => (
          <SimpleCard movie={card} num={index+1} />
        ))}
      </ul>{" "}
    </>
  );
}
