"use client";

import PropTypes from "prop-types";
import classes from "@/styles/tasks/list.module.css";
import {
  Box,
  Button,
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";

const TaskList = ({ task }) => {
  const { name, assignee, dueDate, categories } = task;

  return (
    <Card className={classes.card_task_list_type}>
      <Typography fontWeight="bold" variant="p">
        {name}
      </Typography>
      <Box className={classes.card_task_details}>
        <Button>
          <Image
            src="/images/graphic/option.png"
            width={30}
            height={30}
            alt="option"
          />
        </Button>
        <Box>
          <Tooltip title={assignee} placement="top">
            <IconButton size="large" className={classes.iconBtn}></IconButton>
          </Tooltip>
        </Box>
        <Box className={classes.card_task_categories}>
          {categories.map((ca) => (
            <Box
              className={
                (ca === "Development" && "development") ||
                (ca === "Design" && "design") ||
                (ca === "Management" && "management") ||
                (ca === "Website" && "website") ||
                "category"
              }
              key={ca}
            >
              {ca}
            </Box>
          ))}
        </Box>
        <Box>
          <Typography color="textSecondary" fontWeight="bold">
            {dueDate}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

TaskList.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskList;
