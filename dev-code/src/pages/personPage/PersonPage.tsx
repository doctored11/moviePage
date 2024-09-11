import React, { useEffect, useState } from "react";
import styles from "./personPage.module.css";
import { Header } from "../../components/header/Header";
import { CategoryBlock } from "../../components/categoryBlock/CategoryBlock";
import { GenreList } from "../../components/cardList/GenreList";
import { CardList } from "../../components/cardList/CardList";
import {
  getLocalFavoriteFilms,
  getProfile,
  logoutUser,
} from "../../api/authApi";
import { InfoBlock } from "./infoBlock/InfoBlock";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/footer/Footer";

interface User {
  name: string;
  surname: string;
  email: string;
}

export function PersonPage() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [mode, setMode] = useState<"films" | "profile">("films");
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setFavoriteList(getLocalFavoriteFilms());
  }, []);

  const handleFavoriteUpdate = () => {
    setFavoriteList(getLocalFavoriteFilms());
  };
  useEffect(() => {
    async function getUser() {
      const activeUser = await getProfile();
      setUser(activeUser);
    }

    getUser();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const buttons = document.querySelectorAll(`.${styles.selectBtn}`);

      buttons.forEach((button) => {
        const span = button.querySelector("span");
        if (!span) return
        if (window.innerWidth < 650) {
          span.textContent = button.getAttribute("data-short-text");
        } else {
          span.textContent = button.getAttribute("data-full-text");
        }
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const block = (
    <>
      <Header></Header>

      <CategoryBlock header="Мой аккаунт">
        <>
          <div className={styles.btnBlock}>
            <button
              onClick={() => setMode("films")}
              className={`${styles.selectBtn} simpleTxt ${
                mode == "films" ? styles.selectBtnActive : null
              }  `}
              data-full-text="Избранные фильмы"
              data-short-text="Избранное"
            >
              {" "}
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0ZM10.9339 15.6038C11.8155 15.0485 12.61 14.4955 13.3549 13.9029C16.3337 11.533 18 8.9435 18 6C18 3.64076 16.463 2 14.5 2C13.4241 2 12.2593 2.56911 11.4142 3.41421L10 4.82843L8.5858 3.41421C7.74068 2.56911 6.5759 2 5.5 2C3.55906 2 2 3.6565 2 6C2 8.9435 3.66627 11.533 6.64514 13.9029C7.39 14.4955 8.1845 15.0485 9.0661 15.6038C9.3646 15.7919 9.6611 15.9729 10 16.1752C10.3389 15.9729 10.6354 15.7919 10.9339 15.6038Z"
                  fill="white"
                />
              </svg>
              <span>Избранные фильмы</span>
            </button>
            <button
              onClick={() => setMode("profile")}
              className={`${styles.selectBtn} simpleTxt ${
                mode == "profile" ? styles.selectBtnActive : null
              }  `}
              data-full-text="Настройки аккаунта"
              data-short-text="Настройки"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                  fill="white"
                />
              </svg>
              <span>Настройки аккаунта</span>
            </button>
          </div>
          {mode == "films" && (
            <CardList
              cardList={favoriteList}
              cardType="favorite"
              callback={handleFavoriteUpdate}
            ></CardList>
          )}
          {mode == "profile" && (
            <>
              {user && (
                <>
                  <InfoBlock
                    name={user.name}
                    surname={user.surname}
                    email={user.email}
                  ></InfoBlock>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    className={`btn btn--active ${styles.outBtn}`}
                  >
                    Выход
                  </a>
                </>
              )}
            </>
          )}
        </>
      </CategoryBlock>
      <Footer></Footer>
    </>
  );
  return block;
}
