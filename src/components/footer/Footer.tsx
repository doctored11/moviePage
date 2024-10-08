import React from "react";
import styles from "./footer.module.css";

export function Footer() {
  const block = (
    <footer className={styles.footerSection}>
      <div className={`frame  ${styles.footerFrame} `}>
        <div className={styles.contentPart}>
          <h3 className={` ${styles.description} ${styles.accentDescription}`}>
            LLC «Мультимедиа Визион»
          </h3>
          <p className={` ${styles.description} ${styles.descriptionSmall} `}>
            <span className={styles.cLog}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2877 9.42773C15.413 7.97351 13.8195 7 12 7C9.23999 7 7 9.23999 7 12C7 14.76 9.23999 17 12 17C13.8195 17 15.413 16.0265 16.2877 14.5723L14.5729 13.5442C14.0483 14.4166 13.0927 15 12 15C10.3425 15 9 13.6575 9 12C9 10.3425 10.3425 9 12 9C13.093 9 14.0491 9.58386 14.5735 10.4568L16.2877 9.42773ZM22 12C22 6.47998 17.52 2 12 2C6.47998 2 2 6.47998 2 12C2 17.52 6.47998 22 12 22C17.52 22 22 17.52 22 12ZM4 12C4 7.57996 7.57996 4 12 4C16.42 4 20 7.57996 20 12C20 16.42 16.42 20 12 20C7.57996 20 4 16.42 4 12Z"
                  fill="white"
                  fillOpacity="0.7"
                />
              </svg>
            </span>
            Все права защищены
          </p>
        </div>
        <ul className={styles.socialPart}>
          <a className={styles.socialItem} href="#">
            <svg
              width="19"
              height="11"
              viewBox="0 0 19 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.4875 1.37968C18.6262 0.985106 18.4875 0.698125 17.8729 0.698125H15.8308C15.3153 0.698125 15.0774 0.949207 14.9387 1.21829C14.9387 1.21829 13.8879 3.51408 12.4207 5.00273C11.9449 5.4332 11.7268 5.57669 11.4691 5.57669C11.3303 5.57669 11.1519 5.4332 11.1519 5.03862V1.36173C11.1519 0.895411 10.9933 0.680176 10.5571 0.680176H7.34533C7.02811 0.680176 6.82988 0.895411 6.82988 1.11065C6.82988 1.55907 7.56341 1.66666 7.64271 2.92217V5.64843C7.64271 6.24034 7.52379 6.34793 7.26603 6.34793C6.57213 6.34793 4.88694 4.03419 3.87581 1.39763C3.67752 0.877462 3.47929 0.680176 2.96384 0.680176H0.901906C0.307142 0.680176 0.208008 0.93131 0.208008 1.20034C0.208008 1.68461 0.901906 4.12389 3.43961 7.35236C5.12485 9.55846 7.52379 10.7422 9.6848 10.7422C10.9933 10.7422 11.1519 10.4732 11.1519 10.0248V8.3568C11.1519 7.81868 11.2708 7.72904 11.6872 7.72904C11.9846 7.72904 12.5199 7.87248 13.7292 8.9307C15.117 10.1862 15.355 10.7602 16.1282 10.7602H18.1703C18.765 10.7602 19.0426 10.4911 18.884 9.97098C18.7056 9.45087 18.0315 8.69757 17.1591 7.80073C16.6833 7.29857 15.9696 6.74256 15.7515 6.47347C15.4541 6.1148 15.5334 5.97131 15.7515 5.64843C15.7317 5.64843 18.2297 2.45585 18.4875 1.37968Z"
                fill="white"
                fillOpacity="0.8"
              />
            </svg>
          </a>
          <a className={styles.socialItem} href="#">
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.0008 1.04957C14.6617 1.23093 15.1822 1.7653 15.3588 2.4439C15.6798 3.67379 15.6798 6.23997 15.6798 6.23997C15.6798 6.23997 15.6798 8.80606 15.3588 10.036C15.1822 10.7146 14.6617 11.249 14.0008 11.4305C12.8031 11.76 7.99982 11.76 7.99982 11.76C7.99982 11.76 3.1966 11.76 1.99878 11.4305C1.33786 11.249 0.817366 10.7146 0.640726 10.036C0.319824 8.80606 0.319824 6.23997 0.319824 6.23997C0.319824 6.23997 0.319824 3.67379 0.640726 2.4439C0.817366 1.7653 1.33786 1.23093 1.99878 1.04957C3.1966 0.719971 7.99982 0.719971 7.99982 0.719971C7.99982 0.719971 12.8031 0.719971 14.0008 1.04957ZM6.55979 4.0802V8.88021L10.3998 6.4803L6.55979 4.0802Z"
                fill="white"
                fillOpacity="0.8"
              />
            </svg>
          </a>
          <a className={styles.socialItem} href="#">
            <svg
              width="12"
              height="19"
              viewBox="0 0 12 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.91902 13.2622L10.5725 15.8238C11.116 16.3474 11.116 17.1978 10.5725 17.722C10.0294 18.2462 9.14932 18.2462 8.60687 17.722L5.99801 15.2048L3.39142 17.722C3.11963 17.9838 2.76349 18.1149 2.40735 18.1149C2.05178 18.1149 1.69621 17.9838 1.42441 17.722C0.881398 17.1978 0.881398 16.348 1.42385 15.8238L4.07758 13.2622C3.1114 13.0497 2.17958 12.6802 1.32132 12.1604C0.671803 11.7651 0.476693 10.9369 0.885942 10.3094C1.29406 9.68105 2.15232 9.49189 2.80297 9.8872C4.74612 11.0671 7.24933 11.0674 9.19362 9.8872C9.84428 9.49189 10.7023 9.68105 11.1112 10.3094C11.5205 10.9364 11.3248 11.7651 10.6753 12.1604C9.81701 12.6807 8.8852 13.0497 7.91902 13.2622Z"
                fill="white"
                fillOpacity="0.8"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.24023 4.94193C1.24023 7.46791 3.36913 9.52263 5.98679 9.52263C8.60502 9.52263 10.7333 7.46791 10.7333 4.94193C10.7333 2.41513 8.60502 0.359863 5.98679 0.359863C3.36913 0.359863 1.24023 2.41513 1.24023 4.94193ZM7.95202 4.94145C7.95202 3.89531 7.07048 3.04463 5.98672 3.04463C4.90381 3.04463 4.02141 3.89531 4.02141 4.94145C4.02141 5.98676 4.90381 6.83799 5.98672 6.83799C7.07048 6.83799 7.95202 5.98676 7.95202 4.94145Z"
                fill="white"
                fillOpacity="0.8"
              />
            </svg>
          </a>
          <a className={styles.socialItem} href="#">
            <svg
              width="17"
              height="15"
              viewBox="0 0 17 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.600573 6.85877C2.28392 5.93153 4.163 5.15765 5.91872 4.37981C8.93924 3.10577 11.9718 1.85381 15.0349 0.688246C15.6309 0.489646 16.7017 0.295426 16.8067 1.17863C16.7492 2.42879 16.5127 3.67163 16.3504 4.91447C15.9387 7.64759 15.4627 10.3713 14.9986 13.0955C14.8387 14.0028 13.702 14.4726 12.9747 13.8919C11.2268 12.7112 9.46544 11.5421 7.73984 10.334C7.17458 9.75965 7.69874 8.93483 8.20358 8.52467C9.64322 7.10591 11.17 5.90051 12.5344 4.40843C12.9024 3.51965 11.815 4.26869 11.4563 4.49819C9.48542 5.85635 7.56278 7.29743 5.48486 8.49107C4.42346 9.07535 3.18638 8.57603 2.12546 8.24999C1.17421 7.85615 -0.219723 7.45937 0.600477 6.85883L0.600573 6.85877Z"
                fill="white"
                fillOpacity="0.8"
              />
            </svg>
          </a>
        </ul>
      </div>
    </footer>
  );
  return block;
}
