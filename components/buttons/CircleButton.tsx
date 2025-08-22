"use client"
import React, { FC } from "react"
import { motion } from "framer-motion"
import styles from "./CircleButton.module.css"

type CircleButtonProps = {
  icon: "Up" | "Down" | "Default" | "Right" | "Left"
  onClick: () => void
  bgColor?: string
}

const CircleButton: FC<CircleButtonProps> = ({ icon, onClick, bgColor = "black" }) => {
  const renderIcon = () => {
    switch (icon) {
      case "Up":
        
        const arrowUpImage = <img className={styles.icon} src="/assets/svgs/icons/arrowUp.svg" alt="arrow up"/>

        return arrowUpImage
      case "Down":

        const arrowDownImage = <img className={styles.icon} src="/assets/svgs/icons/arrowDown.svg" alt="arrow down"/>
        return arrowDownImage
      case "Left":
        return "⬅️"
      case "Right":
        return "➡️"
      default:
        return "⭕"
    }
  }

  return (
    <motion.button
      className={styles.button}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
      }}
      whileTap={{
        scale: 0.9,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {renderIcon()}
    </motion.button>
  )
}

export default CircleButton
