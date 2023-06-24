"use client";
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [projectInputValue, setprojectInputValue] = useState("");

  const handleProjectInput = (e) => setprojectInputValue(e.target.value);

  return (
    <AppContext.Provider
      value={{
        projectInputValue,
        handleProjectInput,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
