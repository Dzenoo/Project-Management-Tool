"use client";

import { Box, Button, Typography } from "@mui/material";
import TaskList from "@/components/tasks/TaskList";
import PropTypes from "prop-types";
import classes from "@/styles/tasks/list.module.css";
import { useState } from "react";
import MainModal from "../shared/MainModal";
import AddTaskForm from "./helpers/AddTaskForm";
import AddNewColumn from "./helpers/AddNewColumn";

const ListType = ({ columns, openDetailsHandler }) => {
  const [isOpenTaskModal, setisOpenTaskModal] = useState(false);
  const [isOpenColumnModal, setisOpenColumnModal] = useState(false);

  const closeAddTaskModal = () => setisOpenTaskModal(false);
  const openAddTaskModal = (type) => {
    setisOpenTaskModal(true);
  };

  const closeColumnModal = () => setisOpenColumnModal(false);
  const openColumnModal = () => setisOpenColumnModal(true);

  return (
    <>
      <MainModal
        isOpen={isOpenTaskModal}
        close={closeAddTaskModal}
        title="Add Task"
        text="Provide the necessary information for the new task"
        content={<AddTaskForm />}
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
      <Box className={classes.list_tasks_container}>
        {columns.map((li) => (
          <Box key={li.id} className={classes.list_task_status}>
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
                  key={task.id}
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
};
export default ListType;
