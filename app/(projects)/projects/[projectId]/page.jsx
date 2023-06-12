"use client";

import { projects } from "@/data/projects.jsonData.config.json";
import { tasks } from "@/data/tasks.jsonData.config.json";
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
import KanbanType from "@/components/tasks/KanbanType";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

const Project = ({ params }) => {
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
          <Button>Discussion</Button>
          <Button>Tasks</Button>
          <Button>Files</Button>
        </Box>
        <Box className={classes.main_tooltip}>
          {project?.teamMembers.map((mb) => (
            <Tooltip title={mb} placement="top">
              <IconButton size="large" className={classes.iconBtn}></IconButton>
            </Tooltip>
          ))}
          <Button variant="contained" size="large">
            +
          </Button>
        </Box>
      </Box>
      <Box className={classes.main_tasks_dashboard}>
        <Box className={classes.show_actions}>
          <Button size="large">
            <Image
              src="/images/graphic/kanban.png"
              width={40}
              height={40}
              alt="img"
            />
            Kanban
          </Button>
          <Button size="large">
            <Image
              src="/images/graphic/list.png"
              width={40}
              height={40}
              alt="img"
            />
            List View
          </Button>
        </Box>
        <hr />
        <KanbanType
          classes={classes}
          workTasks={workTasks}
          doneTasks={doneTasks}
          todoTasks={todoTasks}
          lagTasks={lagTasks}
        />
      </Box>
    </Container>
  );
};

export default Project;
