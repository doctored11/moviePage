import React, { useEffect, useState } from "react";
import styles from "./headerNavigation.module.css";
import { Link } from "react-router-dom";
import { FormSearch } from "./formSearch/FormSearch";

export function HeaderNavigation() {
  const navBlock = (
    <nav className={styles.navSection}>
      <ul className={styles.navigationUl}>
        <li className={`${styles.navItem}  ${styles.linkNavugation} `}>
          <Link to="/" className={`${styles.navLink} simpleTxt `}>
            Главная
          </Link>
        </li>
        <li className={`${styles.navItem} ${styles.linkNavugation} `}>
          <Link to="/categories" className={`${styles.navLink} simpleTxt `}>
            Жанры
          </Link>
        </li>
        <li className={`${styles.navItem} `}>
          <FormSearch></FormSearch>
        </li>
      </ul>
    </nav>
  );
  return navBlock;
}
