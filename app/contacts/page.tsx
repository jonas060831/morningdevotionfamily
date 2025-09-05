import ChurchLeadership from '@/components/churchleadership/ChurchLeadership'
import ContactDetails from '@/components/contacts/ContactDetails'
import Footer from '@/components/footer/Footer'
import React from 'react'

const Contacts = () => {
  return (
    <div
     className="snapContainer"
    >
        <section
         className="snapItem"
         id="contactDetails"
        >
            <ContactDetails />
        </section>

        <section
         className="snapItem"
         id="churchLeadership"
        >
            <ChurchLeadership />
        </section>

        <section
        className="snapItemFooter"
        id="footer"
        >
          <Footer/>
        </section>

    </div>
  )
}

export default Contacts