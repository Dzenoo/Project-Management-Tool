"use client";

import {
  Box,
  Button,
  Card,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import classes from "@/styles/Auth/Login.module.css";
import Link from "next/link";

const LoginForm = () => {
  return (
    <Card className={classes.login_form_card}>
      <form className={classes.login_form}>
        <Box className={classes.login_header}>
          <Typography variant="h4" fontWeight="bold" textTransform="uppercase">
            Login
          </Typography>
          <Typography variant="p" color="textSecondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi.
          </Typography>
        </Box>
        <FormControl>
          <TextField placeholder="Enter Your Email" label="Email" required />
        </FormControl>
        <FormControl>
          <TextField
            placeholder="Enter Your Password"
            label="Password"
            required
          />
        </FormControl>
        <Box className={classes.login_actions}>
          <Typography variant="p">
            Dont Have Account? <Link href="/signup">Go here</Link>
          </Typography>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default LoginForm;
