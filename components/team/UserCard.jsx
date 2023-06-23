import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import classes from "@/styles/team/team.module.css";
import PropTypes from "prop-types";
import Link from "next/link";

const UserCard = ({ image, fname, lname, workAs, email, github, linkedin }) => {
  return (
    <Card className={classes.team_user_card}>
      <Box className={classes.team_user_header}>
        <div className={classes.team_user_links}>
          <Link href={github}>
            <Image
              src={"/images/graphic/linkedin.png"}
              width={30}
              height={30}
              alt="linkedin"
            />
          </Link>
          <Link href={linkedin}>
            <Image
              src={"/images/graphic/github.png"}
              width={30}
              height={30}
              alt="github"
            />
          </Link>
        </div>
      </Box>
      <Box className={classes.team_user_content}>
        <Image
          src={image}
          width={120}
          height={120}
          alt={fname}
          style={{ borderRadius: "100px" }}
        />
        <Typography fontWeight="bold" variant="h6">
          {fname} {lname}
        </Typography>
        <Typography fontWeight="bold" variant="p" className={"workAs"}>
          {workAs}
        </Typography>
        <Typography color="textSecondary">{email}</Typography>
      </Box>
    </Card>
  );
};
UserCard.propTypes = {
  image: PropTypes.string.isRequired,
  fname: PropTypes.string.isRequired,
  lname: PropTypes.string.isRequired,
  workAs: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
};

export default UserCard;
