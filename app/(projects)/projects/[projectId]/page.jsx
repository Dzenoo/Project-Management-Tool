"use client";

import { useEffect, useState } from "react";
import { Box, Button, Container, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import classes from "@/styles/projects/projects.module.css";
import ProjectTasks from "@/components/projects/details/ProjectTasks";
import ProjectDiscussion from "@/components/projects/details/ProjectDiscussion";
import ProjectFiles from "@/components/projects/details/ProjectFiles";
import TaskDetailsSidebar from "@/components/tasks/details/TaskDetailsSidebar";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
import { notFound } from "next/navigation";
import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";
import { useFetch } from "@/hooks/Http/useFetch";

export async function generateStaticParams() {
  const projects = await fetch("/api/projects");

  return projects.map((project) => ({
    slug: project._id,
  }));
}

const Project = ({ params }) => {
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("User"))
      : null;

  const { data: user } = useFetch(`/api/user/${userInfo?.userId}`);
  const { data: projects } = useFetch("/api/projects/");
  const [isTypeTask, setisTypeTask] = useState(
    JSON.parse(localStorage.getItem("typeTask")),
  );
  const [taskDetailIsOpen, settaskDetailIsOpen] = useState(false);
  const [task, settask] = useState();
  const [typeOfProjectDetail, settypeOfProjectDetail] = useState("tasks");
  const { sendPostRequest, isLoading } = useHttpPost();

  useEffect(() => {
    localStorage.setItem("typeTask", JSON.stringify(isTypeTask));
  }, [isTypeTask, setisTypeTask]);

  useEffect(() => {}, [task, settask]);

  if (!projects || !user) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  const project = projects.find((p) => p._id === params.projectId);

  const projectFav = user.favoritedProjects.find(
    (favProject) => favProject.id.toString() === params.projectId,
  );
  const isProjectFavorited = projectFav?.id === params.projectId;

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
        "POST",
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
            sx={
              typeOfProjectDetail === "discussion" && {
                borderBottom: "4px solid royalblue",
              }
            }
          >
            Discussion
          </Button>
          <Button
            onClick={() => settypeOfProjectDetail("tasks")}
            sx={
              typeOfProjectDetail === "tasks" && {
                borderBottom: "4px solid royalblue",
              }
            }
          >
            Tasks
          </Button>
          <Button
            onClick={() => settypeOfProjectDetail("files")}
            sx={
              typeOfProjectDetail === "files" && {
                borderBottom: "4px solid royalblue",
              }
            }
          >
            Files
          </Button>
        </Box>
        <Box className={classes.main_tooltip}>
          {project?.team.teamMembers.slice(0, 2).map((mb) => (
            <Tooltip title={mb.username} placement="top" key={mb.username}>
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

Project.propTypes = {
  params: PropTypes.object,
};

export default Project;
