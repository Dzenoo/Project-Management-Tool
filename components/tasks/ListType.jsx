"use client";

import { Box, Button, Typography } from "@mui/material";
import TaskList from "@/components/tasks/TaskList";
import PropTypes from "prop-types";
import classes from "@/styles/tasks/list.module.css";
import { useState } from "react";

const ListType = ({ todoTasks, workTasks, lagTasks, doneTasks }) => {
  const [listColumns, setListColumns] = useState([
    { id: "s1", title: "Todo", tasks: todoTasks, color: "#7638dc" },
    { id: "s2", title: "Work", tasks: workTasks, color: "#daa000" },
    { id: "s3", title: "Lag", tasks: lagTasks, color: "#ff4229" },
    { id: "s4", title: "Done", tasks: doneTasks, color: "#1cc800" },
  ]);

  return (
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
            {li.tasks.map((todo) => (
              <TaskList key={todo.id} task={todo} />
            ))}
          </Box>
        </Box>
      ))}
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
