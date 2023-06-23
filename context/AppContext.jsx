"use client";
import { createContext, useEffect, useState } from "react";
import { useFetch } from "@/hooks/Http/useFetch";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export const AppContext = createContext();

const userInfo =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("User"))
    : null;

const userToken =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const AppProvider = ({ children }) => {
  const [projectInputValue, setprojectInputValue] = useState("");
  const { data: user } = useFetch(`/api/user/${userInfo?.userId}`);
  const { data: projects } = useFetch("/api/projects/");
  const router = useRouter();

  useEffect(() => {}, [userInfo]);

  if (!user || !projects) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  const isLoggedIn = !!userToken?.token;
  let isTeam;
  let userProjects;
  if (!userInfo) {
    router.push("/login");
  } else {
    isTeam = user.teams.length > 0;

    userProjects = user.teams.reduce((acc, team) => {
      const teamProjects = team.projects.map((project) => project);
      return [...acc, ...teamProjects];
    }, []);
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
        isTeam,
        userProjects,
        projects,
        isLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
