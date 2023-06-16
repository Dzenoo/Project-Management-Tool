import { Card, Typography } from "@mui/material";
import classes from "@/styles/team/team.module.css";
import Image from "next/image";
import PropTypes from "prop-types";
import Link from "next/link";

const TeamCard = ({ id, image, teamName, teamDescription, dateCreated }) => {
  return (
    <Card className={classes.team_card}>
      <Image src={image} width={100} height={100} alt="img" />
      <Link href={`/team/${id}`}>
        <Typography variant="h4" fontWeight="bold">
          {teamName}
        </Typography>
      </Link>
      <Typography color="textSecondary" fontWeight="bold">
        {dateCreated}
      </Typography>
      <Typography color="textSecondary">{teamDescription}</Typography>
    </Card>
  );
};

TeamCard.propTypes = {
  image: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  teamDescription: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
};

export default TeamCard;
