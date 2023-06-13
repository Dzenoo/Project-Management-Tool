"use client";

import { Box, Button, Typography } from "@mui/material";
import TaskList from "@/components/tasks/TaskList";
import PropTypes from "prop-types";
import classes from "@/styles/tasks/list.module.css";

const ListType = ({ todoTasks, workTasks, lagTasks, doneTasks }) => {
  return (
    <Box className={classes.list_tasks_container}>
      <Box className={classes.list_task_status}>
        <Box className={classes.list_task_add}>
          <Typography color="#7638dc" variant="p" fontWeight="bold">
            Todo
          </Typography>
          <Button fontWeight="bold" variant="contained">
            +
          </Button>
        </Box>
        <Box className={classes.list_task_cards}>
          {todoTasks.map((todo) => (
            <TaskList key={todo.id} task={todo} />
          ))}
        </Box>
      </Box>
      <Box className={classes.list_task_status}>
        <Box className={classes.list_task_add}>
          <Typography color="#7638dc" variant="p" fontWeight="bold">
            Work
          </Typography>
          <Button fontWeight="bold" variant="contained">
            +
          </Button>
        </Box>
        <Box className={classes.list_task_cards}>
          {workTasks.map((work) => (
            <TaskList key={work.id} task={work} />
          ))}
        </Box>
      </Box>
      <Box className={classes.list_task_status}>
        <Box className={classes.list_task_add}>
          <Typography color="#7638dc" variant="p" fontWeight="bold">
            Lag
          </Typography>
          <Button fontWeight="bold" variant="contained">
            +
          </Button>
        </Box>
        <Box className={classes.list_task_cards}>
          {lagTasks.map((lag) => (
            <TaskList key={lag.id} task={lag} />
          ))}
        </Box>
      </Box>
      <Box className={classes.list_task_status}>
        <Box className={classes.list_task_add}>
          <Typography color="#7638dc" variant="p" fontWeight="bold">
            Done
          </Typography>
          <Button fontWeight="bold" variant="contained">
            +
          </Button>
        </Box>
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
