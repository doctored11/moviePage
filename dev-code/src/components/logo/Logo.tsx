import React, { useState } from "react";


import styles from "./logo.module.css";
import { Link } from "react-router-dom";

export function Logo({ fontSize }: { fontSize?: number }){
    return (<Link to = "/moviePage/main/" className={styles.logo} style={{ fontSize: fontSize+"px"}}>CinemaGuide</Link>)
}