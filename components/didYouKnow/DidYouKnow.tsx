"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./DidYouKnow.module.css"

const didYouKnow = [
  { text: "Christianity is the world's largest religion, with over 2.3 billion followers globally." },
  { text: "The Bible, central to Christianity, is actually a collection of 66 books written over thousands of years." },
  { text: "Jesus Christ, the central figure of Christianity, was born over 2,000 years ago in Bethlehem." },
  { text: "The symbol of the cross represents Jesus’ crucifixion and the salvation offered to humanity." },
  { text: "Christianity has many denominations, including Catholicism, Protestantism, and Eastern Orthodoxy." },
  { text: "The Christian practice of baptism symbolizes the washing away of sins and spiritual rebirth." },
  { text: "Sunday is traditionally considered the Christian day of worship, commemorating Jesus’ resurrection." },
  { text: "The Lord’s Prayer, taught by Jesus, is one of the most widely recited prayers in the world." },
  { text: "Christianity emphasizes love, forgiveness, and compassion as key principles of faith." },
  { text: "The Nicene Creed, written in 325 AD, is a statement of Christian beliefs still recited by many churches today." }
]

const DidYouKnow = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")

  // Rotate the fact every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % didYouKnow.length)
      setDisplayedText("") // reset typewriter
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Typewriter effect
  useEffect(() => {
    const fullText = didYouKnow[currentIndex].text
    let i = 0

    const typingInterval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1))
      i++
      if (i === fullText.length) clearInterval(typingInterval)
    }, 40) // adjust typing speed here (ms per character)

    return () => clearInterval(typingInterval)
  }, [currentIndex])

  return (
    <div className={styles.container}>
      <span className={styles.header}>Did You Know ?</span>

      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          className={styles.text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {displayedText}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export default DidYouKnow
