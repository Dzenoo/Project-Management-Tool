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

const MainNavigation = () => {
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
        <Image
          src="/images/graphic/log.png"
          width={70}
          height={70}
          alt="logo"
        />
      ) : (
        <Image
          src="/images/graphic/logooo.png"
          width={200}
          height={60}
          alt="logo"
        />
      )}
      <CardContent>
        <MenuList className={classes.menu_list}>
          <MenuItem className={classes.menu_item}>
            <Link href="/">
              <Image
                src="/images/graphic/dashboard.png"
                width={30}
                height={30}
                alt="dashboard"
              />
            </Link>
            <Link href="/" className={classes.menu_wider}>
              <Typography variant="p" fontWeight="bold">
                Dashboard
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem className={classes.menu_item}>
            <Link href="/projects">
              <Image
                src="/images/graphic/layers.png"
                width={30}
                height={30}
                alt="projects"
              />
            </Link>
            <Link href="/projects" className={classes.menu_wider}>
              <Typography variant="p" fontWeight="bold">
                Projects
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem className={classes.menu_item}>
            <Link href="/tasks">
              <Image
                src="/images/graphic/clipboard.png"
                width={30}
                height={30}
                alt="tasks"
              />
            </Link>
            <Link href="/tasks" className={classes.menu_wider}>
              <Typography variant="p" fontWeight="bold">
                Tasks
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem className={classes.menu_item}>
            <Link href="/notifications">
              <Image
                src="/images/graphic/notifications.png"
                width={30}
                height={30}
                alt="notifications"
              />
            </Link>
            <Link href="/notifications" className={classes.menu_wider}>
              <Typography variant="p" fontWeight="bold">
                Notifications
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem className={classes.menu_item}>
            <Link href="/team">
              <Image
                src="/images/graphic/posts.png"
                width={30}
                height={30}
                alt="team"
              />
            </Link>
            <Link href="/team" className={classes.menu_wider}>
              <Typography variant="p" fontWeight="bold">
                Team
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem className={classes.menu_item}>
            <Link href="/settings">
              <Image
                src="/images/graphic/setting.png"
                width={30}
                height={30}
                alt="settings"
              />
            </Link>
            <Link href="/settings" className={classes.menu_wider}>
              <Typography variant="p" fontWeight="bold">
                Settings
              </Typography>
            </Link>
          </MenuItem>
        </MenuList>
      </CardContent>
      <div></div>
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
