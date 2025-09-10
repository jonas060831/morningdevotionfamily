"use client";

import { useAuth } from "@/app/context/Authcontext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLayout } from "@/app/context/LayoutProvider";
import styles from "./RightSideNav.module.css";
import { useEffect, useRef } from "react";

const RightSideNav = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const { openSidebar, closeSidebar } = useLayout();
  const sidebarRef = useRef<HTMLDivElement>(null);


  const links = [
    { href: "/admin/notifications", label: "Notifications" },
    { href: "/admin/profile", label: "Profile" },
    { href: "/admin/support", label: "Support" },
  ];

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        openSidebar === "right"
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSidebar, closeSidebar]);

  if (!user) return null;

  return (
    <aside
      ref={sidebarRef}
      className={`${styles.container} ${
        openSidebar === "right" ? styles.open : ""
      }`}
    >
      <nav className={styles.nav}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${
              pathname === link.href ? styles.active : ""
            }`}
            onClick={closeSidebar}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default RightSideNav;
