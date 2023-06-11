import classes from "@/styles/dashboard/dashboard.module.css";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const DashboardChart = () => {
  const data = {
    labels: ["To Do", "Work", "Error", "Done"],
    datasets: [
      {
        data: [34.2, 24.4, 23.4, 18],
        backgroundColor: ["#7638DC", "#F9CF62", "#DA2020", "#1CC800"],
      },
    ],
  };

  return (
    <Card className={classes.project_overview}>
      <Box className={classes.project_header}>
        <Typography variant="h6" fontWeight="bold">
          Task Overview
        </Typography>
        <hr />
      </Box>
      <CardContent className={classes.task_chart}>
        <Doughnut data={data} />
      </CardContent>
    </Card>
  );
};

export default DashboardChart;
