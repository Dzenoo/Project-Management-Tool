"use client";

import classes from "@/styles/team/team.module.css";
import TeamCard from "@/components/team/TeamCard";
import { Box, TextField, Typography, Button } from "@mui/material";
import MainModal from "@/components/shared/MainModal";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useValidation } from "@/hooks/Auth/useValidation";
import { VALIDATOR_REQUIRE } from "@/utils/validators";
import { useHttpPost } from "@/hooks/Http/useHttpPost";

const TeamPage = () => {
  const { user } = useContext(AppContext);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [searchedTeam, setsearchedTeam] = useState("");
  const { sendPostRequest, isLoading } = useHttpPost();
  const closeModal = () => setisOpenModal(false);
  const openModal = () => setisOpenModal(true);

  const name = useValidation([VALIDATOR_REQUIRE()]);
  const description = useValidation([VALIDATOR_REQUIRE()]);

  const submitCreateTeam = async () => {
    const formValues = {
      name: name.value,
      description: description.value,
      userId: user._id,
    };

    try {
      await sendPostRequest("/api/team/create", "POST", formValues);
    } catch (error) {
      alert(error.message);
    }
  };

  const create = (
    <form onSubmit={submitCreateTeam} className={classes.create_team_form}>
      <TextField
        fullWidth
        label="Name"
        onChange={name.onChangeInputHandler}
        onBlur={name.onBlurInputHandler}
        value={name.value}
        error={!name.isValid && name.isTouched}
        helperText={
          !name.isValid && name.isTouched && "Please enter valid name of team"
        }
        required
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3}
        onChange={description.onChangeInputHandler}
        onBlur={description.onBlurInputHandler}
        value={description.value}
        error={!description.isValid && description.isTouched}
        helperText={
          !description.isValid &&
          description.isTouched &&
          "Please enter valid description of team"
        }
        required
      />
      <Button variant="contained" type="submit">
        Create
      </Button>
    </form>
  );

  return (
    <Box className={classes.team_wrapper}>
      <MainModal
        isOpen={isOpenModal}
        close={closeModal}
        title="Create Team"
        text="Create team, start collaborating"
        content={create}
      />
      <Box className={classes.team_actions}>
        <Typography variant="h4" fontWeight="bold">
          Teams
        </Typography>
        <div className={classes.team_actions_btns}>
          <Button onClick={openModal} variant="contained">
            Create Team
          </Button>
          <TextField
            placeholder="Search Teams..."
            label="Search"
            onChange={(e) => setsearchedTeam(e.target.value)}
          />
        </div>
      </Box>
      <Box className={classes.team_container}>
        {user.teams.length === 0 && (
          <Typography variant="p">No Teams Found</Typography>
        )}
        {user.teams.length > 0 &&
          user.teams
            .filter((team) =>
              team.name.toLowerCase().includes(searchedTeam.toLowerCase())
            )
            .map((team) => (
              <TeamCard
                key={team._id}
                id={team._id}
                image={team.image}
                teamName={team.name}
                teamDescription={team.description}
                dateCreated={team.updatedAt}
              />
            ))}
      </Box>
    </Box>
  );
};

export default TeamPage;
