"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./ContactUsForm.module.css";
import TextInputField from "../inputs/text/TextInputField";
import Image from "next/image";
import { useSystemMessage } from "@/components/modals/notification/systemMessage/SystemMessageManager";
import { renderToStaticMarkup } from "react-dom/server";
import ContactFormNotificationEmail from "@/emails/ContactFormNotificationAdmin";
import { sendContactMessageToAdmin, sendContactUsConfirmationToClient } from "@/app/(server)/contactUs";
import ContactFormConfirmationEmailClient from "@/emails/ContactFormConfirmationEmailClient";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    topic: "",
    message: "",
    receiveUpdates: false,
    urgent: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { showMessage } = useSystemMessage()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    setIsLoading(true)

    const requiredFields: { key: keyof typeof formData; label: string }[] = [
    { key: "firstName", label: "First name" },
    { key: "lastName", label: "Last name" },
    { key: "email", label: "Email" },
    { key: "topic", label: "Topic" },
    { key: "message", label: "Message" },
    ];

    // Find the first empty required field
    const emptyField = requiredFields.find(
      (field) => !formData[field.key].toString().trim()
    );

    if(emptyField) {
        showMessage(`${emptyField.label} cannot be empty`, "info");
        setIsLoading(false);
        return;
      }

    if(formData.receiveUpdates) console.log('subscribe the user as well')
    
    if(formData.urgent) {
      console.log('send a different email format')
    } else {

      //send the message to admin
      const contactAdminNotification = renderToStaticMarkup(
        <ContactFormNotificationEmail {...formData}/>
      )

      const contactUsConfirmationNotification = renderToStaticMarkup(
        <ContactFormConfirmationEmailClient {...formData}/>
      )

      try {

        //send the email
        const res = await sendContactMessageToAdmin(contactAdminNotification)
        
        console.log(res)
        if(res.success) {
          
          

          const res2 = await sendContactUsConfirmationToClient(contactUsConfirmationNotification, formData.email)

          if(res2.success) {
              showMessage(res.message, "success")
              
              //remove loading state
              setIsLoading(false)

              //reset form values
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                number: "",
                topic: "",
                message: "",
                receiveUpdates: false,
                urgent: false,
              })
          }
          
        }

      } catch (error) {
        console.log(error)
      }
    }

  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value, checked } = event.target as HTMLInputElement;

    setFormData((data) => ({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="gradientContainer">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Contact Us</h2>

        {/* First & Last Name */}
        <div className={styles.row}>
          <div className={styles.field}>
            <TextInputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <TextInputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email */}
        <div className={styles.field}>
          <TextInputField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className={styles.field}>
          <TextInputField
            label="Phone/Mobile #"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>

        {/* Subject / Topic */}
        <div className={styles.field}>
          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
          >
            <option value="">Select a topic</option>
            <option value="prayer">Prayer Request</option>
            <option value="counseling">Counseling</option>
            <option value="volunteering">Volunteering</option>
            <option value="events">Church Events</option>
            <option value="donations">Donations</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div className={styles.field}>
          <textarea
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
          />
        </div>

        {/* Checkboxes */}
        <div className={styles.checkboxGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="receiveUpdates"
              checked={formData.receiveUpdates}
              onChange={handleChange}
            />
            <span>I would like to receive updates about church events and ministries</span>
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="urgent"
              checked={formData.urgent}
              onChange={handleChange}
            />
            <span>This is an urgent matter requiring immediate attention</span>
          </label>
        </div>

        {/* Submit */}
        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
          {
            isLoading ? (
              <div style={{ position: 'relative', width: '100%', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src="/assets/svgs/icons/loadingwhite.svg" alt="" fill />
              </div>
            ) : (
              'Send Message'
            )
          }
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
