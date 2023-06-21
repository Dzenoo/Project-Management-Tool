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
import { StatusTasksSelect, CategoryasksSelect } from "@/data/data";
import TaskKanban from "@/components/tasks/TaskKanban";
import { useContext, useState } from "react";
import TaskDetailsSidebar from "@/components/tasks/details/TaskDetailsSidebar";
import { useFetch } from "@/hooks/Http/useFetch";
import { AppContext } from "@/context/AppContext";
import { ClipLoader } from "react-spinners";

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
  const { user, userProjects } = useContext(AppContext);
  const { data: tasks } = useFetch(`/api/tasks/${user._id}`);
  const [taskDetailIsOpen, settaskDetailIsOpen] = useState(false);
  const [task, settask] = useState();
  const [taskSearch, settaskSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  if (!tasks) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  const openTaskDetail = (id) => {
    const currentOpenedTask = tasks.find((task) => task._id === id);
    settask(currentOpenedTask);
    settaskDetailIsOpen(true);
  };
  const closeTaskDetail = () => settaskDetailIsOpen(false);

  const clearFilter = () => {
    settaskSearch("");
    setStatusFilter("");
    setProjectFilter("");
    setCategoryFilter("");
  };

  return (
    <Box className={classes.tasks_container}>
      {taskDetailIsOpen && (
        <TaskDetailsSidebar task={task} onClose={closeTaskDetail} />
      )}
      <Box className={classes.tasks_top}>
        <Typography fontWeight="bold" variant="h4">
          Tasks
        </Typography>
        <TextField
          placeholder="Search Tasks..."
          label="Search"
          onChange={(e) => settaskSearch(e.target.value)}
          value={taskSearch}
        />
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
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
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
              onChange={(e) => setProjectFilter(e.target.value)}
              value={projectFilter}
            >
              {userProjects.map((status) => (
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
              onChange={(e) => setCategoryFilter(e.target.value)}
              value={categoryFilter}
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
          <Button variant="contained" onClick={clearFilter}>
            Clear Filter
          </Button>
        </div>
      </Box>
      <Box className={classes.tasks_cards}>
        {tasks
          .filter((task) => {
            const searchMatch = task.title
              .toLowerCase()
              .includes(taskSearch.toLowerCase());
            const statusMatch =
              statusFilter === "" || task.status === statusFilter;
            const projectMatch =
              projectFilter === "" || task.project.name === projectFilter;
            const categoryMatch =
              categoryFilter === "" || task.categories.includes(categoryFilter);

            return searchMatch && statusMatch && projectMatch && categoryMatch;
          })
          .map((task) => (
            <TaskKanban
              task={task}
              key={task._id}
              onClickView={openTaskDetail}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Tasks;
