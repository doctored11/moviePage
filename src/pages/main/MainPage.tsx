import React, { useEffect, useState } from "react";
import styles from "./mainPage.module.css";

import { Hero } from "../../components/hero/Hero";
import { Header } from "../../components/header/Header";


export function MainPage() {
  return (
    <>
    
      <Header></Header>
      <Hero></Hero>
      
    </>
  );
}
