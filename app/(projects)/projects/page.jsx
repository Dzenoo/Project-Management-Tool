"use client";

import { Container, Typography } from "@mui/material";
import classes from "@/styles/projects/projects.module.css";
import ProjectCard from "@/components/projects/ProjectCard";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useFetch } from "@/hooks/Http/useFetch";
import { ClipLoader } from "react-spinners";

const Projects = () => {
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("User"))
      : null;

  const { data: user } = useFetch(`/api/user/${userInfo?.userId}`);
  const { data: projects } = useFetch("/api/projects/");
  const { projectInputValue } = useContext(AppContext);

  if (!user || !projects) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  const userProjects = user?.teams.reduce((acc, team) => {
    const teamProjects = team.projects.map((project) => project);
    return [...acc, ...teamProjects];
  }, []);

  const getProjectById = (id) => {
    const project = projects.find((p) => p._id === id);
    return project;
  };

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
