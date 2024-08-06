import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";
import { getProfile, loginUser, registerUser } from "../../api/authApi";
import { Logo } from "../logo/Logo";
import { VideoPlayer } from "../../components/videoPlayer/VideoPlayer";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  link:string;
  title:string;
}

export function ModalVideo({ isOpen, onClose,link,title}: ModalProps) {
  if (!isOpen) return null;
  
  const modalBlock = ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${styles.videoModalContent}`}>
        <button className={`${styles.closeButton} ${styles.closeButtonVideo}`} onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
              fill="black"
            />
          </svg>
        </button>
        <VideoPlayer link={link} title={title} key={link}></VideoPlayer>
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
  return modalBlock;
}
