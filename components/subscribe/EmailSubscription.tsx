"use client"
import React from 'react'
import EmailAddressTextInput from '../inputs/text/EmailAddressTextInput'


import styles from './EmailSubscription.module.css'

const EmailSubscription = () => {
  return (
    <form>

        <p className={styles.header}>
            Subscribe to receive our latest updates directly in your inbox!
        </p>

        <div className={styles.emailAddressContainer}>
            <EmailAddressTextInput />
        </div>
    </form>
  )
}

export default EmailSubscription