import React from "react";
import styles from "./infoBlock.module.css";
import { EvalDevToolModulePlugin } from "webpack";
interface infoProps {
  name: string;
  surname: string;
  email: string;
}

export function InfoBlock({ name, surname, email }: infoProps) {
  const block = (
    <div className={styles.infoFrame}>
      <ul className={styles.infoList}>
        <li className={styles.infoItem}>
          <div className={`${styles.icoBlock} ${styles.text}`}>{(name[0] + surname[0]).toUpperCase()}</div>
          <p className={`${styles.miniTitle} ${styles.text}`}>Имя Фамилия</p>
          <p className={`${styles.content}  simpleTxt ${styles.text} `}>
            {name + " " + surname}{" "}
          </p>
        </li>
      
        <li className={styles.infoItem}>
          <div className={`${styles.icoBlock} ${styles.text}`}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
                fill="white"
              />
            </svg>
          </div>
          <p className={`${styles.miniTitle} ${styles.text}`}>Электронная почта </p>
          <p className={`${styles.content}  simpleTxt ${styles.text} `}>
            {email}
          </p>
        </li>
      </ul>
    </div>
  );

  return block;
}
