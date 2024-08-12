import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Theme,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import { ColorModeContext } from "../styles/Theme";
import { ModeType } from "../utils";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import { SignButton } from "./SignInButton";
import { UsePathName } from "../hooks/UsePathName";
import { TabsLabel } from "./TabLabel";
import { useRouter } from "next/navigation";
import NavMenu from '../layout/mobile-menu-nav'

export default function BasicAppBar({

  mode,
  showMenu,
}: {
  mode: ModeType;
  showMenu?: () => void;
}) {
  const colorMode = React.useContext(ColorModeContext);
  const [open,setOpen]=useState(false)
  const ToggleDrawer = () => {
    setOpen(!open);
  }
  const path = UsePathName();

  const router = useRouter();

  const isLogin = path === "/login";
  const isSignUp = path === "/register";
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ backgroundColor: "transparent" }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <IconButton>
          <Avatar src={"/images/logGuard.png"} sx={styles.img} alt="logo" />
        </IconButton>

        <Box sx={styles.tabs}>
          <Box sx={styles.headerLeftCompoment}>
            <TabsLabel path="/" label="Home" />
            <TabsLabel path="/" label="  About" />
          </Box>
          <Box sx={styles.headerRightComponent}>
            <SignButton
              active={isLogin}
              title="Sign in"
          path={'/login'}
            />
            <SignButton
              active={isSignUp}
              title="Register"
             
              path={"/register"}
            />
          </Box>
        </Box>
        <Box sx={styles.rightComponent}>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {mode === "dark" ? (
              <Brightness4Icon color="inherit" />
            ) : (
              <DarkModeIcon color="action" />
            )}
          </IconButton>
          <Box sx={styles.menu}>
            <IconButton sx={{ ml: 1 }} onClick={ToggleDrawer} color="inherit">
              <MenuIcon color="action" />
            </IconButton>
          </Box>
          <NavMenu onCloseNav={ToggleDrawer} openNav={open}/>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const styles = {
  tabs: (theme: Theme) => ({
    width: "100%",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }),
  img:(theme: Theme)=>( {
    boxShadow: 'rgba(17, 12, 46, 0.1) 0px 48px 100px 0px',
   
    [theme.breakpoints.up("sm")]: {
      height: "40px",
      width: "40px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "30px",
      width: "30px",
    },
  }),

  headerLeftCompoment: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 2,
    gap: 5,
  },
  headerRightComponent: {
    width: "40%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 3,
    gap: 5,
  },

  rightComponent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  menu: (theme: Theme) => ({
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  }),
};
