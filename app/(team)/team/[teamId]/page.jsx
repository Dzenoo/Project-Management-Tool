"use client";

import UserCard from "@/components/team/UserCard";
import { teams } from "@/data/tasks.jsonData.config.json";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

const TeamDetail = ({ params }) => {
  const team = teams.find((team) => team.id === params.teamId);

  return (
    <Box>
      <div>
        <Typography variant="h4" fontWeight="bold">
          {team?.teamName}
        </Typography>
        <Button
        //   onClick={() => setisTypeTask("kanban")}
        //   variant={isTypeTask === "kanban" && "contained"}
        >
          <Image
            src="/images/graphic/kanban.png"
            width={30}
            height={30}
            style={{ marginRight: "10px" }}
            alt="img"
          />
          Card View
        </Button>
        <Button
          size="large"
          //   onClick={() => setisTypeTask("list")}
          //   variant={isTypeTask === "list" && "contained"}
        >
          <Image
            src="/images/graphic/list.png"
            width={30}
            height={30}
            style={{ marginRight: "10px" }}
            alt="img"
          />
          List View
        </Button>
      </div>
      <div>
        <TextField placeholder="Search..." label="Search Here" />
        <Select>
          <MenuItem>Member</MenuItem>
          <MenuItem>Admin</MenuItem>
          <MenuItem>Manager</MenuItem>
        </Select>
        <Button size="large" variant="contained">
          Invite Member
        </Button>
      </div>
      <div>
        {team.teamMembers.map((tm) => (
          <UserCard
            key={tm.id}
            image={tm.image}
            fname={tm.firstName}
            lname={tm.lastName}
            email={tm.email}
            role={tm.role}
            workAs={tm.workAs}
          />
        ))}
      </div>
    </Box>
  );
};

export default TeamDetail;