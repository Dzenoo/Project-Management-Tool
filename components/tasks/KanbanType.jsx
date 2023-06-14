"use client";

import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import TaskKanban from "@/components/tasks/TaskKanban";
import PropTypes from "prop-types";
import classes from "@/styles/tasks/kanban.module.css";
import { useState } from "react";
import MainModal from "../shared/MainModal";
import { useValidation } from "@/hooks/Auth/useValidation";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "@/utils/validators";

const KanbanType = ({
  todoTasks,
  workTasks,
  lagTasks,
  doneTasks,
  openDetailsHandler,
}) => {
  const [kanbanColumns, setKanbanColumns] = useState([
    { id: "s1", title: "Todo", tasks: todoTasks, color: "#7638dc" },
    { id: "s2", title: "Work", tasks: workTasks, color: "#daa000" },
    { id: "s3", title: "Lag", tasks: lagTasks, color: "#ff4229" },
    { id: "s4", title: "Done", tasks: doneTasks, color: "#1cc800" },
  ]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [isOpenTaskModal, setisOpenTaskModal] = useState(false);
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  const closeModal = () => setmodalIsOpen(false);
  const openModal = () => setmodalIsOpen(true);

  const closeAddTaskModal = () => setisOpenTaskModal(false);
  const openAddTaskModal = () => setisOpenTaskModal(true);

  const title = useValidation([VALIDATOR_MINLENGTH(3)]);
  const description = useValidation([VALIDATOR_MINLENGTH(20)]);
  const date = useValidation([VALIDATOR_REQUIRE()]);
  const category = useValidation([VALIDATOR_REQUIRE()]);
  const tag = useValidation([VALIDATOR_REQUIRE()]);
  const status = useValidation([VALIDATOR_REQUIRE()]);

  const handleCategoryInput = (event) => {
    if (event.key === "Enter") {
      if (categories.length === 2) {
        alert("Max 2 categories");
      } else {
        setCategories([...categories, category.value]);
        category.onChangeInputHandler({ target: { value: "" } });
      }
    }
  };

  const removeCategoryInput = (category) => {
    const categoriesNew = categories.filter((c) => c !== category);
    setCategories(categoriesNew);
  };

  const handleTagInput = (event) => {
    if (event.key === "Enter") {
      if (tags.length === 2) {
        alert("Max 2 tags");
      } else {
        setTags([...tags, tag.value]);
        tag.onChangeInputHandler({ target: { value: "" } });
      }
    }
  };

  const removeTagInput = (tag) => {
    const tagsNew = tags.filter((c) => c !== tag);
    setTags(tagsNew);
  };

  const AddTaskForm = (
    <form className={classes.add_task_form}>
      <TextField
        fullWidth
        placeholder="Website Redesign"
        label="Enter Status Title"
        required
        onChange={title.onChangeInputHandler}
        onBlur={title.onBlurInputHandler}
        value={title.value}
        error={!title.isValid && title.isTouched}
        helperText={
          !title.isValid && title.isTouched && "Please enter valid title"
        }
      />
      <TextField
        fullWidth
        label="Enter Status Description"
        onChange={description.onChangeInputHandler}
        onBlur={description.onBlurInputHandler}
        required
        value={description.value}
        error={!description.isValid && description.isTouched}
        helperText={
          !description.isValid &&
          description.isTouched &&
          "Please enter valid description"
        }
      />
      <TextField
        fullWidth
        type="date"
        onChange={date.onChangeInputHandler}
        required
        onBlur={date.onBlurInputHandler}
        value={date.value}
        error={!date.isValid && date.isTouched}
        helperText={
          !date.isValid && date.isTouched && "Please enter valid date"
        }
      />
      <TextField
        fullWidth
        label="Enter Category"
        onChange={category.onChangeInputHandler}
        onBlur={category.onBlurInputHandler}
        onKeyDown={handleCategoryInput}
        required
        value={category.value}
      />
      <div className={classes.categories}>
        {categories &&
          categories.map((category, index) => (
            <span key={index} className={classes.category_inp}>
              {category}
              <button
                type="button"
                onClick={() => removeCategoryInput(category)}
              >
                X
              </button>
            </span>
          ))}
      </div>
      <TextField
        fullWidth
        label="Enter Tags"
        onChange={tag.onChangeInputHandler}
        onBlur={tag.onBlurInputHandler}
        value={tag.value}
        onKeyDown={handleTagInput}
        required
      />
      <div className={classes.categories}>
        {tags &&
          tags.map((tag, index) => (
            <span key={index} className={classes.category_inp}>
              {tag}
              <button type="button" onClick={() => removeTagInput(tag)}>
                X
              </button>
            </span>
          ))}
      </div>
      <Select fullWidth label="Assign To">
        <MenuItem>John Doe</MenuItem>
      </Select>
      <Button variant="contained" type="submit">
        Add
      </Button>
    </form>
  );

  // useEffect(() => {
  //   const storedColumns = localStorage.getItem("kanbancolumns");
  //   if (storedColumns) {
  //     setKanbanColumns(JSON.parse(storedColumns));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("kanbancolumns", JSON.stringify(kanbanColumns));
  // }, [kanbanColumns]);

  // const randomColor = () => {
  //   const colors = ["lightblue", "royalblue", "pink"];
  //   const randomNum = Math.round(Math.random() * 3);

  //   return colors[randomNum];
  // };

  // const createColumnHandler = () => {
  //   const newColumn = {
  //     id: new Date().toString(),
  //     title: statusTitle,
  //     tasks: [],
  //     color: randomColor(),
  //   };
  //   setKanbanColumns((prevColumns) => [...prevColumns, newColumn]);
  //   closeModal();
  // };

  // let isValid = statusTitle.trim().length >= 3;
  const AddNewColumnForm = (
    <form>
      <TextField
        onChange={status.onChangeInputHandler}
        onBlur={status.onBlurInputHandler}
        placeholder="Enter Status"
        label="Status Name"
        fullWidth
        error={!status.isValid && status.isTouched}
        helperText={
          !status.isValid && status.isTouched && "Please enter valid status"
        }
      />
      <Button variant="contained" type="submit" disabled={!status.isValid}>
        Add
      </Button>
    </form>
  );

  return (
    <>
      <MainModal
        isOpen={isOpenTaskModal}
        close={closeAddTaskModal}
        title="Add Task"
        text="Provide the necessary information for the new task"
        content={AddTaskForm}
        showButtons={false}
      />
      <MainModal
        isOpen={modalIsOpen}
        close={closeModal}
        content={AddNewColumnForm}
        title="Create new column"
        text="You are about to add new column. Please fill input"
        showButtons={false}
      />
      <Button onClick={openModal} variant="contained" sx={{ mt: 2 }}>
        Add New Column
      </Button>
      <Box className={classes.status_tasks_container}>
        {kanbanColumns.map((column) => (
          <Box key={column.id} className={classes.status_task}>
            <Typography color={column.color} variant="p" fontWeight="bold">
              {column.title}
            </Typography>
            <Button
              fontWeight="bold"
              variant="outlined"
              fullWidth
              onClick={openAddTaskModal}
            >
              +
            </Button>
            {column.tasks.map((task) => (
              <TaskKanban
                task={task}
                key={task.id}
                onClickView={openDetailsHandler}
              />
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
};

KanbanType.propTypes = {
  todoTasks: PropTypes.array.isRequired,
  workTasks: PropTypes.array.isRequired,
  lagTasks: PropTypes.array.isRequired,
  doneTasks: PropTypes.array.isRequired,
};

export default KanbanType;
