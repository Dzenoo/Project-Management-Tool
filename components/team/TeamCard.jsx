import { Card, Typography } from "@mui/material";
import classes from "@/styles/team/team.module.css";
import Image from "next/image";
import PropTypes from "prop-types";
import Link from "next/link";

const TeamCard = ({ id, image, teamName, teamDescription, dateCreated }) => {
  return (
    <Card className={classes.team_card}>
      <Image src={image} width={200} height={200} alt="img" />
      <Link href={`/team/${id}`}>
        <Typography variant="h4" fontWeight="bold">
          {teamName}
        </Typography>
      </Link>
      <Typography color="textSecondary" fontWeight="bold">
        {new Date(dateCreated).toLocaleDateString()}
      </Typography>
      <Typography color="textSecondary">{teamDescription}</Typography>
    </Card>
  );
};

TeamCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  teamDescription: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
};

export default TeamCard;
