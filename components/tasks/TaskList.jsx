"use client";

import PropTypes from "prop-types";
import classes from "@/styles/tasks/list.module.css";
import { Box, Button, Card, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const TaskList = ({ task, onClickView }) => {
  const [isOpenBox, setisOpenBox] = useState(false);
  const openBox = () => setisOpenBox(true);
  const closeBox = () => setisOpenBox(false);
  const { _id, title, assignedTo, finishDate, categories } = task;

  const dragStartHandler = (e) => {
    e.dataTransfer.setData("taskId", _id);
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
      className={classes.card_task_list_type}
      onDragStart={dragStartHandler}
      draggable="true"
    >
      <Typography fontWeight="bold" variant="p">
        {title}
      </Typography>
      <Box className={classes.card_task_details}>
        <Card
          className={boxClasses}
          onMouseLeave={closeBox}
          onMouseEnter={openBox}
        >
          <Button startIcon={deleteIcon} variant="outlined" color="error">
            Delete Task
          </Button>
          <Button
            startIcon={viewIcon}
            onClick={() => onClickView(_id)}
            variant="outlined"
          >
            View Task
          </Button>
        </Card>
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
          <Tooltip title={assignedTo.username} placement="top">
            <Image src={assignedTo.image} width={30} height={30} alt="img" />
          </Tooltip>
        </Box>
        <Box>
          <Typography color="textSecondary" fontWeight="bold">
            {new Date(finishDate).toDateString()}
          </Typography>
        </Box>
        <Button onMouseEnter={openBox} onMouseLeave={closeBox}>
          <Image
            src="/images/graphic/option.png"
            width={30}
            height={30}
            alt="option"
          />
        </Button>
      </Box>
    </Card>
  );
};

TaskList.propTypes = {
  task: PropTypes.object.isRequired,
  onClickView: PropTypes.func,
};

export default TaskList;
