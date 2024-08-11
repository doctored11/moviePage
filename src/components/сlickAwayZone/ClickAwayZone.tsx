import React, { useEffect, useRef, useState } from "react";
import styles from "./clickAwayZone.module.css";


interface ClickAwayZoneProps {
  onClick: () => void;
}

export function ClickAwayZone({ onClick }: ClickAwayZoneProps) {
  // const [isVisibleZone, setIsVisibleZone]= useState(true)
  const zoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (zoneRef.current) {
        onClick();
        // setIsVisibleZone(false)
      }
    }

    zoneRef.current?.addEventListener("click", handleClickOutside);

    return () => {
      zoneRef.current?.removeEventListener("click", handleClickOutside);
    };
  }, [onClick]);
  // if(!isVisibleZone) return
  return (
    <div ref={zoneRef} className={styles.overlay} />
  );
}
