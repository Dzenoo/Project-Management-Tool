"use client";

import { projects } from "@/data/projects.jsonData.config.json";
import { tasks } from "@/data/tasks.jsonData.config.json";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import classes from "@/styles/projects/projects.module.css";
import ProjectTasks from "@/components/projects/details/ProjectTasks";
import ProjectDiscussion from "@/components/projects/details/ProjectDiscussion";
import ProjectFiles from "@/components/projects/details/ProjectFiles";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

const Project = ({ params }) => {
  const [isTypeTask, setisTypeTask] = useState("kanban");
  const [typeOfProjectDetail, settypeOfProjectDetail] = useState("discussion");

  const project = projects.find((p) => p.id === params.projectId);

  const todoTasks = tasks.filter((task) => task.status === "To Do");
  const doneTasks = tasks.filter((task) => task.status === "Done");
  const workTasks = tasks.filter((task) => task.status === "Work");
  const lagTasks = tasks.filter((task) => task.status === "Lag");

  return (
    <Container maxWidth="xl" className={classes.main_project_details}>
      <Box className={classes.main_topbar}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {project?.name}
          </Typography>
        </Box>
        <Box>
          <Button>
            <Image
              src="/images/graphic/bookmark.png"
              width={30}
              height={30}
              alt="lg"
            />
          </Button>
          <Button>
            <Image
              src="/images/graphic/option.png"
              width={30}
              height={30}
              alt="lg"
            />
          </Button>
        </Box>
      </Box>
      <Box className={classes.main_information}>
        <Box>
          <Button
            onClick={() => settypeOfProjectDetail("discussion")}
            variant={typeOfProjectDetail === "discussion" && "contained"}
          >
            Discussion
          </Button>
          <Button
            onClick={() => settypeOfProjectDetail("tasks")}
            variant={typeOfProjectDetail === "tasks" && "contained"}
          >
            Tasks
          </Button>
          <Button
            onClick={() => settypeOfProjectDetail("files")}
            variant={typeOfProjectDetail === "files" && "contained"}
          >
            Files
          </Button>
        </Box>
        <Box className={classes.main_tooltip}>
          {project?.teamMembers.map((mb) => (
            <Tooltip title={mb} placement="top" key={mb}>
              <IconButton size="large" className={classes.iconBtn}></IconButton>
            </Tooltip>
          ))}
          <Button variant="contained" size="large">
            +
          </Button>
        </Box>
      </Box>
      {typeOfProjectDetail === "discussion" && <ProjectDiscussion />}
      {typeOfProjectDetail === "tasks" && (
        <ProjectTasks
          classes={classes}
          setisTypeTask={setisTypeTask}
          isTypeTask={isTypeTask}
          workTasks={workTasks}
          doneTasks={doneTasks}
          lagTasks={lagTasks}
          todoTasks={todoTasks}
        />
      )}
      {typeOfProjectDetail === "files" && <ProjectFiles />}
    </Container>
  );
};

export default Project;
