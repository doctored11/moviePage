import React, { useEffect, useState } from "react";
import styles from "./userBlock.module.css";
import { getProfile, logoutUser } from "../../../api/authApi";
import { Modal } from "../../modal/Modal";

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
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [isModalOpen]);
  const usBlock = (
    <>
      {user && <button className={`simpleTxt ${styles.logBtn} `} onClick={logoutUser}>{user}</button>}
      {!user && (
        <>
          <button className={`simpleTxt ${styles.logBtn}`} onClick={openModal}>Open Modal</button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2>Modal Title</h2>
            <p>This is the modal content.</p>
          </Modal>
        </>
      )}
    </>
  );

  return usBlock
}
