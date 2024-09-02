import React, { useEffect, useRef, useState } from "react";
import styles from "./clickAwayZone.module.css";
import { useClickAway } from "./ClickAwayContext";

// todo выполнять не последний аутклик а все ( сделать очередь)
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
