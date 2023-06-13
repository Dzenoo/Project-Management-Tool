"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import TaskKanban from "@/components/tasks/TaskKanban";
import PropTypes from "prop-types";
import classes from "@/styles/tasks/kanban.module.css";
import { useState } from "react";
import MainModal from "../shared/MainModal";

const KanbanType = ({ todoTasks, workTasks, lagTasks, doneTasks }) => {
  const [statusTitle, setstatusTitle] = useState("");
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [kanbanColumns, setKanbanColumns] = useState([
    { id: "s1", title: "Todo", tasks: todoTasks, color: "#7638dc" },
    { id: "s2", title: "Work", tasks: workTasks, color: "#daa000" },
    { id: "s3", title: "Lag", tasks: lagTasks, color: "#ff4229" },
    { id: "s4", title: "Done", tasks: doneTasks, color: "#1cc800" },
  ]);

  const closeModal = () => setmodalIsOpen(false);
  const openModal = () => setmodalIsOpen(true);

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
  const AddNewColumnForm = (
    <Box>
      <TextField
        onChange={(e) => setstatusTitle(e.target.value)}
        placeholder="Enter Status"
        label="Status Name"
        fullWidth
      />
    </Box>
  );

  return (
    <>
      <MainModal
        isOpen={modalIsOpen}
        close={closeModal}
        content={AddNewColumnForm}
        title="Create new column"
        text="You are about to add new column. Please fill input"
      />
      <Button onClick={openModal} variant="contained" sx={{ mt: 2 }}>
        Add New Column
      </Button>
      <Box className={classes.status_tasks_container}>
        {kanbanColumns.map((column) => (
          <Box key={column.id} className={classes.status_task}>
            <Typography color={column.color} variant="p" fontWeight="bold">
              {column.title}
            </Typography>
            <Button fontWeight="bold" variant="outlined" fullWidth>
              +
            </Button>
            {column.tasks.map((task) => (
              <TaskKanban task={task} key={task} />
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
};

KanbanType.propTypes = {
  todoTasks: PropTypes.array.isRequired,
  workTasks: PropTypes.array.isRequired,
  lagTasks: PropTypes.array.isRequired,
  doneTasks: PropTypes.array.isRequired,
};

export default KanbanType;
