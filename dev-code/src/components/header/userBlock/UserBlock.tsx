import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import styles from "./userBlock.module.css";
import { getProfile, logoutUser } from "../../../api/authApi";
import { Modal } from "../../modal/Modal";
import { Link } from "react-router-dom";
import {UserContext, UserContextType } from "../../userContext/UserContext";

export function UserBlock() {
  

  // const [user, setUser] = useState(null);
  const value = useContext(UserContext)
  let user, setUser:Dispatch<SetStateAction<null>>;
  if (value) {({user,setUser} = value)};


  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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

  const usBlock = (
    <>
      {user && (
        <>
          <Link
            to="/moviePage/person"
            className={`simpleTxt ${styles.logBtn} ${styles.linkNavigation} ${styles.desktop}`}
          >
            {user}
          </Link>
          <Link
            to="/moviePage/person"
            className={`simpleTxt ${styles.logBtn} ${styles.linkNavigation}  ${styles.mobile}`}
          >
            <svg
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 21C0 16.5817 3.58172 13 8 13C12.4183 13 16 16.5817 16 21H14C14 17.6863 11.3137 15 8 15C4.68629 15 2 17.6863 2 21H0ZM8 12C4.685 12 2 9.315 2 6C2 2.685 4.685 0 8 0C11.315 0 14 2.685 14 6C14 9.315 11.315 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10Z"
                fill="white"
              />
            </svg>
          </Link>
        </>
      )}
      {!user && (
        <>
          <button
            className={`simpleTxt ${styles.logBtn} ${styles.linkNavigation} ${styles.desktop}`}
            onClick={openModal}
          >
            Войти
          </button>
          <button
            className={`simpleTxt ${styles.logBtn} ${styles.linkNavigation}  ${styles.mobile}`}
            onClick={openModal}
          >
            <svg
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 21C0 16.5817 3.58172 13 8 13C12.4183 13 16 16.5817 16 21H14C14 17.6863 11.3137 15 8 15C4.68629 15 2 17.6863 2 21H0ZM8 12C4.685 12 2 9.315 2 6C2 2.685 4.685 0 8 0C11.315 0 14 2.685 14 6C14 9.315 11.315 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10Z"
                fill="white"
              />
            </svg>
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>
        </>
      )}
    </>
  );

  return usBlock;
}
