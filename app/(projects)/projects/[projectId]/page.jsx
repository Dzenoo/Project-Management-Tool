// @refresh disable

"use client";

import { tasks } from "@/data/tasks.jsonData.config.json";
import { useContext, useState } from "react";
import { Box, Button, Container, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import classes from "@/styles/projects/projects.module.css";
import ProjectTasks from "@/components/projects/details/ProjectTasks";
import ProjectDiscussion from "@/components/projects/details/ProjectDiscussion";
import ProjectFiles from "@/components/projects/details/ProjectFiles";
import TaskDetailsSidebar from "@/components/tasks/details/TaskDetailsSidebar";
import { AppContext } from "@/context/AppContext";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
import { ClipLoader } from "react-spinners";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await fetch("/api/projects");

  return projects.map((project) => ({
    slug: project._id,
  }));
}

const Project = ({ params }) => {
  const [isTypeTask, setisTypeTask] = useState("kanban");
  const [taskDetailIsOpen, settaskDetailIsOpen] = useState(false);
  const [task, settask] = useState();
  const [typeOfProjectDetail, settypeOfProjectDetail] = useState("tasks");
  const { getProjectById, user } = useContext(AppContext);
  const { sendPostRequest, isLoading } = useHttpPost();

  const projectFav = user.favoritedProjects.find(
    (favProject) => favProject.id.toString() === params.projectId
  );
  const isProjectFavorited = projectFav?.id === params.projectId;

  const project = getProjectById(params.projectId);

  const openTaskDetail = (id) => {
    const currentOpenedTask = project.tasks.find((task) => task._id === id);
    settask(currentOpenedTask);
    settaskDetailIsOpen(true);
  };
  const closeTaskDetail = () => settaskDetailIsOpen(false);

  const favoriteProjectHandler = async () => {
    try {
      await sendPostRequest(
        `/api/projects/${params.projectId}/${user._id}/favorite`,
        "POST"
      );
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  console.log(project);

  return (
    <Container maxWidth="xl" className={classes.main_project_details}>
      {taskDetailIsOpen && (
        <TaskDetailsSidebar task={task} onClose={closeTaskDetail} />
      )}
      <Box className={classes.main_topbar}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {project.name}
          </Typography>
          <Typography variant="p" color="textSecondary">
            {project.description}
          </Typography>
        </Box>
        <Box className={classes.main_actions}>
          <Button onClick={favoriteProjectHandler}>
            <Image
              src={
                isProjectFavorited
                  ? "/images/graphic/bookmarkfill.png"
                  : "/images/graphic/bookmark.png"
              }
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
          {project?.team.teamMembers.slice(0, 2).map((mb) => (
            <Tooltip title={mb.username} placement="top" key={mb}>
              <Image
                src={mb.image}
                width={60}
                height={60}
                alt={mb.username}
                className={classes.iconBtn}
              />
            </Tooltip>
          ))}
        </Box>
      </Box>
      {typeOfProjectDetail === "discussion" && <ProjectDiscussion />}
      {typeOfProjectDetail === "tasks" && (
        <ProjectTasks
          classes={classes}
          setisTypeTask={setisTypeTask}
          isTypeTask={isTypeTask}
          openDetailsHandler={openTaskDetail}
          projectMb={project}
        />
      )}
      {typeOfProjectDetail === "files" && <ProjectFiles />}
    </Container>
  );
};

export default Project;
