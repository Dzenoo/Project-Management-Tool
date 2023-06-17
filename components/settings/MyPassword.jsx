import { TextField, Typography } from "@mui/material";
import classes from "@/styles/settings/settings.module.css";

const MyPassword = () => {
  return (
    <form className={classes.settings_form}>
      <div className={classes.settings_form_control}>
        <Typography fontWeight="bold" variant="h6">
          Change Password
        </Typography>
        <div className={classes.settings_password}>
          <TextField label="Old Password" />
          <TextField label="New Password" />
          <TextField label="Confirm New Password" />
        </div>
      </div>
    </form>
  );
};

export default MyPassword;
