import React, { useEffect, useState } from "react";
import styles from "./categoryPage.module.css";
import { getGenres, getMoviesByGenry } from "../../api/filmApi";
import { GenreCard } from "../../components/cardList/card/GenreCard";
import { Movie } from "../../components/hero/Hero";
import { GenreList } from "../../components/cardList/GenreList";
import { Header } from "../../components/header/Header";
import { CategoryBlock } from "../../components/categoryBlock/CategoryBlock";
export function CategoryPage() {
 

  return (
    // <GenreList></GenreList>
    <>
      <Header></Header>
      
      <CategoryBlock header="Категории">
      <GenreList></GenreList>
      </CategoryBlock>
    </>
  );
}
