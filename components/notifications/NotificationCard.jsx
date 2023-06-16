import { Box, Card, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Image from "next/image";
import classes from "@/styles/notifications/notification.module.css";

const NotificationCard = ({ title, time, image }) => {
  return (
    <Card className={classes.notification_item}>
      <Image
        src={image}
        width={60}
        height={60}
        alt="notifi_img"
        style={{ borderRadius: "100px", border: "1.2px solid grey" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography fontWeight="bold" variant="p">
          {title}
        </Typography>
        <Typography color="textSecondary">{time}</Typography>
      </Box>
    </Card>
  );
};

NotificationCard.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default NotificationCard;
