"use client";

import classes from "@/styles/tasks/kanban.module.css";

import {
  Box,
  Button,
  Card,
  CardActions,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const Task = ({ task, onClickView }) => {
  const [isOpenBox, setisOpenBox] = useState(false);
  const openBox = () => setisOpenBox(true);
  const closeBox = () => setisOpenBox(false);
  const {
    _id,
    title,
    assignedTo,
    finishDate,
    description,
    categories,
    tags,
    project,
    comments,
  } = task;

  const dragStartHandler = (e) => {
    e.dataTransfer.setData("taskId", _id);
  };

  const deleteTask = async () => {
    await fetch(`/api/tasks/${_id}`, { method: "DELETE" });
  };

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
    <Card
      className={classes.task_card}
      onDragStart={dragStartHandler}
      draggable="true"
    >
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
          <Button
            startIcon={deleteIcon}
            onClick={deleteTask}
            variant="outlined"
            color="error"
          >
            Delete Task
          </Button>
          <Button
            startIcon={viewIcon}
            variant="outlined"
            onClick={() => onClickView(_id)}
          >
            View Task
          </Button>
        </Card>
      </Box>
      <Box className={classes.task_info}>
        <Typography fontWeight="bold" variant="p">
          {title}
        </Typography>
        <Typography color="textSecondary" style={{ wordBreak: "break-word" }}>
          {description}
        </Typography>
        <Typography color="textSecondary" fontWeight="bold">
          To finish: {new Date(finishDate).toDateString()}
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
        <Tooltip title={assignedTo.username} placement="top">
          <Image
            src={assignedTo.image}
            width={40}
            height={40}
            alt={assignedTo.username}
          />
        </Tooltip>
        <Box>
          <Image
            src="/images/graphic/chat.png"
            width={30}
            height={30}
            alt="chat"
          />
          {/* {comments.length} */}
        </Box>
      </CardActions>
    </Card>
  );
};

export default Task;
