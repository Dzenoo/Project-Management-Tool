"use client";

import DashboardChart from "@/components/dashboard/components/DashboardChart";
import ProjectOverview from "@/components/dashboard/components/ProjectOverview";
import ProjectTable from "@/components/dashboard/components/ProjectTable";
import TeamsCard from "@/components/dashboard/components/TeamsCard";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import classes from "@/styles/dashboard/dashboard.module.css";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user.token) {
      router.replace("/");
    }
  }, []);

  return (
    <Box className={classes.dashboard_page}>
      <Typography variant="h4" fontWeight="bold" sx={{ padding: "12px" }}>
        Dashboard
      </Typography>
      <Grid container padding={2}>
        <Grid item xl={12}>
          <ProjectOverview
            totalProjects="40"
            completed="12"
            progress="13"
            out="2"
          />
        </Grid>
        <Grid item xl={3} paddingTop={2}>
          <DashboardChart />
        </Grid>
        <Grid item xl={9} paddingTop={2} paddingLeft={2}>
          <ProjectTable />
        </Grid>
        <Grid xl={12}>
          <TeamsCard />
        </Grid>
      </Grid>
    </Box>
  );
}
