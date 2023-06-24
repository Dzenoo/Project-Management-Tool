"use client";
import ProjectSidebar from "@/components/projects/ProjectSidebar";
import { Typography } from "@mui/material";

const layout = ({ children }) => {
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("User"))
      : null;

  if (!userInfo || userInfo === undefined) {
    return (
      <Typography textAlign="center" mt={2} fontWeight="bold">
        Please log in or sign up
      </Typography>
    );
  }

  return (
    <div className="main_layout">
      <ProjectSidebar />
      <div className="content">{children}</div>
    </div>
  );
};
export default layout;
