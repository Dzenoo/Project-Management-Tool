"use client";

import { Container, Typography } from "@mui/material";
import classes from "@/styles/projects/projects.module.css";
import ProjectCard from "@/components/projects/ProjectCard";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const Projects = () => {
  const { projectInputValue, userProjects, getProjectById } =
    useContext(AppContext);

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
            <ProjectCard project={pr} getProjectById={getProjectById} />
          ))
      )}
    </Container>
  );
};

export default Projects;
