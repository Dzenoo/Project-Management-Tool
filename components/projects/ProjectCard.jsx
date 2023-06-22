import {
  Box,
  Card,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import classes from "@/styles/projects/projects.module.css";
import { useState } from "react";

const ProjectCard = ({ project, getProjectById }) => {
  const { _id, image, name, description, status, startDate, finishDate } =
    project;
  const [statusSelect, setStatus] = useState(status);
  const projectTeam = getProjectById(_id);

  const changeStatusHandler = async (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);

    try {
      const response = await fetch(`/api/projects/${_id}`, {
        method: "POST",
        body: JSON.stringify({
          status: selectedStatus,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("Status changed successfully.");
      } else {
        throw new Error("Failed to change status.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Card className={classes.project_card}>
      <Box className={classes.project_top}>
        <div className={classes.project_status}>
          <Typography
            className={`${
              (status === "In Progress" && "progress") ||
              (status === "Cancelled" && "cancelled") ||
              (status === "Finished" && "finished")
            }`}
            sx={{ margin: "auto" }}
          >
            {status}
          </Typography>
          <Select
            sx={{ width: "200px" }}
            value={statusSelect}
            onChange={(e) => changeStatusHandler(e)}
          >
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Finished">Finished</MenuItem>
          </Select>
        </div>
        <Image
          style={{ marginTop: "20px" }}
          src={image}
          alt={name}
          width={120}
          height={120}
        />
      </Box>
      <Box className={classes.project_desc}>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="p" color="textSecondary">
          {description}
        </Typography>

        <Typography variant="p">
          📅 Start Date: {new Date(startDate).toLocaleDateString()}
        </Typography>
        <Typography variant="p">
          📅 End Date: {new Date(finishDate).toLocaleDateString()}{" "}
        </Typography>
      </Box>
      <Box className={classes.project_actions}>
        {projectTeam?.team.teamMembers.slice(0, 2).map((mb) => (
          <Tooltip title={mb.username} placement="top" key={mb.username}>
            <Image src={mb.image} width={60} height={60} alt={"img"} />
          </Tooltip>
        ))}
      </Box>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
