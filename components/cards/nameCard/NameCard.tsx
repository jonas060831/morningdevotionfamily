import React, { FC } from 'react'

import styles from './NameCard.module.css'
import getInitials from '@/app/utils/getInitials'

/*
 name: "Iris Bong Buenaflor",
        title: "Senior Pastor",
        email: "",
        phone: ""
    },
*/
type NameCardProps = {
 name: string
 title: string
 email: string
 phone: string

}

const NameCard:FC<NameCardProps> = ({ name, title, email, phone }) => {
  return (
    <div
     className={styles.card}
    >
      <span className={styles.initials}>
        {getInitials(name)}
      </span>
      
      <h3>{name}</h3>
      <h5>{title}</h5>
      <h5>{email}</h5>
      <h5>{phone}</h5>
    </div>
  )
}

export default NameCard