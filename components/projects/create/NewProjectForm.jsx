"use client";

import {
  Box,
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import classes from "@/styles/projects/projects.module.css";
import { useState } from "react";
import Image from "next/image";
import { VALIDATOR_REQUIRE } from "@/utils/validators";
import { useValidation } from "@/hooks/Auth/useValidation";
import { ProjectStatusTypes } from "@/data/data";

const NewProjectForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState([]);

  const name = useValidation([VALIDATOR_REQUIRE()]);
  const description = useValidation([VALIDATOR_REQUIRE()]);
  const startDate = useValidation([VALIDATOR_REQUIRE()]);
  const endDate = useValidation([VALIDATOR_REQUIRE()]);
  const category = useValidation([VALIDATOR_REQUIRE()]);
  const projectManager = useValidation([VALIDATOR_REQUIRE()]);
  const budget = useValidation([VALIDATOR_REQUIRE()]);
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

  const ButtonIcon = (
    <Image
      src="/images/graphic/right-arrow.png"
      width={20}
      height={20}
      alt="arr"
      style={{ transform: "rotate(180deg)" }}
    />
  );

  return (
    <Card>
      <Box className={classes.add_form_top}>
        <Typography variant="h4" fontWeight="bold">
          Create a project
        </Typography>
      </Box>
      <form className={classes.add_form}>
        {/* Step 1 */}
        {currentStep === 0 && (
          <div className={classes.add_details}>
            <FormControl className={classes.form_control}>
              <label>
                <b>Project Name</b>
              </label>
              <TextField
                onChange={name.onChangeInputHandler}
                onBlur={name.onBlurInputHandler}
                value={name.value}
                error={!name.isValid && name.isTouched}
                helperText={
                  !name.isValid && name.isTouched && "Please enter valid name"
                }
                required
                placeholder="Enter name of project"
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.form_control}>
              <label>
                <b>Project Description</b>
              </label>
              <TextField
                placeholder="Enter description of project"
                rows={3}
                fullWidth
                multiline
                onChange={description.onChangeInputHandler}
                onBlur={description.onBlurInputHandler}
                value={description.value}
                error={!description.isValid && description.isTouched}
                helperText={
                  !description.isValid &&
                  description.isTouched &&
                  "Please enter valid description"
                }
                required
              />
            </FormControl>
            <div className={classes.flex_inputs}>
              <FormControl className={classes.form_control}>
                <label>
                  <b>Start Date</b>
                </label>
                <TextField
                  type="date"
                  onChange={startDate.onChangeInputHandler}
                  onBlur={startDate.onBlurInputHandler}
                  value={startDate.value}
                  error={!startDate.isValid && startDate.isTouched}
                  helperText={
                    !startDate.isValid &&
                    startDate.isTouched &&
                    "Please enter valid startDate"
                  }
                  required
                  fullWidth
                />
              </FormControl>
              <FormControl className={classes.form_control}>
                <label>
                  <b>End Date</b>
                </label>
                <TextField
                  type="date"
                  onChange={endDate.onChangeInputHandler}
                  onBlur={endDate.onBlurInputHandler}
                  value={endDate.value}
                  error={!endDate.isValid && endDate.isTouched}
                  helperText={
                    !endDate.isValid &&
                    endDate.isTouched &&
                    "Please enter valid endDate"
                  }
                  required
                  fullWidth
                />
              </FormControl>
            </div>
          </div>
        )}
        {/* Step 2 */}
        {currentStep === 1 && (
          <div className={classes.add_details}>
            <FormControl className={classes.form_control}>
              <label>
                <b>Project Manager</b>
              </label>
              <TextField
                placeholder="Enter Project Manager"
                fullWidth
                onChange={projectManager.onChangeInputHandler}
                onBlur={projectManager.onBlurInputHandler}
                value={projectManager.value}
                error={!projectManager.isValid && projectManager.isTouched}
                helperText={
                  !projectManager.isValid &&
                  projectManager.isTouched &&
                  "Please enter valid projectManager"
                }
                required
              />
            </FormControl>
            <FormControl className={classes.form_control}>
              <label>
                <b>Select Team</b>
              </label>
              <Select placeholder="Select Team" fullWidth></Select>
            </FormControl>
            <FormControl className={classes.form_control}>
              <label>
                <b>Budget</b>
              </label>
              <TextField
                placeholder="Enter currrent budget ($)"
                type="number"
                fullWidth
                onChange={budget.onChangeInputHandler}
                onBlur={budget.onBlurInputHandler}
                value={budget.value}
                error={!budget.isValid && budget.isTouched}
                helperText={
                  !budget.isValid &&
                  budget.isTouched &&
                  "Please enter valid budget"
                }
                required
              />
            </FormControl>
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 2 && (
          <div className={classes.add_details}>
            <FormControl className={classes.form_control}>
              <label>
                <b>Status</b>
              </label>
              <Select
                placeholder="Select Status"
                fullWidth
                onChange={status.onChangeInputHandler}
                onBlur={status.onBlurInputHandler}
                value={status.value}
              >
                {ProjectStatusTypes.map((pr) => (
                  <MenuItem
                    value={pr.name}
                    key={pr.id}
                    className={classes.status_menu_item}
                  >
                    <Image
                      src={pr.image}
                      width={20}
                      height={20}
                      alt={pr.name}
                    />
                    <Typography>{pr.name}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.form_control}>
              <label>
                <b>Categories</b>
              </label>
              <TextField
                fullWidth
                label="Enter Categories"
                onChange={category.onChangeInputHandler}
                onBlur={category.onBlurInputHandler}
                onKeyDown={handleCategoryInput}
                placeholder="Click enter after category"
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
            </FormControl>
          </div>
        )}
        <Box className={classes.add_actions}>
          <Button
            startIcon={
              (currentStep === 1 && ButtonIcon) ||
              (currentStep === 2 && ButtonIcon)
            }
            onClick={() => {
              if (currentStep <= 0) {
                return;
              }
              setCurrentStep((prevStep) => prevStep - 1);
            }}
          >
            {(currentStep === 1 && "Back") || (currentStep === 2 && "Back")}
          </Button>
          <Button
            disabled={
              !name.isValid ||
              !description.isValid ||
              !startDate.isValid ||
              !endDate.isValid
            }
            variant="contained"
            onClick={() => {
              if (currentStep >= 2) {
                alert("Submit Form");
                return;
              }
              setCurrentStep((prevStep) => prevStep + 1);
            }}
          >
            {"Next Step"}
          </Button>
        </Box>
      </form>
      <Box className={classes.step_container}>
        <span className={currentStep === 0 && classes.isActive}></span>
        <span className={currentStep === 1 && classes.isActive}></span>
        <span className={currentStep === 2 && classes.isActive}></span>
      </Box>
    </Card>
  );
};

export default NewProjectForm;
