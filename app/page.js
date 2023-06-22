"use client";

import DashboardChart from "@/components/dashboard/components/DashboardChart";
import ProjectOverview from "@/components/dashboard/components/ProjectOverview";
import ProjectTable from "@/components/dashboard/components/ProjectTable";
import TeamsCard from "@/components/dashboard/components/TeamsCard";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import classes from "@/styles/dashboard/dashboard.module.css";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { useFetch } from "@/hooks/Http/useFetch";
import { ClipLoader } from "react-spinners";

export default function Dashboard() {
  const router = useRouter();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const { userProjects, user } = useContext(AppContext);
  const { data: tasks } = useFetch(`/api/tasks/user/${user._id}`);

  const finished = userProjects.filter((p) => p.status === "Finished");
  const cancelled = userProjects.filter((p) => p.status === "Cancelled");
  const progress = userProjects.filter((p) => p.status === "In Progress");

  useEffect(() => {
    if (!userInfo?.token) {
      router.replace("/login");
    }
  }, []);

  if (!tasks) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  return (
    <Box className={classes.dashboard_page}>
      <Typography variant="h4" fontWeight="bold" sx={{ padding: "12px" }}>
        Dashboard
      </Typography>
      <Grid container padding={2}>
        <Grid item xl={12}>
          <ProjectOverview
            totalProjects={userProjects.length}
            completed={finished.length}
            progress={progress.length}
            out={cancelled.length}
          />
        </Grid>
        <Grid item xl={3} paddingTop={2}>
          <DashboardChart tasks={tasks} />
        </Grid>
        <Grid item xl={9} paddingTop={2} paddingLeft={2}>
          <ProjectTable projects={userProjects} />
        </Grid>
        <Grid xl={12}>
          <TeamsCard />
        </Grid>
      </Grid>
    </Box>
  );
}
