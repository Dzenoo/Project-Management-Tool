"use client";

import MyDetails from "@/components/settings/MyDetails";
import MyPassword from "@/components/settings/MyPassword";
import classes from "@/styles/settings/settings.module.css";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const Settings = () => {
  const [isMode, setisMode] = useState("details");

  return (
    <div className={classes.settings_wrapper}>
      <div className={classes.gradient}></div>
      <div className={classes.settings_top}>
        <Image
          src="https://res.cloudinary.com/dzwb60tk1/image/upload/v1678535834/Untitled_design_3_zbm2cx.png"
          width={200}
          height={200}
          alt="img"
        />
        <div>
          <Typography variant="h4" fontWeight="bold">
            Settings
          </Typography>
          <Typography color="textSecondary">johndoe@gmail.com</Typography>
        </div>
      </div>
      <div className={classes.settings_tabs}>
        <Button
          sx={isMode === "details" && { borderBottom: "4px solid royalblue" }}
          onClick={() => setisMode("details")}
        >
          My Details
        </Button>
        <Button
          sx={isMode === "password" && { borderBottom: "4px solid royalblue" }}
          onClick={() => setisMode("password")}
        >
          Password
        </Button>
      </div>
      <div className={classes.settings_content}>
        {isMode === "details" ? <MyDetails /> : <MyPassword />}
      </div>
    </div>
  );
};

export default Settings;
