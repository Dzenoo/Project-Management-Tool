"use client";
import { createContext, useState } from "react";
import { tasks } from "@/data/tasks.jsonData.config.json";
import { useFetch } from "@/hooks/Http/useFetch";
import { ClipLoader } from "react-spinners";

export const AppContext = createContext();

const todoTasks = tasks.filter((task) => task.status === "To Do");
const doneTasks = tasks.filter((task) => task.status === "Done");
const workTasks = tasks.filter((task) => task.status === "Work");
const lagTasks = tasks.filter((task) => task.status === "Lag");

const userInfo =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("User"))
    : null;

export const AppProvider = ({ children }) => {
  const [columns, setColumns] = useState([
    { id: "s1", title: "Todo", tasks: todoTasks, color: "#7638dc" },
    { id: "s2", title: "Work", tasks: workTasks, color: "#daa000" },
    { id: "s3", title: "Lag", tasks: lagTasks, color: "#ff4229" },
    { id: "s4", title: "Done", tasks: doneTasks, color: "#1cc800" },
  ]);
  const [projectInputValue, setprojectInputValue] = useState("");
  const { data: user, error } = useFetch(`/api/user/${userInfo.userId}`);

  console.log(user);

  if (!user) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  const handleProjectInput = (e) => setprojectInputValue(e.target.value);

  return (
    <AppContext.Provider
      value={{ projectInputValue, handleProjectInput, columns, user }}
    >
      {children}
    </AppContext.Provider>
  );
};
