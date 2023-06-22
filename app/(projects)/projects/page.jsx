"use client";

import { Container, Typography } from "@mui/material";
import classes from "@/styles/projects/projects.module.css";
import ProjectCard from "@/components/projects/ProjectCard";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Projects",
  description: "A Projects for your task management app",
};

const Projects = () => {
  const { projectInputValue, userProjects, getProjectById, isLoggedIn } =
    useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, []);

  useEffect(() => {}, [userProjects]);

  return (
    <Container maxWidth="xl" className={classes.projects_container}>
      {userProjects.length === 0 ? (
        <Typography sx={{ textAlign: "center" }} variant="h4" fontWeight="bold">
          No projects yet
        </Typography>
      ) : (
        userProjects
          .filter((p) => p.name.toLowerCase().includes(projectInputValue))
          .map((pr) => (
            <ProjectCard
              key={pr._id}
              project={pr}
              getProjectById={getProjectById}
            />
          ))
      )}
    </Container>
  );
};

export default Projects;
