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
import { useValidation } from "@/hooks/Auth/useValidation";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_FIRSTNAME,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORD_MATCH,
  VALIDATOR_REQUIRE,
} from "@/utils/validators";

const SignupForm = ({ submitHandler }) => {
  const firstName = useValidation([VALIDATOR_FIRSTNAME()]);
  const lastName = useValidation([VALIDATOR_REQUIRE()]);
  const userName = useValidation([VALIDATOR_MINLENGTH(4)]);
  const email = useValidation([VALIDATOR_EMAIL()]);
  const password = useValidation([VALIDATOR_MINLENGTH(4)]);
  const confirmPassword = useValidation([
    VALIDATOR_PASSWORD_MATCH(password.value),
  ]);

  let formIsValid = false;
  if (
    firstName.isValid &&
    lastName.isValid &&
    userName.isValid &&
    email.isValid &&
    password.isValid &&
    confirmPassword.isValid
  ) {
    formIsValid = true;
  }

  const signupData = {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    email: email.value,
    password: password.value,
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    submitHandler(signupData);
  };

  return (
    <Card className={classes.signup_form_card}>
      <form className={classes.signup_form} onSubmit={onSubmitForm}>
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
            onChange={firstName.onChangeInputHandler}
            onBlur={firstName.onBlurInputHandler}
            value={firstName.value}
            error={!firstName.isValid && firstName.isTouched}
            helperText={
              !firstName.isValid &&
              firstName.isTouched &&
              "Please enter valid first name"
            }
          />
          <TextField
            placeholder="Enter Your Last Name"
            label="Last name"
            fullWidth
            onChange={lastName.onChangeInputHandler}
            onBlur={lastName.onBlurInputHandler}
            value={lastName.value}
            error={!lastName.isValid && lastName.isTouched}
            helperText={
              !lastName.isValid &&
              lastName.isTouched &&
              "Please enter valid last name"
            }
            required
          />
        </Box>
        <FormControl>
          <TextField
            placeholder="Enter Your Username"
            label="Username"
            onChange={userName.onChangeInputHandler}
            onBlur={userName.onBlurInputHandler}
            value={userName.value}
            error={!userName.isValid && userName.isTouched}
            helperText={
              !userName.isValid &&
              userName.isTouched &&
              "Please enter valid username"
            }
            required
          />
        </FormControl>
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
            type="password"
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
          />
        </FormControl>
        <FormControl>
          <TextField
            placeholder="Confirm Your Password"
            type="password"
            label="Confirm Password"
            onChange={confirmPassword.onChangeInputHandler}
            onBlur={confirmPassword.onBlurInputHandler}
            value={confirmPassword.value}
            error={!confirmPassword.isValid && confirmPassword.isTouched}
            helperText={
              !confirmPassword.isValid &&
              confirmPassword.isTouched &&
              "Please enter valid password"
            }
            required
          />
        </FormControl>
        <Box className={classes.signup_actions}>
          <Typography variant="p">
            Have Account? <Link href="/login">Go here</Link>
          </Typography>
          <Button variant="contained" type="submit" disabled={!formIsValid}>
            Signup
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default SignupForm;
