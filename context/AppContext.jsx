"use client";
import { createContext, useState } from "react";
import { useFetch } from "@/hooks/Http/useFetch";
import { ClipLoader } from "react-spinners";

export const AppContext = createContext();

const userInfo =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("User"))
    : null;

export const AppProvider = ({ children }) => {
  const [projectInputValue, setprojectInputValue] = useState("");
  const { data: user } = useFetch(`/api/user/${userInfo.userId}`);
  const { data: projects } = useFetch("/api/projects/");

  console.log(user);

  if (!user || !projects) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  const isTeam = user.teams.length > 0;

  const userProjects = user.teams.reduce((acc, team) => {
    const teamProjects = team.projects.map((project) => project);
    return [...acc, ...teamProjects];
  }, []);

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
        isTeam,
        userProjects,
        projects,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
