"use client";

import classes from "@/styles/team/team.module.css";
import { teams } from "@/data/tasks.jsonData.config.json";
import TeamCard from "@/components/team/TeamCard";
import { Box, TextField, Typography, Button } from "@mui/material";
import MainModal from "@/components/shared/MainModal";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const TeamPage = () => {
  const { user } = useContext(AppContext);
  const [isOpenModal, setisOpenModal] = useState(false);
  const closeModal = () => setisOpenModal(false);
  const openModal = () => setisOpenModal(true);

  const create = (
    <form className={classes.create_team_form}>
      <TextField fullWidth label="Name" />
      <TextField fullWidth label="Description" multiline rows={3} />
      <Button variant="contained">Create</Button>
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
          <TextField placeholder="Search Teams..." label="Search" />
        </div>
      </Box>
      <Box className={classes.team_container}>
        {user.teams.map((teamObject) => (
          <TeamCard
            key={teamObject.team._id}
            id={teamObject.team._id}
            image={teamObject.team.image}
            teamName={teamObject.team.name}
            teamDescription={teamObject.team.description}
            dateCreated={teamObject.team.updatedAt}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TeamPage;
