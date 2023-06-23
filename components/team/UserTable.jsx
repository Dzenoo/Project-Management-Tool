"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

const UserTable = ({ team, searchValue, selectedSpecialize }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Mail</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Specialize</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Social</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {team.teamMembers.length > 0 &&
            team.teamMembers
              .filter((tm) => {
                const nameMatch =
                  tm.first_name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  tm.last_name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());

                const selectedFilter =
                  selectedSpecialize === "" ||
                  tm.specialize === selectedSpecialize;
                return nameMatch && selectedFilter;
              })
              .map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    sx={{ display: "flex", gap: "12px", alignItems: "center" }}
                  >
                    <Image src={row.image} width={60} height={60} alt="team" />
                    <strong>
                      {row.first_name} {row.last_name}
                    </strong>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="textSecondary">{row.email}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <span style={{ marginRight: "12px" }} className={"workAs"}>
                      {row.specialize}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <div>
                      <Link href={row.github}>
                        <Image
                          src={"/images/graphic/linkedin.png"}
                          width={30}
                          height={30}
                          style={{ marginRight: "12px" }}
                          alt="linkedin"
                        />
                      </Link>
                      <Link href={row.linkedin}>
                        <Image
                          src={"/images/graphic/github.png"}
                          width={30}
                          height={30}
                          alt="github"
                        />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

UserTable.propTypes = {
  team: PropTypes.object,
  searchValue: PropTypes.string,
  selectedSpecialize: PropTypes.string,
};

export default UserTable;
