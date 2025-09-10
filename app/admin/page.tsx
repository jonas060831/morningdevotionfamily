"use client";
import { useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/loading/LoadingScreen";

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

  console.log(user)

  return <div style={{ height: '76vh' }}>
    Dashboard
  </div>;
};

export default Dashboard;
