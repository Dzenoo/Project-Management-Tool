"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import classes from "@/styles/navigation/MainNavigation.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/Auth/useAuth";

const MainNavigation = () => {
  const { logout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const menuClasses = menuIsOpen
    ? `${classes.main_navigation}`
    : `${classes.main_navigation} ${classes.open}`;

  const arrClasses = menuIsOpen
    ? `${classes.arr}`
    : `${classes.arr} ${classes.open}`;

  return (
    <Card className={menuClasses}>
      {menuIsOpen ? (
        <Link href="/">
          <Image
            src="/images/graphic/log.png"
            width={70}
            height={70}
            alt="logo"
          />
        </Link>
      ) : (
        <Link href="/">
          <Image
            src="/images/graphic/logooo.png"
            width={200}
            height={60}
            alt="logo"
          />
        </Link>
      )}
      <CardContent>
        {!user?.token && (
          <div>
            <Link href="/login">
              <Button variant="contained">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="contained">Signup</Button>
            </Link>
          </div>
        )}
        {user?.token && (
          <MenuList className={classes.menu_list}>
            <Link href="/">
              <MenuItem className={classes.menu_item}>
                <Image
                  src="/images/graphic/dashboard.png"
                  width={30}
                  height={30}
                  alt="dashboard"
                />
                <span className={classes.menu_wider}>
                  <Typography variant="p" fontWeight="bold">
                    Dashboard
                  </Typography>
                </span>
              </MenuItem>
            </Link>
            <Link href="/projects">
              <MenuItem className={classes.menu_item}>
                <Image
                  src="/images/graphic/layers.png"
                  width={30}
                  height={30}
                  alt="projects"
                />
                <span className={classes.menu_wider}>
                  <Typography variant="p" fontWeight="bold">
                    Projects
                  </Typography>
                </span>
              </MenuItem>
            </Link>
            <Link href="/tasks">
              <MenuItem className={classes.menu_item}>
                <Image
                  src="/images/graphic/clipboard.png"
                  width={30}
                  height={30}
                  alt="tasks"
                />
                <span className={classes.menu_wider}>
                  <Typography variant="p" fontWeight="bold">
                    Tasks
                  </Typography>
                </span>
              </MenuItem>
            </Link>
            <Link href="/notifications">
              <MenuItem className={classes.menu_item}>
                <Image
                  src="/images/graphic/notifications.png"
                  width={30}
                  height={30}
                  alt="notifications"
                />
                <span className={classes.menu_wider}>
                  <Typography variant="p" fontWeight="bold">
                    Notifications
                  </Typography>
                </span>
              </MenuItem>
            </Link>
            <Link href="/team">
              <MenuItem className={classes.menu_item}>
                <Image
                  src="/images/graphic/posts.png"
                  width={30}
                  height={30}
                  alt="team"
                />
                <span className={classes.menu_wider}>
                  <Typography variant="p" fontWeight="bold">
                    Team
                  </Typography>
                </span>
              </MenuItem>
            </Link>
            <Link href="/settings">
              <MenuItem className={classes.menu_item}>
                <Image
                  src="/images/graphic/setting.png"
                  width={30}
                  height={30}
                  alt="settings"
                />
                <span className={classes.menu_wider}>
                  <Typography variant="p" fontWeight="bold">
                    Settings
                  </Typography>
                </span>
              </MenuItem>
            </Link>
          </MenuList>
        )}
      </CardContent>
      {user?.token && (
        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
      )}
      <CardActions>
        <Button onClick={() => setMenuIsOpen((prevMenu) => !prevMenu)}>
          <Image
            className={arrClasses}
            src="/images/graphic/right-arrow.png"
            width={30}
            height={30}
            alt="openMenu"
          />
        </Button>
      </CardActions>
    </Card>
  );
};

export default MainNavigation;
