import React, { useEffect, useState } from "react";
import styles from "./userBlock.module.css";
import { getProfile, logoutUser } from "../../../api/authApi";
import { Modal } from "../../modal/Modal";
import { Link } from "react-router-dom";

export function UserBlock() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const us = await getProfile();
        setUser(us.name);
      } catch (error) {
        setUser(null)
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [isModalOpen]);



  const usBlock = (
    <>
      {user && (
        <Link to="/person" className={`simpleTxt ${styles.logBtn} ${styles.linkNavigation} `}>
          {user}
        </Link>
      )}
      {!user && (
        <>
          <button className={`simpleTxt ${styles.logBtn} ${styles.linkNavigation} `} onClick={openModal}>
            Войти
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>
        </>
      )}
    </>
  );

  return usBlock;
}
