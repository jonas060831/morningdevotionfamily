"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import styles from "./Navbar.module.css";

const scrollTreshold = 600;
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const snapContainer = document.querySelector(".snap_container");

    const handleScroll = () => {
      const currentScrollY = snapContainer?.scrollTop ?? 0;

      // Slide-down effect after 600px
      if (currentScrollY > scrollTreshold && !scrolled) {
        setScrolled(true);
        controls.start({ y: 0 });
      } else if (currentScrollY <= scrollTreshold && scrolled) {
        setScrolled(false);
        controls.set({ y: 0 });
      }

      // Hide navbar while scrolling down before threshold
      if (currentScrollY < scrollTreshold && currentScrollY > lastScrollY) {
        controls.start({ y: -100 });
      }

      setLastScrollY(currentScrollY);
    };

    snapContainer?.addEventListener("scroll", handleScroll);
    return () => snapContainer?.removeEventListener("scroll", handleScroll);
  }, [scrolled, controls, lastScrollY]);

  return (
    <>
      <div
        className={`${menuOpen ? styles.overlay : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      ></div>

      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.fixed : ""}`}
        initial={{ y: 0 }}
        animate={controls}
        transition={{
          y: { type: "spring", stiffness: 200, damping: 35 },
        }}
      >
        <div className={styles.navContainer}>
          <div className={styles.logo}></div>

          {/* Desktop Menu */}
          <ul className={styles.navLinks}>
            <Link href="/give">Give</Link>
            <Link href="/services">Services</Link>
            <Link href="/roots">Roots</Link>
            <Link href="/Contacts">Contacts</Link>
          </ul>

          {/* Hamburger Button */}
          <div
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              className={styles.menuButton}
              src="/assets/svgs/icons/menu.svg"
              alt="menu icon"
            />
          </div>

          {/* Mobile Slide-In Menu */}
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: "100%" }}
            animate={{ x: menuOpen ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <ul>
              <Link href="/give" onClick={() => setMenuOpen(false)}>Give</Link>
              <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
              <Link href="/roots" onClick={() => setMenuOpen(false)}>Roots</Link>
              <Link href="/Contacts" onClick={() => setMenuOpen(false)}>Contacts</Link>
            </ul>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
