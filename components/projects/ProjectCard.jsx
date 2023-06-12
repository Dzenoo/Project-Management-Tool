import { Box, Card, IconButton, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import classes from "@/styles/projects/projects.module.css";

const ProjectCard = ({ project }) => {
  const {
    projectImage,
    name,
    description,
    status,
    startDate,
    endDate,
    teamMembers,
  } = project;

  return (
    <Card className={classes.project_card}>
      <Box className={classes.project_top}>
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
        <Image src={projectImage} alt={name} width={120} height={120} />
      </Box>
      <Box className={classes.project_desc}>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="p" color="textSecondary">
          {description}
        </Typography>
        <Typography variant="p">📅 Start Date: {startDate}</Typography>
        <Typography variant="p">📅 End Date: {endDate}</Typography>
      </Box>
      <Box className={classes.project_actions}>
        {teamMembers.map((mb) => (
          <Tooltip title={mb} placement="top">
            <IconButton
              className={classes.project_team_member}
              size="large"
            ></IconButton>
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
