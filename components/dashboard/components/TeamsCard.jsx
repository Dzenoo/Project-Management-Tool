import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { teams } from "@/data/tasks.jsonData.config.json";
import Image from "next/image";
import classes from "@/styles/dashboard/dashboard.module.css";

const TeamsCard = () => {
  const [selectValue, setSelectValue] = useState("");
  const [team, setteam] = useState();
  const teamsNames = teams.map((team) => team.teamName);

  useEffect(() => {
    const newTeam = teams.find((team) => team.teamName === selectValue);
    setteam(newTeam);
  }, [teams, selectValue]);

  return (
    <>
      <Box className={classes.team_topbar}>
        <Typography variant="h4" fontWeight="bold">
          Team
        </Typography>
        <FormControl>
          <InputLabel htmlFor="team_select">Select Team</InputLabel>
          <Select
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            inputProps={{ id: "team_select" }}
            label="Select Team"
          >
            {teamsNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.team_cards}>
        {team.teamMembers.map((tm) => (
          <Card className={classes.team_card}>
            <Image src={tm?.image} width={120} height={120} alt="img" />
            <Box className={classes.team_card_box}>
              <div>
                <Typography variant="p" fontWeight="bold">
                  {tm?.firstName}
                </Typography>{" "}
                <Typography variant="p" fontWeight="bold">
                  {tm?.lastName}
                </Typography>
              </div>
              <div>
                <Typography variant="p" color="textSecondary">
                  {tm?.email}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="p"
                  fontWeight="bold"
                  color={
                    (tm.specialize === "Designer" && "orange") ||
                    (tm.specialize === "Developer" && "royalblue") ||
                    (tm.specialize === "Manager" && "greenyellow")
                  }
                >
                  {tm?.specialize}
                </Typography>
              </div>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default TeamsCard;
