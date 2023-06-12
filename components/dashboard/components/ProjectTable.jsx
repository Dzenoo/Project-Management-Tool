import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import classes from "@/styles/dashboard/dashboard.module.css";

function createData(name, team, date, status) {
  return { name, team, date, status };
}

const rows = [
  createData(
    "Networkly Web Application",
    "/images/graphic/bookmark.png",
    "20.02.2022",
    "In Progress"
  ),
  createData(
    "Networkly Web Application",
    "/images/graphic/bookmark.png",
    "20.02.2022",
    "Finished"
  ),
  createData(
    "Networkly Web Application",
    "/images/graphic/bookmark.png",
    "20.02.2022",
    "Cancelled"
  ),
  createData(
    "Networkly Web Application",
    "/images/graphic/bookmark.png",
    "20.02.2022",
    "Finished"
  ),
];

function ProjectTable() {
  return (
    <Card>
      <Box sx={{ padding: "12px" }}>
        <Typography fontWeight="bold" variant="p">
          Current Projects
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Project Name</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Team</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Start Date</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <Image src={row.team} width={20} height={20} alt="team" />
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">
                  <Box
                    sx={{ float: "right" }}
                    className={`${
                      (row.status === "In Progress" && "progress") ||
                      (row.status === "Cancelled" && "cancelled") ||
                      (row.status === "Finished" && "finished")
                    }`}
                  >
                    <Typography>{row.status}</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default ProjectTable;
