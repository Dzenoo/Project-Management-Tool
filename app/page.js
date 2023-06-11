"use client";

import ProjectOverview from "@/components/dashboard/components/ProjectOverview";
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
      </Grid>
    </>
  );
}
