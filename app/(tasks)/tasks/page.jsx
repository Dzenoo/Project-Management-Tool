"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import classes from "@/styles/tasks/tasks.module.css";
import {
  StatusTasksSelect,
  CategoryasksSelect,
  ProjectTasksSelect,
} from "@/data/data";
import TaskKanban from "@/components/tasks/TaskKanban";
import { tasks } from "@/data/tasks.jsonData.config.json";
import { useState } from "react";
import TaskDetailsSidebar from "@/components/tasks/details/TaskDetailsSidebar";

const CustomIcon = (imgUrl) => (
  <Image
    src={imgUrl}
    style={{ padding: "6px" }}
    width={40}
    height={40}
    alt="img"
  />
);

const Tasks = () => {
  const [taskDetailIsOpen, settaskDetailIsOpen] = useState(false);
  const [task, settask] = useState();

  const openTaskDetail = (id) => {
    const currentOpenedTask = tasks.find((task) => task.id === id);
    settask(currentOpenedTask);
    settaskDetailIsOpen(true);
  };
  const closeTaskDetail = () => settaskDetailIsOpen(false);

  return (
    <Box className={classes.tasks_container}>
      {taskDetailIsOpen && (
        <TaskDetailsSidebar task={task} onClose={closeTaskDetail} />
      )}
      <Box className={classes.tasks_top}>
        <Typography fontWeight="bold" variant="h4">
          Tasks
        </Typography>
        <TextField placeholder="Search Tasks..." label="Search" />
        <div></div>
      </Box>
      <Box className={classes.tasks_mid}>
        <div className={classes.tasks_filters}>
          <FormControl>
            <InputLabel htmlFor="status_select">Select Status</InputLabel>
            <Select
              sx={{ width: "200px" }}
              inputProps={{ id: "status_select" }}
              IconComponent={() => CustomIcon("/images/graphic/status.png")} // Use the custom icon component
              label="Select Status"
            >
              {StatusTasksSelect.map((status) => (
                <MenuItem key={status.id} value={status.name}>
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="project_select">Select Project</InputLabel>
            <Select
              inputProps={{ id: "project_select" }}
              IconComponent={() => CustomIcon("/images/graphic/layers.png")} // Use the custom icon component
              sx={{ width: "200px" }}
              label="Select Project"
            >
              {ProjectTasksSelect.map((status) => (
                <MenuItem key={status.id} value={status.name}>
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="category_select">Select Category</InputLabel>
            <Select
              inputProps={{ id: "category_select" }}
              IconComponent={() => CustomIcon("/images/graphic/clipboard.png")} // Use the custom icon component
              sx={{ width: "200px" }}
              label="Select Category"
            >
              {CategoryasksSelect.map((status) => (
                <MenuItem key={status.id} value={status.name}>
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button variant="contained">Clear Filter</Button>
        </div>
      </Box>
      <Box className={classes.tasks_cards}>
        {tasks.map((task) => (
          <TaskKanban task={task} key={task.id} onClickView={openTaskDetail} />
        ))}
      </Box>
    </Box>
  );
};

export default Tasks;
