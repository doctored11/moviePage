import React, { useEffect, useRef, useState } from "react";
import styles from "./headerNavigation.module.css";
import { Link } from "react-router-dom";
import { FormSearch } from "./formSearch/FormSearch";
import { ClickAwayZone } from "../../../components/сlickAwayZone/ClickAwayZone";
import { useClickAway } from "../../../components/сlickAwayZone/ClickAwayContext";

// TODO
// Видимо еще useref передавать в поиск - подумать!
export function HeaderNavigation() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1080);
  const { setIsVisible, setHandleClose } = useClickAway();

  function handleSearchClick() {
    setIsSearchVisible(!isSearchVisible);
    setIsVisible(!isSearchVisible);
  }

  function handleResize() {
    setIsMobileView(window.innerWidth < 1080);
    if (window.innerWidth >= 1080) {
      setIsSearchVisible(false);
      setIsVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsVisible(isSearchVisible);
    setHandleClose(() => () => setIsSearchVisible(false));
  }, [isSearchVisible, setIsVisible, setHandleClose]);

  const navBlock = (
    <>
     

      <nav className={styles.navSection}>
        <ul className={styles.navigationUl}>
          <li className={`${styles.navItem}  ${styles.linkNavugation} `}>
            <Link
              to="/"
              className={`${styles.navLink} ${styles.mainLink} simpleTxt`}
            >
              <span className={styles.text}>Главная</span>
            </Link>
          </li>
          {!isSearchVisible && (
            <li className={`${styles.navItem} ${styles.linkNavugation} `}>
              <Link to="/categories" className={`${styles.navLink} simpleTxt`}>
                <span className={styles.icon}>
                  <svg
                    className={styles.svgIcon}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 9.5C2.51472 9.5 0.5 7.48528 0.5 5C0.5 2.51472 2.51472 0.5 5 0.5C7.48528 0.5 9.5 2.51472 9.5 5C9.5 7.48528 7.48528 9.5 5 9.5ZM5 19.5C2.51472 19.5 0.5 17.4853 0.5 15C0.5 12.5147 2.51472 10.5 5 10.5C7.48528 10.5 9.5 12.5147 9.5 15C9.5 17.4853 7.48528 19.5 5 19.5ZM15 9.5C12.5147 9.5 10.5 7.48528 10.5 5C10.5 2.51472 12.5147 0.5 15 0.5C17.4853 0.5 19.5 2.51472 19.5 5C19.5 7.48528 17.4853 9.5 15 9.5ZM15 19.5C12.5147 19.5 10.5 17.4853 10.5 15C10.5 12.5147 12.5147 10.5 15 10.5C17.4853 10.5 19.5 12.5147 19.5 15C19.5 17.4853 17.4853 19.5 15 19.5ZM5 7.5C6.38071 7.5 7.5 6.38071 7.5 5C7.5 3.61929 6.38071 2.5 5 2.5C3.61929 2.5 2.5 3.61929 2.5 5C2.5 6.38071 3.61929 7.5 5 7.5ZM5 17.5C6.38071 17.5 7.5 16.3807 7.5 15C7.5 13.6193 6.38071 12.5 5 12.5C3.61929 12.5 2.5 13.6193 2.5 15C2.5 16.3807 3.61929 17.5 5 17.5ZM15 7.5C16.3807 7.5 17.5 6.38071 17.5 5C17.5 3.61929 16.3807 2.5 15 2.5C13.6193 2.5 12.5 3.61929 12.5 5C12.5 6.38071 13.6193 7.5 15 7.5ZM15 17.5C16.3807 17.5 17.5 16.3807 17.5 15C17.5 13.6193 16.3807 12.5 15 12.5C13.6193 12.5 12.5 13.6193 12.5 15C12.5 16.3807 13.6193 17.5 15 17.5Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span className={styles.text}>Жанры</span>
              </Link>
            </li>
          )}
          {isMobileView && !isSearchVisible && (
            <li className={`${styles.navItem}`} onClick={handleSearchClick}>
              <svg
                className={styles.svgIcon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                  fill="white"
                />
              </svg>
            </li>
          )}

          {((isMobileView && isSearchVisible) || !isMobileView) && (
            <li className={`${styles.navItem} ${styles.searchItem}`}>
              <FormSearch></FormSearch>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
  return navBlock;
}
