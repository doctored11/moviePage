import React, { useEffect, useState } from "react";
import styles from "./dropDownList.module.css";
import { Movie } from "../../../../hero/Hero";
import { SmallCard } from "../../../../cardList/card/SmallCard";
import { ClickAwayZone } from "../../../../../components/сlickAwayZone/ClickAwayZone";
import { useClickAway } from "../../../../../components/сlickAwayZone/ClickAwayContext";

export function DropDownList({
  movies,
  click,
  handleToClose,
}: {
  movies: Movie[];
  click: () => void;
  handleToClose: () => void;
}) {

  const { setIsVisible, setHandleClose } = useClickAway();
 

  useEffect(() => {
    setIsVisible(true);
    setHandleClose(() =>  handleToClose);
  }, [ setIsVisible, setHandleClose]);
  
  const block = (
    <>
      {/* <div className={styles.outClickBlock} onClick={handleToClose}></div> */}
      
      <div className={styles.ddRoot} onClick={click}>
        {movies.slice(0, 5).map((movie) => {
          return SmallCard({ movie });
        })}
      </div>
    </>
  );

  return block;
}
