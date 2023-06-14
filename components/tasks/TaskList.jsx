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
import { useState } from "react";

const TaskList = ({ task }) => {
  const [isOpenBox, setisOpenBox] = useState(false);
  const openBox = () => setisOpenBox(true);
  const closeBox = () => setisOpenBox(false);
  const { name, assignee, dueDate, categories } = task;

  const boxClasses = isOpenBox
    ? `${classes.open_details_box} ${classes.openBox}`
    : `${classes.open_details_box}`;

  const deleteIcon = (
    <Image
      src="/images/graphic/x-mark.png"
      width={30}
      height={30}
      alt="delete"
    />
  );

  const viewIcon = (
    <Image
      src="/images/graphic/list-search.png"
      width={30}
      height={30}
      alt="view"
    />
  );

  return (
    <Card className={classes.card_task_list_type}>
      <Typography fontWeight="bold" variant="p">
        {name}
      </Typography>
      <Box className={classes.card_task_details}>
        <Button onMouseEnter={openBox} onMouseLeave={closeBox}>
          <Image
            src="/images/graphic/option.png"
            width={30}
            height={30}
            alt="option"
          />
        </Button>
        <Card
          className={boxClasses}
          onMouseLeave={closeBox}
          onMouseEnter={openBox}
        >
          <Button startIcon={deleteIcon} variant="outlined" color="error">
            Delete Task
          </Button>
          <Button startIcon={viewIcon} variant="outlined">
            View Task
          </Button>
        </Card>
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
