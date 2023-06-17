"use client";

import {
  Box,
  Button,
  Card,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import classes from "@/styles/auth/Login.module.css";
import Link from "next/link";
import { useValidation } from "@/hooks/Auth/useValidation";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "@/utils/validators";
import PropTypes from "prop-types";

const LoginForm = ({ submitLoginHandler }) => {
  const email = useValidation([VALIDATOR_EMAIL()]);
  const password = useValidation([VALIDATOR_MINLENGTH(6)]);

  let formIsValid = false;
  if (email.isValid && password.isValid) {
    formIsValid = true;
  }

  const loginData = {
    email: email.value,
    password: password.value,
  };

  const submitLogin = (e) => {
    e.preventDefault();
    submitLoginHandler(loginData);
  };

  return (
    <Card className={classes.login_form_card}>
      <form className={classes.login_form} onSubmit={submitLogin}>
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
          <TextField
            placeholder="Enter Your Email"
            label="Email"
            onChange={email.onChangeInputHandler}
            onBlur={email.onBlurInputHandler}
            value={email.value}
            error={!email.isValid && email.isTouched}
            helperText={
              !email.isValid && email.isTouched && "Please enter valid email"
            }
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            placeholder="Enter Your Password"
            label="Password"
            onChange={password.onChangeInputHandler}
            onBlur={password.onBlurInputHandler}
            value={password.value}
            error={!password.isValid && password.isTouched}
            helperText={
              !password.isValid &&
              password.isTouched &&
              "Please enter valid password"
            }
            required
            type="password"
          />
        </FormControl>
        <Box className={classes.login_actions}>
          <Typography variant="p">
            Dont Have Account? <Link href="/signup">Go here</Link>
          </Typography>
          <Button variant="contained" type="submit" disabled={!formIsValid}>
            Login
          </Button>
        </Box>
      </form>
    </Card>
  );
};

LoginForm.propTypes = {
  submitLoginHandler: PropTypes.func,
};

export default LoginForm;
