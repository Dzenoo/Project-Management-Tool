"use client";

import MyDetails from "@/components/settings/MyDetails";
import { AppContext } from "@/context/AppContext";
import classes from "@/styles/settings/settings.module.css";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Settings = () => {
  const [isEditing, setisEditing] = useState(false);
  const { user, isLoggedIn } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, []);

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
