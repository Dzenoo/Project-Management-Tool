import { useValidation } from "@/hooks/Auth/useValidation";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "@/utils/validators";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import classes from "@/styles/tasks/kanban.module.css";
import { useState } from "react";

const AddTaskForm = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const title = useValidation([VALIDATOR_MINLENGTH(3)]);
  const description = useValidation([VALIDATOR_MINLENGTH(20)]);
  const date = useValidation([VALIDATOR_REQUIRE()]);
  const category = useValidation([VALIDATOR_REQUIRE()]);
  const tag = useValidation([VALIDATOR_REQUIRE()]);

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
      setTags([...tags, tag.value]);
      tag.onChangeInputHandler({ target: { value: "" } });
    }
  };

  const removeTagInput = (tag) => {
    const tagsNew = tags.filter((c) => c !== tag);
    setTags(tagsNew);
  };

  return (
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
        placeholder="Click enter after tag"
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
        placeholder="Click enter after tag"
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
};

export default AddTaskForm;
