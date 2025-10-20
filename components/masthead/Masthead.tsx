"use client";
import React, { FC, useState } from "react";
import styles from "./Masthead.module.css";
import OutlineButton from "../buttons/OutlineButton";
import Image from "next/image";
import { motion } from "framer-motion";
import LiveStreamUI from "../livestream/LiveStreamUI";


type MastheadProps = {
  streamIOAPIKey: string
}
const Masthead:FC<MastheadProps> = ({ streamIOAPIKey }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLiveStreamModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <motion.div
        className={styles.masthead_container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      >
        <div style={{ position: "relative", width: "300px", height: "400px" }}>
          <Image
            src="/assets/images/logos/dtc.png"
            alt="dtc logo"
            fill
            style={{
              objectFit: "contain",
              pointerEvents: "none",
              outline: "none",
              filter: "drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.5))",
            }}
          />
        </div>

        <p className={styles.header}>Devoted to Christ</p>
        <p className={styles.subheader}>Global Ministry</p>

        <OutlineButton
          onClick={toggleLiveStreamModal}
          color="white"
        >
          <div className={styles.buttonContent}>
            <div className={styles.redDot}></div>
            <p>Watch Live</p>
          </div>
        </OutlineButton>
      </motion.div>

      {/* extracted livestream modal */}
      <LiveStreamUI
       isOpen={isOpen}
       onClose={() => setIsOpen(false)}
       streamIOAPIKey={streamIOAPIKey}
      />
    </>
  );
};

export default Masthead;
