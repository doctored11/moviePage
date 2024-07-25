import React, { useEffect, useState } from "react";
import styles from "./genreFilmPage.css";
import { Header } from "../../components/header/Header";
import { CategoryBlock } from "../../components/categoryBlock/CategoryBlock";
import { CardList } from "../../components/cardList/CardList";
import { getMoviesPage, getTop10 } from "../../api/filmApi";

export function GenreFilmPage() {
  const [cardList, setCardList] = useState([]);
//   todo ЖАнр из строки забрать и кнопку сделать
  useEffect(() => {
    async function fetchData() {
      const top = await getMoviesPage("comedy", 10, 1);
      console.log(top);
      setCardList(top);
    }

    fetchData();
  }, []);
  return (
    <>
      <Header></Header>

      <CategoryBlock header="Жанр Будет 😐">
        <CardList cardList={cardList}></CardList>
      </CategoryBlock>
      <footer>тут будет футер когда то</footer>
    </>
  );
}
