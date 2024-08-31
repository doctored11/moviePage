import React, { useEffect, useRef, useState } from "react";
import styles from "./clickAwayZone.module.css";
import { useClickAway } from "./ClickAwayContext";

// не до конца понимаю как я это написал месяц назад - но сейчас поправил. Осталось разобраться!
// TODO осознать и сделать универсальнееы
interface ClickAwayZoneProps {
  status?:boolean
  onClick: () => void;
}

export function ClickAwayZone({ onClick,status=true }: ClickAwayZoneProps) {
  const { setIsVisible} = useClickAway();
  const zoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (zoneRef.current) {
        onClick();
        setIsVisible(false)
      }
    }

    zoneRef.current?.addEventListener("click", handleClickOutside);

    return () => {
      zoneRef.current?.removeEventListener("click", handleClickOutside);
    };
  }, [onClick]);
  return (
    <div ref={zoneRef} className={styles.overlay} />
  );
}
