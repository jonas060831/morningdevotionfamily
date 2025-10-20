"use client";
import { useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/loading/LoadingScreen";

import styles from './page.module.css'

const Dashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [loading, user, router]);

  if (loading) return <LoadingScreen />; // ✅ no premature redirect
  if (!user) return null;

  return <div className={styles.dashboardContainer}>
    Dashboard
  </div>;
};

export default Dashboard;
