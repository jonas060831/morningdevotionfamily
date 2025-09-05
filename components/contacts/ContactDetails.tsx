"use client"
import churchData from "@/public/datas/churchData"
import TitleAndDescription from "../titleAndDescription/TitleAndDescription"
import styles from "./ContactDetails.module.css"
import Avatar from "../cards/avatar/Avatar"

const ContactDetails = () => {
  return (
    <>
        <div
         className={styles.container}
        >
            <TitleAndDescription
             title="Rest for those who come to me"
             titleFontSize={2}
             description={`Come to me, all you who are weary and burdened, and I will give you rest. \n\n Matthew 11:28`}
             descriptionFontSize={1}
            />

            <br />
            <h3>Get In Touch</h3>
            <hr />

            <div
             className={styles.flexContainer}
            >
                {
                    churchData.map((data, indx) => 
                        <Avatar
                         key={indx}
                         icon={data.icon}
                         header={data.header}
                         details={data.details}
                        />
                    )
                }
             
            </div>

        </div>
    </>
  )
}

export default ContactDetails