import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ClickAwayZone } from './ClickAwayZone';


interface ClickAwayContextType {
  setIsVisible: (visible: boolean) => void;
  setHandleClose: (handleClose: () => void) => void; 
}

const ClickAwayContext = createContext<ClickAwayContextType | undefined>(undefined);

export const ClickAwayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [handleClose, setHandleClose] = useState<() => void>(() => {});

  return (
    <ClickAwayContext.Provider value={{ setIsVisible, setHandleClose }}>
      {children}
      {isVisible && <ClickAwayZone onClick={handleClose} status={isVisible}/>}
    </ClickAwayContext.Provider>
  );
};

export const useClickAway = () => {
  const context = useContext(ClickAwayContext);
  if (!context) {
    throw new Error('нет контекста');
  }
  return context;
};
