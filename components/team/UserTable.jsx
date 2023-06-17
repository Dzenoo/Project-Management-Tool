"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MenuItem, Select, Typography } from "@mui/material";
import Image from "next/image";
import classes from "@/styles/team/team.module.css";

const UserTable = ({ team }) => {
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
              <strong>Role</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Date Added</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {team.teamMembers.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" className={classes.name}>
                <Image src={row.image} width={60} height={60} alt="team" />
                <strong>
                  {row.firstName} {row.lastName}
                </strong>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary">{row.email}</Typography>
              </TableCell>
              <TableCell align="right">
                <span
                  style={{ marginRight: "12px" }}
                  className={
                    (row.role === "Admin" && "admin") ||
                    (row.role === "Manager" && "manager") ||
                    (row.role === "Team Member" && "teamember")
                  }
                >
                  {row.role}
                </span>
                <Select sx={{ width: "160px" }}>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary">{row.dateAdded}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
