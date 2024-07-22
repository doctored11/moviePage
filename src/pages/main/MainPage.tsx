import React, { useEffect, useState } from "react";
import styles from "./mainPage.module.css";

import { HeroRandom } from "../../components/hero/HeroRandom";
import { Header } from "../../components/header/Header";
import { CardList } from "../../components/cardList/CardList";
import { CategoryBlock } from "../../components/categoryBlock/CategoryBlock";

export function MainPage() {
  return (
    <>
      <Header></Header>
      <HeroRandom></HeroRandom>

      <CategoryBlock header="топ фильмов">
        <CardList></CardList>
      </CategoryBlock>
      <footer>тут будет футер когда то</footer>
    </>
  );
}
