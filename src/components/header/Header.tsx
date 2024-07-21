import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { getProfile, logoutUser } from "../../api/authApi";
import { Modal } from "../../components/modal/Modal";
import { HeaderNavigation } from "./headerNavigation/HeaderNavigation";
import { UserBlock } from "./userBlock/UserBlock";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={` frame ${styles.headerFrame} `}>
        <a className={styles.logo}>CinemaGuide</a>
        <HeaderNavigation></HeaderNavigation>
        <UserBlock></UserBlock>{" "}
      </div>
    </header>
  );
}
