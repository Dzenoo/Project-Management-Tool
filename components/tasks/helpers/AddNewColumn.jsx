import { useState } from "react";
import { useValidation } from "@/hooks/Auth/useValidation";
import { VALIDATOR_REQUIRE } from "@/utils/validators";
import { Button, TextField } from "@mui/material";
import classes from "@/styles/tasks/kanban.module.css";

export default function AddNewColumn() {
  const status = useValidation([VALIDATOR_REQUIRE()]);

  return (
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
}
