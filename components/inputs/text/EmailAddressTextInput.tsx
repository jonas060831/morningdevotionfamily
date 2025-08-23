import React from 'react'

import styles from './EmailAddressTextInput.module.css'

const EmailAddressTextInput = () => {
  return (
    <input 
     type='email'
     className={styles.textInput}
     placeholder='Email'
    />
  )
}

export default EmailAddressTextInput