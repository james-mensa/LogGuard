import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import { IconButton, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { navContent } from "./Content";

interface modetype {
  openNav: boolean;
  onCloseNav: () => void;
}
const Nav: React.FC<modetype> = ({ onCloseNav, openNav }) => {
  return (
    <Box>
      <Drawer
        open={openNav}
        onClose={onCloseNav}
        PaperProps={{
          sx: styles.drawer,
        }}
      >
        <Box>
          <RenderContent onClick={onCloseNav} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Nav;

interface ContentProps {
  onClick: () => void;
}
const RenderContent: React.FC<ContentProps> = ({ onClick }) => {
  return (
    <Stack direction="column" spacing={2} sx={styles.contentContainer}>
      {navContent.map((content, index) => {
        return (
          <IconButton key={index} onClick={onClick}>
            {content.component}
          </IconButton>
        );
      })}
    </Stack>
  );
};
const styles = {
  drawer: (theme: Theme) => ({
    width: "50%",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "#02020a"
        : `${theme.palette.grey[200]} !important`,
    padding: "80px 20px",
  }),
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",

    flexGrow: 1,
  },
};
