"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import TaskKanban from "@/components/tasks/TaskKanban";
import PropTypes from "prop-types";
import classes from "@/styles/tasks/kanban.module.css";
import MainModal from "../shared/MainModal";
import AddTaskForm from "./helpers/AddTaskForm";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
import { ClipLoader } from "react-spinners";

const KanbanType = ({ openDetailsHandler, projectMb, columns }) => {
  const [isOpenTaskModal, setisOpenTaskModal] = useState(false);
  const [status, setStatus] = useState("");
  const [hoveredBoxId, setHoveredBoxId] = useState(null);
  const { sendPostRequest, isLoading } = useHttpPost();

  const closeAddTaskModal = () => setisOpenTaskModal(false);
  const openAddTaskModal = (statuss) => {
    setisOpenTaskModal(true);
    setStatus(statuss);
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
    setHoveredBoxId(null);
  };

  const dragOverHandler = (e, column) => {
    e.preventDefault();
    setHoveredBoxId(column.id);
  };

  const dragLeaveHandler = () => {
    setHoveredBoxId(null);
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
      <Box className={classes.status_tasks_container}>
        {columns.map((column) => (
          <Box
            key={column.id}
            className={classes.status_task}
            onDrop={(e) => dropHandler(e, column.title)}
            onDragOver={(e) => dragOverHandler(e, column)}
            onDragLeave={dragLeaveHandler}
            style={{
              border: hoveredBoxId === column.id && "2px dotted royalblue",
            }}
          >
            <Typography color={column.color} variant="p" fontWeight="bold">
              {column.title}
            </Typography>
            <Button
              fontWeight="bold"
              variant="outlined"
              fullWidth
              onClick={() => openAddTaskModal(column.title)}
            >
              +
            </Button>
            {column.tasks.map((task) => (
              <TaskKanban
                task={task}
                key={task._id}
                onClickView={openDetailsHandler}
              />
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
};

KanbanType.propTypes = {
  openDetailsHandler: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
};

export default KanbanType;
