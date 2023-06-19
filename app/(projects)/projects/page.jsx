"use client";

import { Container } from "@mui/material";
import { projects } from "@/data/projects.jsonData.config.json";
import classes from "@/styles/projects/projects.module.css";
import ProjectCard from "@/components/projects/ProjectCard";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const Projects = () => {
  const { projectInputValue, userProjects } = useContext(AppContext);

  return (
    <Container maxWidth="xl" className={classes.projects_container}>
      {userProjects
        .filter((p) => p.name.toLowerCase().includes(projectInputValue))
        .map((pr) => (
          <ProjectCard project={pr} />
        ))}
    </Container>
  );
};

export default Projects;
