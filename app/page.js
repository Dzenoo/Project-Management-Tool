"use client";

import DashboardChart from "@/components/dashboard/components/DashboardChart";
import ProjectOverview from "@/components/dashboard/components/ProjectOverview";
import ProjectTable from "@/components/dashboard/components/ProjectTable";
import TeamsCard from "@/components/dashboard/components/TeamsCard";
import { Grid, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <>
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
        <Grid>
          <TeamsCard />
        </Grid>
      </Grid>
    </>
  );
}
