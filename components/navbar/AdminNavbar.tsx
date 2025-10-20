"use client"
import React from 'react'
import styles from './AdminNavbar.module.css'
import Image from 'next/image'
import { useAuth } from '@/app/context/Authcontext'
import { useLayout } from '@/app/context/LayoutProvider'


const AdminNavbar = () => {

  const { user } = useAuth()

  const { toggleSidebar } = useLayout();


  if(!user) return null

  return (
    <nav
     className={styles.navbar}
    >

         <div
          className={styles.leftSideMenu}
          style={{ position: 'relative', width: "30px", height: "30px", rotate: "180deg" }}
          onClick={() => toggleSidebar("left")}
         >
            <Image src="/assets/svgs/icons/menu.svg" alt='menu' fill />
         </div>

         <div
          className={styles.userRightMenu}
          style={{ position: 'relative', width: "30px", height: "30px" }}
          onClick={() => toggleSidebar("right")}
         >
            <Image src="/assets/svgs/icons/user.svg" alt='menu' fill />
         </div>
    </nav>
  )
}

export default AdminNavbar