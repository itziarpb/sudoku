import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [showGame, setShowGame] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  return (
    <GlobalContext.Provider value={{ showGame, setShowGame, totalSeconds, setTotalSeconds }}>
      {children}
    </GlobalContext.Provider>
  );
};