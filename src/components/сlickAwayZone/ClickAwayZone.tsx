import React, { useEffect, useRef, useState } from "react";
import styles from "./clickAwayZone.module.css";
import { useClickAway } from "./ClickAwayContext";


interface ClickAwayZoneProps {
  status?: boolean;
  onClick: () => void;
}

export function ClickAwayZone({ onClick, status = true }: ClickAwayZoneProps) {
  const { setIsVisible } = useClickAway();
  const queRef = useRef<(() => void)[]>([]);
  const zoneRef = useRef<HTMLDivElement>(null);

  function pushQue(newFn: () => void) {
   
    console.log('que +1')
    queRef.current.push(newFn);
  }

  function clearQue() {
   
    queRef.current = []; 
  }

  useEffect(() => {
    pushQue(onClick);
  

    function handleClickOutside(event: MouseEvent) {
      if (zoneRef.current) {
       
        queRef.current.forEach((fn) => {
          console.log("закрытие");
          fn(); 
        });
        clearQue();
        setIsVisible(false);
      }
    }

    zoneRef.current?.addEventListener("click", handleClickOutside);

    return () => {
      zoneRef.current?.removeEventListener("click", handleClickOutside);
    };
  }, [onClick]);
  return <div ref={zoneRef} className={styles.overlay} />;
}
