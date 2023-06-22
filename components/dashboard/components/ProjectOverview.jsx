import classes from "@/styles/dashboard/dashboard.module.css";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";

const ProjectOverview = ({ totalProjects, completed, progress, out }) => {
  return (
    <Card className={classes.project_overview}>
      <Box className={classes.project_header}>
        <Typography variant="h6" fontWeight="bold">
          Project Overview
        </Typography>
        <hr />
      </Box>
      <CardContent className={classes.project_cards}>
        <Box className={classes.project_card}>
          <Image
            src="/images/graphic/project.png"
            width={30}
            height={30}
            alt="totalprojects"
          />
          <Typography fontWeight="bold" variant="h3">
            {totalProjects}
          </Typography>
          <Typography variant="p" color="textSecondary">
            Total Projects
          </Typography>
        </Box>
        <Box className={classes.project_card}>
          <Image
            src="/images/graphic/checkmark.png"
            width={30}
            height={30}
            alt="completed"
          />
          <Typography fontWeight="bold" variant="h3">
            {completed}
          </Typography>
          <Typography variant="p" color="textSecondary">
            Completed
          </Typography>
        </Box>
        <Box className={classes.project_card}>
          <Image
            src="/images/graphic/check.png"
            width={30}
            height={30}
            alt="progress"
          />
          <Typography fontWeight="bold" variant="h3">
            {progress}
          </Typography>
          <Typography variant="p" color="textSecondary">
            In Progress
          </Typography>
        </Box>
        <Box className={classes.project_card}>
          <Image
            src="/images/graphic/power.png"
            width={30}
            height={30}
            alt="out"
          />
          <Typography fontWeight="bold" variant="h3">
            {out}
          </Typography>
          <Typography variant="p" color="textSecondary">
            Out of Schedule
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

ProjectOverview.propTypes = {
  totalProjects: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  out: PropTypes.number.isRequired,
};

export default ProjectOverview;
