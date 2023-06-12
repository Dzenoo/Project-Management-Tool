"use client";

import { Container, Typography } from "@mui/material";
import { projects } from "@/data/projects.jsonData.config.json";
import classes from "@/styles/projects/projects.module.css";
import ProjectCard from "@/components/projects/ProjectCard";

const Projects = () => {
  return (
    <Container maxWidth="xl" className={classes.projects_container}>
      {projects.map((pr) => (
        <ProjectCard project={pr} />
      ))}
    </Container>
  );
};

export default Projects;
