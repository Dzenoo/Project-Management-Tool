"use client";
import { AppContext } from "@/context/AppContext";
import { Typography } from "@mui/material";
import { useContext } from "react";

const layout = ({ children }) => {
  const { userInfo } = useContext(AppContext);

  if (!userInfo || userInfo === undefined) {
    return (
      <Typography textAlign="center" mt={2} fontWeight="bold">
        Please log in or sign up
      </Typography>
    );
  }

  return (
    <div className="main_layout">
      <div className="content">{children}</div>
    </div>
  );
};
export default layout;
