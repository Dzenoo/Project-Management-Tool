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
import { AppContext } from "@/context/AppContext";
import { usePathname } from "next/navigation";
import { useFetch } from "@/hooks/Http/useFetch";
import { ClipLoader } from "react-spinners";

const ProjectSidebar = () => {
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("User"))
      : null;
  const { data: user } = useFetch(`/api/user/${userInfo?.userId}`);
  const [openFavorites, setOpenFavorites] = useState(true);
  const [openAllProjects, setOpenAllProjects] = useState(true);
  const { handleProjectInput } = useContext(AppContext);
  const pathname = usePathname();

  if (!user) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  const isTeam = user.teams.length > 0;

  const userProjects = user?.teams.reduce((acc, team) => {
    const teamProjects = team.projects.map((project) => project);
    return [...acc, ...teamProjects];
  }, []);

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
        {!isTeam && (
          <Typography textAlign="center">
            Create a team to get access to projects
          </Typography>
        )}
        {isTeam && (
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
          </CardContent>
        )}
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
