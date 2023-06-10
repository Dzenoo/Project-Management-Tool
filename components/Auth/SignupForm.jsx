"use client";

import {
  Box,
  Button,
  Card,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import classes from "@/styles/Auth/Signup.module.css";
import Link from "next/link";

const SignupForm = () => {
  return (
    <Card className={classes.signup_form_card}>
      <form className={classes.signup_form}>
        <Box className={classes.signup_header}>
          <Typography variant="h4" fontWeight="bold" textTransform="uppercase">
            Create Account
          </Typography>
          <Typography variant="p" color="textSecondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi.
          </Typography>
        </Box>
        <Box className={classes.flex_input}>
          <TextField
            placeholder="Enter Your First Name"
            label="First name"
            required
            fullWidth
          />
          <TextField
            placeholder="Enter Your Last Name"
            label="Last name"
            fullWidth
            required
          />
        </Box>
        <FormControl>
          <TextField
            placeholder="Enter Your Username"
            label="Username"
            required
          />
        </FormControl>
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
        <FormControl>
          <TextField
            placeholder="Confirm Your Password"
            label="Confirm Password"
            required
          />
        </FormControl>
        <Box className={classes.signup_actions}>
          <Typography variant="p">
            Have Account? <Link href="/login">Go here</Link>
          </Typography>
          <Button variant="contained" type="submit">
            Signup
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default SignupForm;
