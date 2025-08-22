"use client"
import React, { useRef } from 'react'
import styles from './PastorBiography.module.css'
import ContainerWithBorder from '../containerWithBorder/ContainerWithBorder'
import Image from 'next/image'
import { useInView, motion } from 'framer-motion'


const PastorBiography = () => {

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })
  return (
    <ContainerWithBorder>

        <div
         ref={ref}
        >

            {
                isInView && (
                   <motion.div
                     transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                     initial={{ scale: 0}}
                     animate={{scale: 1 }}
                     style={{
                         width: '80vw',
                         padding: '1rem',
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center',
                         justifyContent: 'center'
                     }}
                    >
                        <div className={styles.pastorPicture}>
                            <Image
                            src="/assets/images/pictures/pbong.png"
                            alt='pastor picture'
                            fill
                            />
                        </div>

                        <p className={styles.description}>
                            Rev. Bong Buenaflor was born and raised in the City of Manila in Philippines. The 3rd child in a family of two girls and one boy. 
                            Rev. Bong gave his life to Jesus Christ at a crusade held at a Hotel in Dubai United Arab Emirates where he was based for 15 Years. 
                            At the Age of 30 He met the Lord and began experiencing the Glory of God and transformed his life as a true follower of Christ. 
                            Having a background in Music during his younger days, he served as a Musician/Musical Director one year after his conversion, and so 
                            began 4 years in his ministry on Dubai. On March 14, 2010, he was ordained as an Elder in Grace Covenant Church International. 
                            He then started his desire to in becoming a Pastor while working in United Arab Emirates and officially ordained and Obtain his Theological Studies. 
                            Migrated to the United States in September 2019 and became Lead Pastor of Harvest Community Bible Church Resonate located in Buena Park California. 
                            In August of that following year He started a church in Carson California. 
                            Rev. Bong Buenaflor holds a Ministerial Diploma in Pastoral Ministry, a Bachelors Degree in Theology, a MA in Theology, 
                            a Certificate in Middle East Diaspora Ministry and Certificate in Leadership and as a Leadership Mentor and Trainor. 
                            <br />
                            His philosophy is that one should find his or her purpose in life, and understand that this purpose should fit into God’s purpose and destiny of one’s life.
                        </p>
                    </motion.div> 
                )
            }

        </div>
    </ContainerWithBorder>
  )
}

export default PastorBiography