"use client"
import React from 'react'
import styles from './UpDownControls.module.css'
import CircleButton from '../buttons/CircleButton'

const UpDownControls = () => {

  const handleClick = (direction: string) => {

    const upperSection = document.getElementById('servicesPreview')
    const belowSection = document.getElementById('didYouKnow')
    direction === 'up' ? upperSection?.scrollIntoView({behavior: "smooth"}) : belowSection?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <div
     className={styles.container}
    >
        <CircleButton
         icon="Up"
         onClick={() => handleClick('up')}
         bgColor='#494de0'
        />

        <CircleButton
         icon="Down"
         onClick={() => handleClick('down')}
         bgColor='#c6874d'
        />

    </div>
  )
}

export default UpDownControls