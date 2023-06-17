import { TextField, Typography } from "@mui/material";
import classes from "@/styles/settings/settings.module.css";

const MyDetails = () => {
  return (
    <form className={classes.settings_form}>
      <div className={classes.settings_form_control}>
        <Typography fontWeight="bold" variant="h6">
          Basic Info
        </Typography>
        <div className={classes.settings_inputs}>
          <TextField label="First name" />
          <TextField label="Last name" />
          <TextField label="Email" />
        </div>
      </div>
      <div className={classes.settings_form_control}>
        <Typography fontWeight="bold" variant="h6">
          Contact Info
        </Typography>
        <div className={classes.settings_inputs}>
          <TextField label="Number" />
          <TextField label="Address" />
          <TextField label="Website" />
        </div>
      </div>
      <div className={classes.settings_form_control}>
        <Typography fontWeight="bold" variant="h6">
          Social Info
        </Typography>
        <div className={classes.settings_inputs}>
          <TextField label="Github" type="url" />
          <TextField label="Linkedin" type="url" />
          <TextField label="Website" type="url" />
        </div>
      </div>
    </form>
  );
};

export default MyDetails;
