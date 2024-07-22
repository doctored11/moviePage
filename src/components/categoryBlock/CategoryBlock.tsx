import React, { useEffect, useRef, useState } from "react";
import styles from "./categoryBlock.module.css";
import { CardList } from "../../components/cardList/CardList";

interface CategoryBlockProps {
  header: string;
  children: React.ReactNode;
}

export function CategoryBlock({ header,children  }: CategoryBlockProps) {
  const block = (
    <section className={styles.categoryBlock}>
      <div className="frame">
        <div className="sectionBlock">
          <h3 className={`boldTxt  ${styles.heading} `}>{header}</h3>
          {children}
        </div>
      </div>
    </section>
  );
  return block;
}
