"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'
import EmailAddressTextInput from '../inputs/text/EmailAddressTextInput'
import Image from 'next/image'

import styles from './EmailSubscription.module.css'
import { subscribeNewUser } from '@/app/(server)/subscribe'
import { useSystemMessage } from '../modals/notification/systemMessage/SystemMessageManager'
import { sendSubscriptionConfirmationEmailToClient } from '@/app/(server)/emails/clients/subscription'
import { renderToStaticMarkup } from 'react-dom/server'
import TestEmail from '@/emails/test-email'
import SubscriptionConfirmationClient from '@/emails/SubscriptionConfirmationClient'

const EmailSubscription = () => {

  const [formData, setFormData] = useState({ subscriber: '' })
  const [loading, setLoading] = useState<boolean>(false)

  const { showMessage } = useSystemMessage()
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    
    event.preventDefault()
    setLoading(true)


    if(!formData.subscriber) {
      
      showMessage('Email field cannot be empty', "info")
      setLoading(false)
    } else {

      //submission
      try {
        
      //save email to db
      const res = await subscribeNewUser(formData)

      //send subscription confirmation email to client
      const subscriptionConfirmationEmailToClient = renderToStaticMarkup(
        <SubscriptionConfirmationClient />
      )
      


      if(res.success) {
        
        //reset
        setFormData({subscriber: "" })
        
        const res2 = await sendSubscriptionConfirmationEmailToClient(formData.subscriber, subscriptionConfirmationEmailToClient)

        res2.success ? showMessage(res.message, "success") : showMessage(res.error, "error")
        
      } else {
        showMessage(res.error, "error")
        
      }
      setLoading(false)
      
    } catch (error) {

      const errMsg = error instanceof Error ? error.message : "Unknown error";

      showMessage(errMsg, "error")
      setLoading(false)
    }
    }
    
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData(prev => ({...prev, [name]: value }))
  }

  return (
    <form
     className={styles.form}
     onSubmit={handleSubmit}
    >
        <p className={styles.header}>
            Subscribe to receive our latest updates directly in your inbox!
        </p>

        <div className={styles.emailAddressContainer}>
            <EmailAddressTextInput
             name='subscriber'
             onChange={handleInput}
             value={formData.subscriber}
            />

            {
              loading ?
              (
                <span className={styles.iconContainer}>
                    <Image src='/assets/svgs/icons/loading.svg' fill alt='loading icon'/>
                </span>
              ):
              (
              <button type='submit' className={styles.iconContainer}>
                <Image src='/assets/svgs/icons/send.svg' fill alt='send icon'/>
              </button>
              )
            }
        </div>
    </form>
  )
}

export default EmailSubscription