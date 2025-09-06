import React from 'react'
import styles from './Footer.module.css'
import Image from 'next/image'
import Link from 'next/link'
import EmailSubscription from '../subscribe/EmailSubscription'

const siteMap = [
    { text: 'Home', url: '/' },
    { text: 'Give', url: '/give' },
    { text: 'Roots', url: 'roots' },
    // { text: 'Essence', url: '' },
    // { text: 'User Agreement', url: '' },
    { text: 'Services', url: '/services' },
    { text: 'Contacts', url: '/contacts' },
    // { text: 'Privacy Policy', url: '' },
    // { text: 'Feedback', url: '' },
    // { text: 'Our Community', url: '' },
    // { text: 'FAQs', url: '' }
]

const socials = [
    { company: 'facebook', url: '', icon: <div className={styles.socialContainer}> <Image src="/assets/svgs/socials/fb.svg" alt='fb' fill/> </div>},
    { company: 'instagram', url: '', icon: <div className={styles.socialContainer}> <Image src="/assets/svgs/socials/instagram.svg" alt='insta' fill/> </div>},
     { company: 'youtube', url: '', icon: <div className={styles.socialContainer}> <Image src="/assets/svgs/socials/youtube.svg" alt='youtube' fill/> </div>},
]

const Footer = () => {
  return (
    <div
     className={styles.container}
    >
        
        <div
         className={styles.item}
        >
            <div className={styles.imageContainer}>
                <Image src="/assets/images/logos/logoFull.webp" fill alt="full logo"/>
            </div>

            <div className={styles.sitemapContainer}>

                {
                    siteMap.map((item, id) => 
                    (
                        <Link
                         className={styles.siteMapItem}
                         key={id}
                         href={item.url}
                        >
                            {item.text}
                        </Link>
                    ))
                }

            </div>

        </div>
        <div
         className={styles.item}
        >
            <div className={styles.emailSubscriptionContainer}>
                <EmailSubscription />
            </div>

            <div className={styles.socialsContainer}>
                {
                    socials.map((social, id) => (
                        <Link key={id} href={social.url}>{social.icon}</Link>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Footer