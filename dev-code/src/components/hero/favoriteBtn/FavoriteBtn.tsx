import {
  deleteFavoritesFilms,
  getLocalFavoriteFilms,
  getProfile,
  setFavoritesFilms,
} from "../../../api/authApi";
import styles from "./favoriteBtn.module.css";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Movie } from "../Hero";
import { Modal } from "../../../components/modal/Modal";
import { UserContext } from "../../../components/userContext/UserContext";

export function FavoriteBtn({ film }: { film: Movie }) {
  //   const [localFavorites, setLocalFavorites] = useState([]);
  const LSFavorites = getLocalFavoriteFilms();
  const [isFilmFavorite, setIsFilmFavorite] = useState(false);
  //   setLocalFavorites(LSFavorites)

  const [isModalOpen, setModalOpen] = useState(false);
  // const [user, setUser] = useState(null);
  const value = useContext(UserContext)
  let user:any, setUser:Dispatch<SetStateAction<null>>;
  if (value) {({user,setUser} = value)};

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const us = await getProfile();
        setUser(us.name);
      } catch (error) {
        setUser(null);
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [isModalOpen]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const LSFavorites = getLocalFavoriteFilms();
    setIsFilmFavorite(
      !!LSFavorites.find((LSFilm: Movie) => LSFilm.id === film.id)
    );
  }, [film]);

  async function handleAddFavorite() {
    if (!film) return;

    await setFavoritesFilms(film.id);
    updateFavoriteStatus();
  }

  async function handleDeleteFavorite() {
    if (!film) return;
    await deleteFavoritesFilms(film.id);
    updateFavoriteStatus();
  }

  function updateFavoriteStatus() {
    const LSFavorites = getLocalFavoriteFilms();
    setIsFilmFavorite(
      !!LSFavorites.find((LSFilm: Movie) => LSFilm.id === film.id)
    );
    console.log(
      "статус кнопки ",
      !!LSFavorites.find((LSFilm: Movie) => LSFilm.id === film.id)
    );
  }

  async function handleClick() {
    console.log("profile 1 ");
    
    if (user) {
      console.log("profile  2.1", user);
      isFilmFavorite ? handleDeleteFavorite() : handleAddFavorite();
    } else {
      console.log("profile  2.2");
      openModal();
    }
  }
  const block = (
    <>
      <button
        className={`btn btnSmall ${styles.filmButton} ${
          isFilmFavorite ? styles.filmFavorite : ""
        }`}
        onClick={handleClick}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"
            fill="#B4A9FF"
          />
        </svg>
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>
    </>
  );
  return block;
}
