import classes from "@/styles/dashboard/dashboard.module.css";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const DashboardChart = ({ tasks }) => {
  const todoTasks = tasks.filter((task) => task.status === "Todo");
  const doneTasks = tasks.filter((task) => task.status === "Done");
  const workTasks = tasks.filter((task) => task.status === "Work");
  const lagTasks = tasks.filter((task) => task.status === "Lag");

  const todo = (todoTasks.length / tasks.length) * 100;
  const done = (doneTasks.length / tasks.length) * 100;
  const work = (workTasks.length / tasks.length) * 100;
  const lag = (lagTasks.length / tasks.length) * 100;

  const data = {
    labels: ["Todo", "Work", "Lag", "Done"],
    datasets: [
      {
        data: [todo, work, lag, done],
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
      <Box className={classes.num}>
        <strong>{tasks.length}</strong>
      </Box>
    </Card>
  );
};

export default DashboardChart;
