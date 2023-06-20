import { Box, Card, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import classes from "@/styles/projects/projects.module.css";

const ProjectCard = ({ project, getProjectById }) => {
  const { _id, image, name, description, status, startDate, finishDate } =
    project;

  const projectTeam = getProjectById(_id);

  console.log(projectTeam);
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
        <Image src={image} alt={name} width={120} height={120} />
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
        {projectTeam.team.teamMembers.slice(0, 2).map((mb) => (
          <Tooltip title={mb.user.username} placement="top">
            <Image src={mb.user.image} width={60} height={60} alt={"img"} />
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
