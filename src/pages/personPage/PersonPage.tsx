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
          <div>
            <button onClick={() => setMode("films")}> фильмы</button>
            <button onClick={() => setMode("profile")}>аккаунт</button>
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
                  >
                    Выход
                  </a>
                </>
              )}
            </>
          )}
        </>
      </CategoryBlock>
    </>
  );
  return block;
}
