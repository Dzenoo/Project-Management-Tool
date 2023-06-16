"use client";

import classes from "@/styles/team/team.module.css";
import { teams } from "@/data/tasks.jsonData.config.json";
import TeamCard from "@/components/team/TeamCard";
import { Box, TextField, Typography } from "@mui/material";

const TeamPage = () => {
  return (
    <Box className={classes.team_wrapper}>
      <Box className={classes.team_actions}>
        <Typography variant="h4" fontWeight="bold">
          Teams
        </Typography>
        <TextField placeholder="Search Teams..." label="Search" />
      </Box>
      <Box className={classes.team_container}>
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            image={team.teamImage}
            teamName={team.teamName}
            teamDescription={team.teamDescription}
            dateCreated={team.dateCreated}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TeamPage;
