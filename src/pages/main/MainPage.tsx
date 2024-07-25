import React, { useEffect, useState } from "react";
import styles from "./mainPage.module.css";

import { HeroRandom } from "../../components/hero/HeroRandom";
import { Header } from "../../components/header/Header";
import { CardList } from "../../components/cardList/CardList";
import { CategoryBlock } from "../../components/categoryBlock/CategoryBlock";
import { getTop10 } from "../../api/filmApi";

export function MainPage() {

  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const top = await getTop10();
      console.log(top);
      setCardList(top);
    }

    fetchData();
  }, []);
  return (
    <>
      <Header></Header>
      <HeroRandom></HeroRandom>

      <CategoryBlock header="топ фильмов">
        <CardList cardList={cardList}></CardList>
      </CategoryBlock>
      <footer>тут будет футер когда то</footer>
    </>
  );
}
