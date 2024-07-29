import React, { useEffect, useState } from "react";
import styles from "./personPage.module.css";
import { Header } from "../../components/header/Header";
import { CategoryBlock } from "../../components/categoryBlock/CategoryBlock";
import { GenreList } from "../../components/cardList/GenreList";
import { CardList } from "../../components/cardList/CardList";
import { getLocalFavoriteFilms } from "../../api/authApi";

export function PersonPage() {
  const [favoriteList, setFavoriteList] = useState([]);
  useEffect(()=>{setFavoriteList(getLocalFavoriteFilms())},[])

  const handleFavoriteUpdate = () => {
    setFavoriteList(getLocalFavoriteFilms());
  };

  const block = (
    <>
      <Header></Header>

      <CategoryBlock header="Мой аккаунт">
        <CardList cardList={favoriteList} cardType="favorite" callback ={handleFavoriteUpdate}></CardList>
      </CategoryBlock>
    </>
  );
  return block;
}
