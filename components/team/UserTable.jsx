"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, MenuItem, Select, Typography } from "@mui/material";
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
            <TableRow key={row.user.name}>
              <TableCell
                sx={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <Image src={row.user.image} width={60} height={60} alt="team" />
                <strong>
                  {row.user.first_name} {row.user.last_name}
                </strong>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary">{row.user.email}</Typography>
              </TableCell>
              <TableCell align="right">
                <span
                  style={{ marginRight: "12px" }}
                  className={
                    (row.role === "admin" && "admin") ||
                    (row.role === "Manager" && "manager") ||
                    (row.role === "member" && "teamember")
                  }
                >
                  {row.role}
                </span>
                <Select sx={{ width: "160px" }} value={row.role}>
                  <MenuItem value="admin">admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="member">member</MenuItem>
                </Select>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary">{row.dateAdded}</Typography>
              </TableCell>
              <TableCell align="right">
                <Button>
                  <Image
                    src={"/images/graphic/option.png"}
                    width={30}
                    height={30}
                    alt="options"
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
