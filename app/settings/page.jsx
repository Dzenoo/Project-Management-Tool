"use client";

import MyDetails from "@/components/settings/MyDetails";
import { useFetch } from "@/hooks/Http/useFetch";
import classes from "@/styles/settings/settings.module.css";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const Settings = () => {
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("User"))
      : null;

  const { data: user } = useFetch(`/api/user/${userInfo?.userId}`);
  const [isEditing, setisEditing] = useState(false);

  if (!user) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  if (!userInfo || userInfo === undefined) {
    return (
      <Typography textAlign="center" mt={2} fontWeight="bold">
        Please log in or sign up
      </Typography>
    );
  }

  const submitEdit = async (data) => {
    try {
      await fetch(`/api/user/${user._id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {}
  };

  return (
    <div className={classes.settings_wrapper}>
      <div className={classes.gradient}></div>
      <div className={classes.settings_top}>
        <Image src={user.image} width={200} height={200} alt={user.username} />
        <div>
          <Typography variant="h4" fontWeight="bold">
            {user.username}
          </Typography>
          <Typography color="textSecondary">{user.email}</Typography>
        </div>
      </div>
      <div className={classes.settings_tabs}>
        <Button>My Details</Button>
        <Button onClick={() => setisEditing(!isEditing)} variant="contained">
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
      <div className={classes.settings_content}>
        <MyDetails
          user={user}
          isEditing={isEditing}
          submitEditing={submitEdit}
        />
      </div>
    </div>
  );
};

export default Settings;
