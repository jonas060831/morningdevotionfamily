"use client";
import styles from "./LeftSideNav.module.css";
import { useAuth } from "@/app/context/Authcontext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLayout } from "@/app/context/LayoutProvider";
import { useEffect, useRef } from "react";

const LeftSideNav = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const { openSidebar, closeSidebar } = useLayout();
  const ref = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/broadcast", label: "Broadcast" },
    { href: "/admin/settings", label: "Settings" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close if left sidebar is open
      if (openSidebar === "left" && ref.current && !ref.current.contains(event.target as Node)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSidebar, closeSidebar]);

  if (!user) return null;

  return (
    <aside
      ref={ref}
      className={`${styles.container} ${openSidebar === "left" ? styles.open : ""}`}
    >
      <nav className={styles.nav}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${pathname === link.href ? styles.active : ""}`}
            onClick={closeSidebar}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default LeftSideNav;
