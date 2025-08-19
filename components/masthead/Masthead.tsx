"use client"
import React from 'react'
import styles from './Masthead.module.css'
import OutlineButton from '../buttons/OutlineButton'

const Masthead = () => {
  return (
    <div className={styles.masthead_container}>
        
        <img
         className={styles.dtcLogo}
         src="/assets/images/logos/dtc.png" alt="dtc logo"
        />

        <p className={styles.header}>Devoted to Christ</p>

        <p className={styles.subheader}>Global Ministry</p>

        <OutlineButton
         children={
          <div className={styles.buttonContent}>
            <div className={styles.redDot}></div>
            <p>Watch Live</p>
          </div>
         }
         onClick={() => alert(123)}
         color='white'
        />
    </div>
  )
}

export default Masthead