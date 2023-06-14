"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import TaskList from "@/components/tasks/TaskList";
import PropTypes from "prop-types";
import classes from "@/styles/tasks/list.module.css";
import { useState } from "react";
import MainModal from "../shared/MainModal";

const ListType = ({ todoTasks, workTasks, lagTasks, doneTasks }) => {
  const [statusTitle, setstatusTitle] = useState("");
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [listColumns, setListColumns] = useState([
    { id: "s1", title: "Todo", tasks: todoTasks, color: "#7638dc" },
    { id: "s2", title: "Work", tasks: workTasks, color: "#daa000" },
    { id: "s3", title: "Lag", tasks: lagTasks, color: "#ff4229" },
    { id: "s4", title: "Done", tasks: doneTasks, color: "#1cc800" },
  ]);

  const closeModal = () => setmodalIsOpen(false);
  const openModal = () => setmodalIsOpen(true);

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
      <Box className={classes.list_tasks_container}>
        {listColumns.map((li) => (
          <Box key={li.id} className={classes.list_task_status}>
            <Box className={classes.list_task_add}>
              <Typography color={li.color} variant="p" fontWeight="bold">
                {li.title}
              </Typography>
              <Button fontWeight="bold" variant="contained">
                +
              </Button>
            </Box>
            <Box className={classes.list_task_cards}>
              {li.tasks.map((task) => (
                <TaskList key={task.id} task={task} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

ListType.propTypes = {
  todoTasks: PropTypes.array.isRequired,
  workTasks: PropTypes.array.isRequired,
  lagTasks: PropTypes.array.isRequired,
  doneTasks: PropTypes.array.isRequired,
};

export default ListType;
