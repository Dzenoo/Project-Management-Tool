"use client";

import UserCard from "@/components/team/UserCard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
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
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { ClipLoader } from "react-spinners";
import { VALIDATOR_REQUIRE } from "@/utils/validators";
import { useValidation } from "@/hooks/Auth/useValidation";
import { useHttpPost } from "@/hooks/Http/useHttpPost";

const TeamDetail = ({ params }) => {
  const { user } = useContext(AppContext);
  const team = user.teams.find((team) => team._id === params.teamId);
  const [isOpenInviteModal, setisOpenInviteModal] = useState(false);
  const [isMode, setisMode] = useState("card");
  const [searchUserInput, setsearchUserInput] = useState("");
  const [selectedSpecialize, setSelectedSpecialize] = useState("");
  const { sendPostRequest, isLoading } = useHttpPost();
  const closeInviteModal = () => setisOpenInviteModal(false);
  const openInviteModal = () => setisOpenInviteModal(true);

  const username = useValidation([VALIDATOR_REQUIRE()]);

  const submitInvite = async (e) => {
    e.preventDefault();

    const formValues = {
      usernameOfInvitedUser: username.value,
      sendingUserId: user._id,
    };

    try {
      await sendPostRequest(`/api/team/${params.teamId}`, "POST", formValues);
      setisOpenInviteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!team) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  const invite = (
    <form className={classes.invite_form} onSubmit={submitInvite}>
      <TextField
        fullWidth
        placeholder="username"
        label="Enter Member Username"
        onChange={username.onChangeInputHandler}
        onBlur={username.onBlurInputHandler}
        value={username.value}
        error={!username.isValid && username.isTouched}
        helperText={
          !username.isValid &&
          username.isTouched &&
          "Please enter valid username of user"
        }
        required
      />
      <Button variant="contained" type="submit" sx={{ bgcolor: "#121212" }}>
        Add
      </Button>
    </form>
  );

  return (
    <>
      <Box className={classes.team_details_container}>
        {/* Invite Modal */}
        <MainModal
          isOpen={isOpenInviteModal}
          close={closeInviteModal}
          title="Add User"
          text="Add new user to this team and start collaborating"
          content={invite}
        />
        <div className={classes.team_details_top}>
          <Typography variant="h4" fontWeight="bold">
            {team.name}
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
          <TextField
            placeholder="Search..."
            label="Search Here"
            onChange={(e) => setsearchUserInput(e.target.value)}
          />
          <Select
            className={classes.select}
            onChange={(e) => setSelectedSpecialize(e.target.value)}
            value={selectedSpecialize}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Designer">Designer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </Select>
          <Button size="large" variant="contained" onClick={openInviteModal}>
            Add Member
          </Button>
        </div>
        <div className={classes.team_details_cards}>
          {isMode === "card" ? (
            team.teamMembers.length > 0 ? (
              team.teamMembers
                .filter((tm) => {
                  const nameMatch =
                    tm.first_name
                      .toLowerCase()
                      .includes(searchUserInput.toLowerCase()) ||
                    tm.last_name
                      .toLowerCase()
                      .includes(searchUserInput.toLowerCase());
                  const specializeMatch =
                    selectedSpecialize === "" ||
                    tm.specialize === selectedSpecialize;
                  return nameMatch && specializeMatch;
                })
                .map((tm) => (
                  <UserCard
                    key={tm._id}
                    image={tm.image}
                    fname={tm.first_name}
                    lname={tm.last_name}
                    email={tm.email}
                    github={tm.github}
                    linkedin={tm.linkedin}
                    workAs={tm.specialize}
                  />
                ))
            ) : (
              <Typography variant="body1">No team members found.</Typography>
            )
          ) : (
            <UserTable
              team={team}
              searchValue={searchUserInput}
              selectedSpecialize={selectedSpecialize}
            />
          )}
        </div>
      </Box>
      <ToastContainer />
    </>
  );
};

export default TeamDetail;
