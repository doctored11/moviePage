import React, { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./backImageBlock.module.css";
import { Movie } from "../../../components/hero/Hero"

interface BackImageBlockProps {
  film: Movie;
  
}

export const BackImageBlock = forwardRef<HTMLDivElement, BackImageBlockProps>(({ film }, ref) => (
    <div
      className={styles.back}
      ref={ref}
      style={{
        backgroundImage: film ? `url(${film.posterUrl})` : 'none',
      }}
    >
      <div className={styles.gradient}></div>
    </div>
  ));
  

