import { Button, TextField, Typography } from "@mui/material";
import classes from "@/styles/settings/settings.module.css";
import { useValidation } from "@/hooks/Auth/useValidation";
import { VALIDATOR_REQUIRE } from "@/utils/validators";

const MyDetails = ({ user, isEditing, submitEditing }) => {
  const firstname = useValidation([VALIDATOR_REQUIRE()]);
  const lastname = useValidation([VALIDATOR_REQUIRE()]);
  const email = useValidation([VALIDATOR_REQUIRE()]);
  const specialize = useValidation([VALIDATOR_REQUIRE()]);
  const biography = useValidation([VALIDATOR_REQUIRE()]);
  const address = useValidation([VALIDATOR_REQUIRE()]);
  const github = useValidation([VALIDATOR_REQUIRE()]);
  const linkedin = useValidation([VALIDATOR_REQUIRE()]);
  const website = useValidation([VALIDATOR_REQUIRE()]);

  const formValues = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    specialize: specialize.value,
    biography: biography.value,
    address: address.value,
    github: github.value,
    linkedin: linkedin.value,
    website: website.value,
  };

  const submitEdit = (e) => {
    e.preventDefault();

    submitEditing(formValues);
  };

  console.log(formValues);

  return (
    <form className={classes.settings_form} onSubmit={submitEdit}>
      <div className={classes.settings_form_control}>
        <Typography variant="h6">Basic Info</Typography>
        <div className={classes.settings_inputs}>
          <div className={classes.settings_control}>
            <label htmlFor="">
              <b>First Name</b>
            </label>
            <TextField
              onChange={firstname.onChangeInputHandler}
              oBlur={firstname.onBlurInputHandler}
              error={!firstname.isValid && firstname.isTouched}
              helperText={
                !firstname.isValid &&
                firstname.isTouched &&
                "Please enter valid firstname"
              }
              defaultValue={user.first_name}
            />
          </div>
          <div className={classes.settings_control}>
            <label htmlFor="">
              <b>Last Name</b>
            </label>
            <TextField
              onChange={lastname.onChangeInputHandler}
              oBlur={lastname.onBlurInputHandler}
              error={!lastname.isValid && lastname.isTouched}
              helperText={
                !lastname.isValid &&
                lastname.isTouched &&
                "Please enter valid lastname"
              }
              defaultValue={user.last_name}
            />
          </div>
          <div className={classes.settings_control}>
            <label htmlFor="">
              <b>Email</b>
            </label>
            <TextField
              onChange={email.onChangeInputHandler}
              oBlur={email.onBlurInputHandler}
              error={!email.isValid && email.isTouched}
              helperText={
                !email.isValid && email.isTouched && "Please enter valid email"
              }
              defaultValue={user.email}
            />
          </div>
        </div>
      </div>
      <div className={classes.settings_form_control}>
        <Typography variant="h6">Contact Info</Typography>
        <div className={classes.settings_inputs}>
          <div className={classes.settings_control}>
            <label htmlFor="">
              <b>Specialize</b>
            </label>
            <TextField
              onChange={specialize.onChangeInputHandler}
              oBlur={specialize.onBlurInputHandler}
              error={!specialize.isValid && specialize.isTouched}
              helperText={
                !specialize.isValid &&
                specialize.isTouched &&
                "Please enter valid specialize"
              }
              defaultValue={user.specialize}
            />
          </div>
          <div className={classes.settings_control}>
            <label htmlFor="">
              <b>Biography</b>
            </label>
            <TextField
              onChange={biography.onChangeInputHandler}
              oBlur={biography.onBlurInputHandler}
              error={!biography.isValid && biography.isTouched}
              helperText={
                !biography.isValid &&
                biography.isTouched &&
                "Please enter valid biography"
              }
              defaultValue={user.biography}
            />
          </div>
          <div className={classes.settings_control}>
            <label htmlFor="">
              <b>Address</b>
            </label>
            <TextField
              onChange={address.onChangeInputHandler}
              oBlur={address.onBlurInputHandler}
              error={!address.isValid && address.isTouched}
              helperText={
                !address.isValid &&
                address.isTouched &&
                "Please enter valid address"
              }
              defaultValue={user.address}
            />
          </div>
        </div>
      </div>
      <div className={classes.settings_form_control}>
        <Typography variant="h6">Social Info</Typography>
        <div className={classes.settings_inputs}>
          <div className={classes.settings_control}>
            <label htmlFor="">
              <b>Github</b>
            </label>
            <TextField
              onChange={github.onChangeInputHandler}
              oBlur={github.onBlurInputHandler}
              error={!github.isValid && github.isTouched}
              helperText={
                !github.isValid &&
                github.isTouched &&
                "Please enter valid github"
              }
              defaultValue={user.github}
            />
          </div>
          <div className={classes.settings_control}>
            <label htmlFor="">
              <b>Linkedin</b>
            </label>
            <TextField
              onChange={linkedin.onChangeInputHandler}
              oBlur={linkedin.onBlurInputHandler}
              error={!linkedin.isValid && linkedin.isTouched}
              helperText={
                !linkedin.isValid &&
                linkedin.isTouched &&
                "Please enter valid linkedin"
              }
              defaultValue={user.linkedin}
            />
          </div>
          <div className={classes.settings_control}>
            <label htmlFor="">
              <b>Website</b>
            </label>
            <TextField
              onChange={website.onChangeInputHandler}
              oBlur={website.onBlurInputHandler}
              error={!website.isValid && website.isTouched}
              helperText={
                !website.isValid &&
                website.isTouched &&
                "Please enter valid website"
              }
              defaultValue={user.website}
            />
          </div>
        </div>
      </div>
      {isEditing && (
        <Button type="submit" variant="contained" sx={{ width: "100px" }}>
          Submit
        </Button>
      )}
    </form>
  );
};

export default MyDetails;
