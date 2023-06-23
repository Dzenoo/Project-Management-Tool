"use client";

import DashboardChart from "@/components/dashboard/components/DashboardChart";
import ProjectOverview from "@/components/dashboard/components/ProjectOverview";
import ProjectTable from "@/components/dashboard/components/ProjectTable";
import TeamsCard from "@/components/dashboard/components/TeamsCard";
import { Box, Grid, Typography } from "@mui/material";
import classes from "@/styles/dashboard/dashboard.module.css";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useFetch } from "@/hooks/Http/useFetch";
import { ClipLoader } from "react-spinners";

export default function Dashboard() {
  const { user, userInfo } = useContext(AppContext);
  const { data: tasks } = useFetch(`/api/tasks/user/${user._id}`);

  if (!userInfo || userInfo === undefined) {
    return (
      <Typography textAlign="center" mt={2} fontWeight="bold">
        Please log in or sign up
      </Typography>
    );
  }

  if (!tasks) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  const userProjects = user?.teams.reduce((acc, team) => {
    const teamProjects = team.projects.map((project) => project);
    return [...acc, ...teamProjects];
  }, []);

  const finished = userProjects?.filter((p) => p.status === "Finished");
  const cancelled = userProjects?.filter((p) => p.status === "Cancelled");
  const progress = userProjects?.filter((p) => p.status === "In Progress");

  return (
    <Box className={classes.dashboard_page}>
      <Typography variant="h4" fontWeight="bold" sx={{ padding: "12px" }}>
        Dashboard
      </Typography>
      <Grid container padding={2}>
        <Grid item xl={12}>
          <ProjectOverview
            totalProjects={userProjects?.length}
            completed={finished?.length}
            progress={progress?.length}
            out={cancelled?.length}
          />
        </Grid>
        <Grid item xl={3} paddingTop={2}>
          <DashboardChart tasks={tasks || []} />
        </Grid>
        <Grid item xl={9} paddingTop={2} paddingLeft={2}>
          <ProjectTable projects={userProjects || []} />
        </Grid>
        <Grid xl={12}>
          <TeamsCard />
        </Grid>
      </Grid>
    </Box>
  );
}
