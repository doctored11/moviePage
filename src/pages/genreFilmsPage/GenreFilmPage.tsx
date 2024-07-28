import React, { useEffect, useState } from "react";
import styles from "./genreFilmPage.module.css";
import { Header } from "../../components/header/Header";
import { CategoryBlock } from "../../components/categoryBlock/CategoryBlock";
import { CardList } from "../../components/cardList/CardList";
import { getMoviesPage, getTop10 } from "../../api/filmApi";
import { useParams } from "react-router-dom";
import { Movie } from "../../components/hero/Hero";

export function GenreFilmPage() {
  const [cardList, setCardList] = useState<Movie[]>([]);
  const { category } = useParams<{ category: string }>();
  const [page, setPage] = useState(1);
  const FILMS_FOR_PAGE = 10;
  const [nextTop, setNextTop] = useState<Movie[]>([]);
  //   todo ЖАнр из строки забрать и кнопку сделать
  useEffect(() => {
    async function fetchData() {
      const top = await getMoviesPage(category, FILMS_FOR_PAGE, page);
      const nextTop = await getMoviesPage(category, FILMS_FOR_PAGE, page + 1);
      setNextTop(nextTop);
      console.log(top);
      setCardList(top);
    }

    fetchData();
  }, []);

  const btnBlock = (
    <div className={styles.categoryFrame}>
      <button
        className={`btn btn--active ${styles.button}`}
        id="MoreBtn"
        onClick={handleUploadButtonClick}
      >
        {" "}
        ЗАгрузить еще{" "}
      </button>
    </div>
  );
  return (
    <>
      <Header></Header>

      <CategoryBlock header={`Жанр ${category} `}>
        <>
          <CardList cardList={cardList}></CardList>
          {btnBlock}
        </>
      </CategoryBlock>

      <footer>тут будет футер когда то</footer>
    </>
  );

  async function handleUploadButtonClick() {
    console.log("Click");
    console.log(nextTop.length);
    console.log(nextTop);
    if (nextTop.length < 1) {
      const nextTop = await getMoviesPage(category, FILMS_FOR_PAGE, page + 1);
      setNextTop(nextTop);
    }
    if (nextTop.length < 1) {
      const moreBtn = document.getElementById("MoreBtn")
      moreBtn?.classList.add("d-none")
    }
    setCardList((prev) => [...prev, ...nextTop]);
    setPage((prevPage) => prevPage + 1);
    const next = await getMoviesPage(category, FILMS_FOR_PAGE, page + 2);
    setNextTop(next);
    console.log(next);
  }
}
