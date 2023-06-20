"use client";

import NotificationCard from "@/components/notifications/NotificationCard";
import classes from "@/styles/notifications/notification.module.css";
import { Box, Container, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const Notifications = () => {
  const { user } = useContext(AppContext);

  return (
    <Container maxWidth="xl" className={classes.notifications_container}>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Notifications
        </Typography>
        <Typography variant="p" color="textSecondary">
          Stay in the loop with important updates, personalized alerts, and
          notifications
        </Typography>
      </Box>
      <Box className={classes.notifications_cards}>
        {user.notifications.map((not) => {
          return (
            <NotificationCard
              key={not.id}
              title={not.message}
              time={new Date(not.date).toLocaleDateString()}
              image={not.image}
            />
          );
        })}
      </Box>
    </Container>
  );
};

export default Notifications;
