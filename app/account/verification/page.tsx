"use client";
import { Container, Theme } from "@mui/material";
import Image from "next/image";
import { Label } from "./../../component/Label";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { AuthApi } from "@/app/services/auth";

export default function Verification() {
  const [state, setState] = useState();
  const params = useSearchParams();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const token = params.get("t");
        if (token) {
          await AuthApi.verifyAccount(token);
          // setState('success');
        }
      } catch (error) {}
    };
    verifyAccount();
  }, [params]);
  return (
    <Container sx={styles.container}>
      <Image
        style={styles.verify_icon}
        alt="verify"
        src={"/images/verification.gif"}
        width={100}
        height={100}
      />
      <Label sx={styles.label}>Just a minute</Label>
      <Label sx={styles.title}>Verifying your account</Label>
    </Container>
  );
}

const styles = {
  container: {
    width: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    gap: 2,
  },
  label: (theme: Theme) => ({
    fontSize: "18px",
    fontWeight: "500",
    color: theme.palette.text.primary,
  }),
  title: (theme: Theme) => ({
    fontSize: "20px",
    fontWeight: "600",
    color: theme.palette.text.primary,
  }),
  verify_icon: {
    borderRadius: 50,
  },
};
