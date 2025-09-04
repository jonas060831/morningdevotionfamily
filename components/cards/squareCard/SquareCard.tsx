"use client"
import React, { FC, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./SquareCard.module.css";

type SquareCardProps = {
  icon: string
  title: string
  description: string
  onClick?: () => void
};

const SquareCard: FC<SquareCardProps> = ({
  icon = "⭐️⭐️⭐️",
  title = "3 Stars",
  description = "3 star review",
  onClick
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" }); // trigger when almost in view

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      animate={{ scale: isInView ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <span className={styles.span}>{icon}</span>
      <p className={styles.h1}>{title}</p>
      <p className={styles.p}>{description}</p>
    </motion.div>
  );
};

export default SquareCard;
