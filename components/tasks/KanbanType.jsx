"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import TaskKanban from "@/components/tasks/TaskKanban";
import PropTypes from "prop-types";
import classes from "@/styles/tasks/kanban.module.css";
import MainModal from "../shared/MainModal";
import AddTaskForm from "./helpers/AddTaskForm";
import AddNewColumn from "./helpers/AddNewColumn";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
import { ClipLoader } from "react-spinners";

const KanbanType = ({ openDetailsHandler, projectMb, columns }) => {
  const [isOpenTaskModal, setisOpenTaskModal] = useState(false);
  const [isOpenColumnModal, setisOpenColumnModal] = useState(false);
  const [status, setStatus] = useState("");
  const { sendPostRequest, isLoading } = useHttpPost();

  const closeAddTaskModal = () => setisOpenTaskModal(false);
  const openAddTaskModal = (statuss) => {
    setisOpenTaskModal(true);
    setStatus(statuss);
  };

  const closeColumnModal = () => setisOpenColumnModal(false);
  const openColumnModal = () => setisOpenColumnModal(true);

  const createTask = async (data) => {
    data.status = status;

    try {
      await sendPostRequest("/api/tasks/", "POST", data);
      setisOpenTaskModal(false);
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  // useEffect(() => {
  //   const storedColumns = localStorage.getItem("kanbancolumns");
  //   if (storedColumns) {
  //     setKanbanColumns(JSON.parse(storedColumns));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("kanbancolumns", JSON.stringify(kanbanColumns));
  // }, [kanbanColumns]);

  // const randomColor = () => {
  //   const colors = ["lightblue", "royalblue", "pink"];
  //   const randomNum = Math.round(Math.random() * 3);

  //   return colors[randomNum];
  // };

  // const createColumnHandler = () => {
  //   const newColumn = {
  //     id: new Date().toString(),
  //     title: statusTitle,
  //     tasks: [],
  //     color: randomColor(),
  //   };
  //   setKanbanColumns((prevColumns) => [...prevColumns, newColumn]);
  //   closeModal();
  // };

  // let isValid = statusTitle.trim().length >= 3;

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
      <MainModal
        isOpen={isOpenColumnModal}
        close={closeColumnModal}
        content={<AddNewColumn />}
        title="Create new column"
        text="You are about to add new column. Please fill input"
        showButtons={false}
      />
      <Button onClick={openColumnModal} variant="contained" sx={{ mt: 2 }}>
        Add New Column
      </Button>
      <Box className={classes.status_tasks_container}>
        {columns.map((column) => (
          <Box key={column.id} className={classes.status_task}>
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
                key={task.id}
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
