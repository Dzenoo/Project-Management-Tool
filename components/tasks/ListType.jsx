"use client";

import { Box, Button, Typography } from "@mui/material";
import TaskList from "@/components/tasks/TaskList";
import PropTypes from "prop-types";
import classes from "@/styles/tasks/list.module.css";
import { useState } from "react";
import MainModal from "../shared/MainModal";
import AddTaskForm from "./helpers/AddTaskForm";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
import { ClipLoader } from "react-spinners";

const ListType = ({ columns, projectMb, openDetailsHandler }) => {
  const [isOpenTaskModal, setisOpenTaskModal] = useState(false);
  const [status, setStatus] = useState("");
  const { sendPostRequest, isLoading } = useHttpPost();

  const closeAddTaskModal = () => setisOpenTaskModal(false);
  const openAddTaskModal = (type) => {
    setisOpenTaskModal(true);
    setStatus(type);
  };

  const createTask = async (data) => {
    data.status = status;

    try {
      await sendPostRequest("/api/tasks/", "POST", data);
      setisOpenTaskModal(false);
    } catch (error) {}
  };

  const dropHandler = async (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    const data = {
      status,
      taskId,
    };

    await sendPostRequest("/api/tasks/update", "POST", data);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  return (
    <>
      <MainModal
        isOpen={isOpenTaskModal}
        close={closeAddTaskModal}
        title="Add Task"
        text="Provide the necessary information for the new task"
        content={<AddTaskForm projectMb={projectMb} createTask={createTask} />}
        showButtons={false}
      />
      <Box className={classes.list_tasks_container}>
        {columns.map((li) => (
          <Box
            key={li.id}
            className={classes.list_task_status}
            onDrop={(e) => dropHandler(e, li.title)}
            onDragOver={dragOverHandler}
          >
            <Box className={classes.list_task_add}>
              <Typography color={li.color} variant="p" fontWeight="bold">
                {li.title}
              </Typography>
              <Button
                fontWeight="bold"
                variant="contained"
                onClick={() => openAddTaskModal(li.title)}
              >
                +
              </Button>
            </Box>
            <Box className={classes.list_task_cards}>
              {li.tasks.map((task) => (
                <TaskList
                  key={task._id}
                  task={task}
                  onClickView={openDetailsHandler}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

ListType.propTypes = {
  openDetailsHandler: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  projectMb: PropTypes.array,
};
export default ListType;
