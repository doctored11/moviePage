import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { getProfile, logoutUser } from "../../api/authApi";
import { Modal } from "../../components/modal/Modal";
import { HeaderNavigation } from "./headerNavigation/HeaderNavigation";
import { UserBlock } from "./userBlock/UserBlock";
import { Link } from "react-router-dom";

export function Header() {
  useEffect(() => console.log("__header"), []);
  return (
    <header className={styles.header}>
      <div className={` frame ${styles.headerFrame} `}>
        <Link to = "/" className={styles.logo}>CinemaGuide</Link>
        <HeaderNavigation></HeaderNavigation>
        <UserBlock></UserBlock>{" "}
      </div>
    </header>
  );
}
