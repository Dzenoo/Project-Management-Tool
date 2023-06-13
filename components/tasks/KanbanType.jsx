"use client";

import { Box, Button, Typography } from "@mui/material";
import TaskKanban from "@/components/tasks/TaskKanban";
import PropTypes from "prop-types";
import classes from "@/styles/tasks/kanban.module.css";

const KanbanType = ({ todoTasks, workTasks, lagTasks, doneTasks }) => {
  return (
    <Box className={classes.status_tasks_container}>
      <Box className={classes.status_task}>
        <Typography color="#7638dc" variant="p" fontWeight="bold">
          Todo
        </Typography>
        <Button fontWeight="bold" variant="outlined" fullWidth>
          +
        </Button>
        {todoTasks.map((task) => (
          <TaskKanban task={task} key={task} />
        ))}
      </Box>
      <Box className={classes.status_task}>
        <Typography color="#daa000" variant="p" fontWeight="bold">
          Work
        </Typography>
        <Button fontWeight="bold" variant="outlined" fullWidth>
          +
        </Button>
        {workTasks.map((task) => (
          <TaskKanban task={task} key={task} />
        ))}
      </Box>
      <Box className={classes.status_task}>
        <Typography color="#ff4229" variant="p" fontWeight="bold">
          Lag
        </Typography>
        <Button fontWeight="bold" variant="outlined" fullWidth>
          +
        </Button>
        {lagTasks.map((task) => (
          <TaskKanban task={task} key={task} />
        ))}
      </Box>
      <Box className={classes.status_task}>
        <Typography color="#1cc800" variant="p" fontWeight="bold">
          Done
        </Typography>
        <Button fontWeight="bold" variant="outlined" fullWidth>
          +
        </Button>
        {doneTasks.map((task) => (
          <TaskKanban task={task} key={task} />
        ))}
      </Box>
    </Box>
  );
};

KanbanType.propTypes = {
  todoTasks: PropTypes.array.isRequired,
  workTasks: PropTypes.array.isRequired,
  lagTasks: PropTypes.array.isRequired,
  doneTasks: PropTypes.array.isRequired,
};

export default KanbanType;
