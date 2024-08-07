"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  Theme,
  Stack,
  Divider,
} from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { InputText } from "../component/InputText";
import { Label } from "../component/Label";
import Image from "next/image";
import { blue, grey } from "@mui/material/colors";
import Link from "next/link";
import { PageLogButton } from "../component/SignInButton";
import { PlainButton } from "../component/PlainButton";
export default function Login() {
  const { data: session } = useSession();
  if (session) {
    redirect("/admin");
  }
  return (
    <Container sx={styles.container}>
      <Box sx={styles.leftComponent}>
      <Avatar src={"/images/log.png"} sx={styles.img_m} />
        <Label sx={styles.welcome}>{"Welcome to our \n community"}</Label>

        <Stack direction={"row"} width={'100%'}>
          <Box sx={styles.subtitle_container}>
            {" "}
            <Label sx={styles.subtitle}>
              {"A whole new journey \n start right here."}
            </Label>
          </Box>
          <Box sx={styles.leftIcon}>
            <Avatar src={"/images/log.png"} sx={styles.img} />
          </Box>
        </Stack>
      </Box>
      <Box sx={styles.rightComponent}>
        <InputText
          placeholder="Enter your email address"
          onChange={(v?: string) => {}}
        />
        <InputText
          type="password"
          placeholder="Enter your password"
          onChange={(v?: string) => {}}
        />
        <PageLogButton title="Login" onClick={() => {}} />
        <Link href="/">
          <Label sx={styles.forgot_password}>Forgot Password?</Label>
        </Link>

        <Stack
          width={"100%"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{}}
        >
          <Divider sx={styles.divider} />
          <Label sx={styles.indicator}>OR</Label>
          <Divider sx={styles.divider} />
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <PlainButton icon={'/images/google.png'} title="Google" onClick={() => signIn("github")}/>
          <PlainButton icon={'/images/github.png'} onClick={() => signIn("google")} title="Github"/>
        </Stack>
      </Box>

      <Box></Box>

      <div></div>
    </Container>
  );
}

const styles = {
  container: (theme: Theme) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "100vh",
   
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      paddingTop: 25,
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      paddingTop: 5,
      gap:3,
    },
  }),
  welcome: (theme: Theme) => ({
    fontWeight: "bold",
    fontStyle: "italic",
    color: theme.palette.primary.main,
    [theme.breakpoints.up("sm")]: {
      fontSize: "80px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
    },
  }),
  subtitle_container: (theme:Theme)=>( {
  width:'100%',
  display:'flex',flexDirection:'row',
  }),
  subtitle: (theme: Theme) => ({
    fontWeight: "bold",
    color: theme.palette.mode === "dark" ? grey[500] : grey[600],

    [theme.breakpoints.up("sm")]: {
      fontSize: "20px",
    },
      [theme.breakpoints.down("sm")]: {
        fontSize: "15px",
    },
  }),

  leftComponent: (theme: Theme) => ({
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      alignItems:'center'
    },
  }),
  leftIcon: (theme: Theme) => ({
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      position: "absolute",
      width: "50%",
    },
  }),
  img_m:(theme: Theme) => ({
    width: "150px",
    height: "150px",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
  
    },
  }),
  img: (theme: Theme) => ({
    width: "250px",
    height: "250px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      marginLeft: 50,
      marginTop: -20,
    },
  }),
  rightComponent: (theme: Theme) => ({
    width: "40%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 3,

    [theme.breakpoints.up("sm")]: {
      width: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  }),
  forgot_password: (theme: Theme) => ({
    fontSize: "14px",
    color: theme.palette.mode === "dark" ? blue[500] : blue[400],
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.down("sm")]: {},
  }),
  divider: (theme: Theme) => ({
    borderStyle: "dashed",
    width: "45%",
    height: "2px",
  }),
  indicator: (theme: Theme) => ({
    color: grey[600],
  }),
};
