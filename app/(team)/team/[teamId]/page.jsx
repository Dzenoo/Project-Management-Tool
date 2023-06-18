"use client";

import UserCard from "@/components/team/UserCard";
import { teams } from "@/data/tasks.jsonData.config.json";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import classes from "@/styles/team/team.module.css";
import UserTable from "@/components/team/UserTable";
import { useState } from "react";
import MainModal from "@/components/shared/MainModal";

const TeamDetail = ({ params }) => {
  const team = teams.find((team) => team.id === params.teamId);
  const [isOpenInviteModal, setisOpenInviteModal] = useState(false);
  const [isMode, setisMode] = useState("card");
  const closeInviteModal = () => setisOpenInviteModal(false);
  const openInviteModal = () => setisOpenInviteModal(true);

  const invite = (
    <form className={classes.invite_form}>
      <TextField
        fullWidth
        placeholder="contact@email.com"
        label="Enter Member Email"
      />
      <Button variant="contained" sx={{ bgcolor: "#121212" }}>
        Invite
      </Button>
    </form>
  );

  return (
    <Box className={classes.team_details_container}>
      {/* Invite Modal */}
      <MainModal
        isOpen={isOpenInviteModal}
        close={closeInviteModal}
        title="Invite User"
        text="Invite new user to this team and start collaborating"
        content={invite}
      />
      <div className={classes.team_details_top}>
        <Typography variant="h4" fontWeight="bold">
          {team?.teamName}
        </Typography>
        <div>
          <Button
            onClick={() => setisMode("card")}
            variant={isMode === "card" && "contained"}
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
            onClick={() => setisMode("table")}
            variant={isMode === "table" && "contained"}
          >
            <Image
              src="/images/graphic/list.png"
              width={30}
              height={30}
              style={{ marginRight: "10px" }}
              alt="img"
            />
            Table View
          </Button>
        </div>
        <Button>
          <Image
            src={"/images/graphic/option.png"}
            width={30}
            height={30}
            alt="options"
          />
        </Button>
      </div>
      <div className={classes.team_details_content}>
        <TextField placeholder="Search..." label="Search Here" />
        <Select label="Role" className={classes.select}>
          <MenuItem>Member</MenuItem>
          <MenuItem>Admin</MenuItem>
          <MenuItem>Manager</MenuItem>
        </Select>
        <Button size="large" variant="contained" onClick={openInviteModal}>
          Invite Member
        </Button>
      </div>
      <div className={classes.team_details_cards}>
        {isMode === "card" ? (
          team.teamMembers.map((tm) => (
            <UserCard
              key={tm.id}
              image={tm.image}
              fname={tm.firstName}
              lname={tm.lastName}
              email={tm.email}
              role={tm.role}
              workAs={tm.workAs}
            />
          ))
        ) : (
          <UserTable team={team} />
        )}
      </div>
    </Box>
  );
};

export default TeamDetail;
