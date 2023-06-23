"use client";
import { createContext, useEffect, useState } from "react";
import { useFetch } from "@/hooks/Http/useFetch";
import { ClipLoader } from "react-spinners";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  let userInfo;
  if (typeof window !== "undefined") {
    userInfo = localStorage.getItem("User");
  }
  const [projectInputValue, setprojectInputValue] = useState("");
  const { data: user } = useFetch(`/api/user/${userInfo?.userId}`);
  const { data: projects } = useFetch("/api/projects/");

  useEffect(() => {}, [userInfo]);

  if (!user || !projects) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  const handleProjectInput = (e) => setprojectInputValue(e.target.value);

  const getProjectById = (id) => {
    const project = projects.find((p) => p._id === id);
    return project;
  };

  return (
    <AppContext.Provider
      value={{
        projectInputValue,
        handleProjectInput,
        getProjectById,
        user,
        projects,
        userInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
