// import React from "react";

// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import Drawer from "@mui/material/Drawer";
// import ListItemButton from "@mui/material/ListItemButton";

// import { NAV } from "./config-layout";

// import { useResponsive } from "../../hooks/use-responsive";

// import Scrollbar from "../../component/scrollbar";

// import { LeftLinks } from "../../models/LeftLinks";
// export type PaletteMode = "light" | "dark";

// interface modetype {
//   mode: PaletteMode;
//   openNav: boolean;
//   onCloseNav: () => void;
//   toggleColorMode: () => void;
// }
// const Nav: React.FC<modetype> = ({
//   mode,
//   toggleColorMode,
//   onCloseNav,
//   openNav,
// }) => {
//   const upLg = useResponsive("up", "lg");

//   const handleClick = (navigateTo: () => void) => {
//     navigateTo();
//     onCloseNav();
//   };

//   const renderMenu = (
//     <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
//       {navConfig.map((item, index) => (
//         <NavItem
//           key={index}
//           title={item.title}
//           handleClick={() => handleClick(item.handleClick)}
//           label={item.lable}
//         />
//       ))}
//     </Stack>
//   );

//   const renderContent = (
//     <Scrollbar
//       sx={{
//         height: 1,

//         paddingTop: "100px",
//         "& .simplebar-content": {
//           height: 1,
//           display: "flex",
//           flexDirection: "column",
//         },
//       }}
//     >
//       {renderMenu}
//     </Scrollbar>
//   );

//   return (
//     <Box>
//       {upLg && (
//         <Box>
//           <LeftLinks mode={mode} toggleColorMode={toggleColorMode} />
//         </Box>
//       )}
//       {!upLg && (
//         <Drawer
//           open={openNav}
//           onClose={onCloseNav}
//           PaperProps={{
//             sx: (theme) => ({
//               width: NAV.WIDTH,
//               backgroundColor:
//                 theme.palette.mode === "dark"
//                   ? theme.palette.grey[900]
//                   : `${theme.palette.grey[50]} !important`,
//             }),
//           }}
//         >
//           {renderContent}
//         </Drawer>
//       )}
//     </Box>
//   );
// };

// const NavItem: React.FC<NavItemProps> = ({ title, handleClick, label }) => {
//   return (
//     <ListItemButton
//       sx={{
//         minHeight: 44,
//         borderRadius: 0.75,
//         typography: "body2",
//         color: "text.secondary",
//         textTransform: "capitalize",
//         fontWeight: "fontWeightMedium",
//       }}
//       onClick={() => {
//         handleClick();
//       }}
//     >
//       <Box
//         component="span"
//         sx={(theme) => ({
//           width: 24,
//           fontWeight: "bold",
//           height: 24,
//           mr: 2,
//           color:
//             theme.palette.mode === "dark"
//               ? "rgb(147, 238, 155)"
//               : theme.palette.grey[800],
//         })}
//       >
//         {label}
//       </Box>
//       <Box component="span" sx={{ fontWeight: "bold" }}>
//         {title}
//       </Box>
//     </ListItemButton>
//   );
// };

// export default Nav;