"use client";
import styles from "./page.module.css";
import {Button} from '@mui/material'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getIPData } from "./hooks/Geolocation";
export default function Home() {
  const { data: session } = useSession();
  if (session === null) {
    // redirect("/login");
  }
  return (
    <main className={styles.main}>
    

      <div className={styles.center}>
        
<Button onClick={getIPData}>Get Started</Button>
      </div>

      <div className={styles.grid}>
  
      </div>
    </main>
  );
}
