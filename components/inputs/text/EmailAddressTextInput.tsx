import React, { ChangeEvent, FC } from 'react'

import styles from './EmailAddressTextInput.module.css'

type EmailAddressTextInputProps = {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}


const EmailAddressTextInput:FC<EmailAddressTextInputProps> = ({ name, value, onChange }) => {
  return (
    <input 
     type='email'
     className={styles.textInput}
     value={value}
     placeholder='Email'
     name={name}
     onChange={onChange}
    />
  )
}

export default EmailAddressTextInput