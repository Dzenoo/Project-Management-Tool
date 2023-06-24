import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "@/styles/dashboard/dashboard.module.css";
import PropTypes from "prop-types";

const TeamsCard = ({ user }) => {
  const teamsNames = user.teams.map((team) => team.name);

  const [selectValue, setSelectValue] = useState(teamsNames[0]);
  const [team, setteam] = useState();

  useEffect(() => {
    const newTeam = user.teams.find((team) => team.name === selectValue);
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
            sx={{ width: "200px" }}
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
          {team?.teamMembers.map((tm) => (
            <Card className={classes.team_card} key={tm._id}>
              <Image src={tm.image} width={120} height={120} alt="img" />
              <Box className={classes.team_card_box}>
                <div>
                  <Typography variant="p" fontWeight="bold">
                    {tm.first_name}
                  </Typography>{" "}
                  <Typography variant="p" fontWeight="bold">
                    {tm.last_name}
                  </Typography>
                </div>
                <div>
                  <Typography variant="p" color="textSecondary">
                    {tm.email}
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
      )}
    </>
  );
};

TeamsCard.propTypes = {
  user: PropTypes.object,
};

export default TeamsCard;
