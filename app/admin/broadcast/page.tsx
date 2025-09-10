"use client"
import { useAuth } from '@/app/context/Authcontext';
import LoadingScreen from '@/components/loading/LoadingScreen';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Broadcast = () => {

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [loading, user, router]);

  if (loading) return <LoadingScreen />; // ✅ no premature redirect
  if (!user) return null;


  return (
    <div>Broadcast</div>
  )
}

export default Broadcast