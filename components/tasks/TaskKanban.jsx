"use client";

import classes from "@/styles/tasks/kanban.module.css";

import {
  Box,
  Button,
  Card,
  CardActions,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const Task = ({ task }) => {
  const [isOpenBox, setisOpenBox] = useState(false);
  const openBox = () => setisOpenBox(true);
  const closeBox = () => setisOpenBox(false);
  const { name, assignee, dueDate, description, categories, tags, comments } =
    task;

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
    <Card className={classes.task_card}>
      <Box className={classes.task_top}>
        <Box className={classes.task_categories}>
          {categories.map((ca) => (
            <Box
              className={
                (ca === "Development" && "development") ||
                (ca === "Design" && "design") ||
                (ca === "Management" && "management") ||
                (ca === "Website" && "website") ||
                classes.task_category
              }
              key={ca}
            >
              {ca}
            </Box>
          ))}
        </Box>
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
          onMouseEnter={openBox}
          onMouseLeave={closeBox}
        >
          <Button startIcon={deleteIcon} variant="outlined" color="error">
            Delete Task
          </Button>
          <Button startIcon={viewIcon} variant="outlined">
            View Task
          </Button>
        </Card>
      </Box>
      <Box className={classes.task_info}>
        <Typography fontWeight="bold" variant="p">
          {name}
        </Typography>
        <Typography color="textSecondary">{description}</Typography>
        <Typography color="textSecondary" fontWeight="bold">
          To finish: {dueDate}
        </Typography>
        <Box className={classes.task_tags}>
          {tags.map((tag) => (
            <Typography fontWeight="bold" key={tag}>
              {"-"} {tag}
            </Typography>
          ))}
        </Box>
      </Box>
      <hr />
      <CardActions className={classes.task_actions}>
        <Tooltip title={assignee} placement="top">
          <IconButton size="large" className={classes.iconBtn}></IconButton>
        </Tooltip>
        <Box>
          <Image
            src="/images/graphic/chat.png"
            width={30}
            height={30}
            alt="chat"
          />
          {comments.length}
        </Box>
      </CardActions>
    </Card>
  );
};

export default Task;
