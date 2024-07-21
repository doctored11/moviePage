import React, { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";
import { SimpleCard } from "./card/SimpleCard";
import { getTop10 } from "../../api/filmApi";

// !типы
export function CardList() {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const top = await getTop10();
      console.log(top)
      setCardList(top);
    }

    fetchData();
  }, []);
  //todo на грид посадить 
  //наверное передаваить массив - для переиспользования компонента
  return (
    <div className="card-list">
      {cardList.map((card) => (
        <SimpleCard movie={card} />
      ))}
    </div>
  );
}
