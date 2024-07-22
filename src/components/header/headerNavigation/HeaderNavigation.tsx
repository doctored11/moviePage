import React, { useEffect, useState } from "react";
import styles from "./headerNavigation.module.css";
import { Link } from "react-router-dom";

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
          <a href="#" className={`${styles.navLink} simpleTxt `}>
            Жанры
          </a>
        </li>
        <li className={`${styles.navItem} `}>
          <form className={styles.form}>
            <input
              type="text"
              placeholder="Поиск"
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                  fill="#ffffff55"
                  
                />
              </svg>
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
  return navBlock;
}
