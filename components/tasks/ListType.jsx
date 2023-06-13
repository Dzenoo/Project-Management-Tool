"use client";

import { Box, Button, Typography } from "@mui/material";
import TaskList from "@/components/tasks/TaskList";
import PropTypes from "prop-types";
import classes from "@/styles/tasks/list.module.css";

const ListType = ({ todoTasks, workTasks, lagTasks, doneTasks }) => {
  return (
    <Box className={classes.list_tasks_container}>
      <Box className={classes.list_task_status}>
        <Typography color="#7638dc" variant="p" fontWeight="bold">
          Todo
        </Typography>
        <Box className={classes.list_task_cards}>
          {todoTasks.map((todo) => (
            <TaskList key={todo.id} task={todo} />
          ))}
        </Box>
      </Box>
      <Box>
        <Typography color="#daa000" variant="p" fontWeight="bold">
          Work
        </Typography>
        <Box className={classes.list_task_cards}>
          {workTasks.map((work) => (
            <TaskList key={work.id} task={work} />
          ))}
        </Box>
      </Box>
      <Box>
        <Typography color="#ff4229" variant="p" fontWeight="bold">
          Lag
        </Typography>
        <Box className={classes.list_task_cards}>
          {lagTasks.map((lag) => (
            <TaskList key={lag.id} task={lag} />
          ))}
        </Box>
      </Box>
      <Box>
        <Typography color="#1cc800" variant="p" fontWeight="bold">
          Done
        </Typography>
        <Box className={classes.list_task_cards}>
          {doneTasks.map((done) => (
            <TaskList key={done.id} task={done} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

ListType.propTypes = {
  todoTasks: PropTypes.array.isRequired,
  workTasks: PropTypes.array.isRequired,
  lagTasks: PropTypes.array.isRequired,
  doneTasks: PropTypes.array.isRequired,
};

export default ListType;
