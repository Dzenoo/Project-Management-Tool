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
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const TeamsCard = () => {
  const { user } = useContext(AppContext);
  const teamsNames = user.teams.map((team) => team.team.name);

  const [selectValue, setSelectValue] = useState(teamsNames[0]);
  const [team, setteam] = useState();

  useEffect(() => {
    const newTeam = user.teams.find((team) => team.team.name === selectValue);
    setteam(newTeam);
  }, [user.teams, selectValue]);

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
      {selectValue === "" && <p>Select Team</p>}
      {selectValue !== "" && (
        <Box className={classes.team_cards}>
          {team?.team.teamMembers.map((tm) => (
            <Card className={classes.team_card}>
              <Image src={tm.user.image} width={120} height={120} alt="img" />
              <Box className={classes.team_card_box}>
                <div>
                  <Typography variant="p" fontWeight="bold">
                    {tm.user.first_name}
                  </Typography>
                  <Typography variant="p" fontWeight="bold">
                    {tm.user.last_name}
                  </Typography>
                </div>
                <div>
                  <Typography variant="p" color="textSecondary">
                    {tm.user.email}
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    color={
                      (tm.user.specialize === "Designer" && "orange") ||
                      (tm.user.specialize === "Developer" && "royalblue") ||
                      (tm.user.specialize === "Manager" && "greenyellow")
                    }
                  >
                    {tm?.user.specialize}
                  </Typography>
                </div>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};

export default TeamsCard;
