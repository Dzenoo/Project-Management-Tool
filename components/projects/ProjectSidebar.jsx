"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import classes from "@/styles/projects/projects.module.css";
import Image from "next/image";
import { useContext, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Link from "next/link";
import { projects } from "@/data/projects.jsonData.config.json";
import { AppContext } from "@/context/AppContext";
import { usePathname } from "next/navigation";

const ProjectSidebar = () => {
  const [openFavorites, setOpenFavorites] = useState(true);
  const [openAllProjects, setOpenAllProjects] = useState(true);
  const [openArchived, setOpenArchived] = useState(true);
  const { handleProjectInput, isTeam, userProjects, user } =
    useContext(AppContext);
  const pathname = usePathname();
  const favoritedProjects = projects.filter((p) => p.type === "Favorites");
  const archivedProjects = projects.filter((p) => p.type === "Archived");

  return (
    <Card className={classes.projects_sidebar}>
      <Box>
        {pathname === "/projects" && (
          <div style={{ padding: "12px" }}>
            <TextField
              onChange={(e) => handleProjectInput(e)}
              label={"Search Projects"}
              placeholder="Search..."
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <Image
                        src="/images/graphic/posts.png"
                        width={20}
                        height={20}
                        alt="lg"
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        )}
        <CardContent className={classes.project_types}>
          {/* FAVORITES */}
          <ListItemButton
            className={classes.hover_favorites}
            onClick={() => setOpenFavorites((prevState) => !prevState)}
          >
            <ListItemText>
              <Typography fontWeight="bold" color="#FFD700">
                Favorites
              </Typography>
            </ListItemText>
            {openFavorites ? (
              <Image
                src="/images/graphic/upload.png"
                width={20}
                height={20}
                alt="ar"
              />
            ) : (
              <Image
                src="/images/graphic/down-arrow.png"
                width={20}
                height={20}
                alt="arro"
              />
            )}
          </ListItemButton>
          <Collapse in={openFavorites} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemText sx={{ pl: 2 }}>
                {user.favoritedProjects.map((fp) => (
                  <Link href={`/projects/${fp.id}`} key={fp.id}>
                    <ListItemButton>
                      <Typography variant="p" color="textSecondary">
                        {fp.name}
                      </Typography>
                    </ListItemButton>
                  </Link>
                ))}
              </ListItemText>
            </List>
          </Collapse>
          {/* ALL PROJECTS */}
          <ListItemButton
            className={classes.hover_all}
            onClick={() => setOpenAllProjects((prevState) => !prevState)}
          >
            <ListItemText>
              <Typography fontWeight="bold" color="#4CAF50">
                All Projects
              </Typography>
            </ListItemText>
            {openAllProjects ? (
              <Image
                src="/images/graphic/upload.png"
                width={20}
                height={20}
                alt="ar"
              />
            ) : (
              <Image
                src="/images/graphic/down-arrow.png"
                width={20}
                height={20}
                alt="arro"
              />
            )}
          </ListItemButton>
          <Collapse in={openAllProjects} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemText sx={{ pl: 2 }}>
                {userProjects.map((fp) => (
                  <Link href={`/projects/${fp._id}`} key={fp._id}>
                    <ListItemButton>
                      <Typography variant="p" color="textSecondary">
                        {fp.name}
                      </Typography>
                    </ListItemButton>
                  </Link>
                ))}
              </ListItemText>
            </List>
          </Collapse>
          {/* ARCHIVED PROJECTS */}
          <ListItemButton
            className={classes.hover_archived}
            onClick={() => setOpenArchived((prevState) => !prevState)}
          >
            <ListItemText>
              <Typography fontWeight="bold" color="#C0C0C0">
                Archived
              </Typography>
            </ListItemText>
            {openArchived ? (
              <Image
                src="/images/graphic/upload.png"
                width={20}
                height={20}
                alt="ar"
              />
            ) : (
              <Image
                src="/images/graphic/down-arrow.png"
                width={20}
                height={20}
                alt="arro"
              />
            )}
          </ListItemButton>
          <Collapse in={openArchived} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemText sx={{ pl: 2 }}>
                {archivedProjects.map((fp) => (
                  <Link href={`/projects/${fp.id}`} key={fp.id}>
                    <ListItemButton>
                      <Typography variant="p" color="textSecondary">
                        {fp.name}
                      </Typography>
                    </ListItemButton>
                  </Link>
                ))}
              </ListItemText>
            </List>
          </Collapse>
        </CardContent>
      </Box>
      {isTeam && (
        <CardActions>
          <Link href="/projects/create">
            <Button variant="contained" size="large" fullWidth>
              Create New Project
            </Button>
          </Link>
        </CardActions>
      )}
    </Card>
  );
};

export default ProjectSidebar;
