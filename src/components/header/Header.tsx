import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { getProfile, logoutUser } from "../../api/authApi";
import { Modal } from "../../components/modal/Modal";

export function Header() {
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

  return (
    <header className={styles.header}>
      <h1>Шляпа</h1>
      {user && <button onClick={logoutUser}>{user}</button>}
      {!user && (
        <>
          <button onClick={openModal}>Open Modal</button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2>Modal Title</h2>
            <p>This is the modal content.</p>
          </Modal>
        </>
      )}
    </header>
  );
}
