import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
} from "@react-email/components";
import React from "react";

interface ContactFormConfirmationEmailClientProps {
  firstName: string;
  lastName: string;
  email: string;
  topic: string;
  message: string;
}

export const ContactFormConfirmationEmailClient: React.FC<ContactFormConfirmationEmailClientProps> = ({
  firstName = "John",
  lastName = "Doe",
  email = "johndoe@test.com",
  topic = "Prayer Request",
  message = "Requesting for a prayer as soon as possible",
}) => {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Preview>Your message has been received</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={title}>Hello {firstName},</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Thank you for contacting us! We have successfully received your message and our team will review it shortly.
            </Text>

            <Text style={paragraph}>
              <strong>Topic:</strong> {topic}<br />
              <strong>Message:</strong><br />
              {message.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Text>

            <Text style={paragraph}>
              We will get back to you as soon as possible. In the meantime, feel free to visit our website for updates and resources.
            </Text>

            <Section style={{ textAlign: "center", marginTop: "30px" }}>
              <Link href="https://morningdevotionfamily.com" style={button}>
                Visit Our Website
              </Link>
            </Section>

            <Text style={{ ...paragraph, marginTop: "40px", fontSize: "12px", color: "#888" }}>
              This is an automated confirmation email. Please do not reply to this email.
            </Text>
          </Section>

          {/* === FOOTER === */}
            <Section style={footer}>
                <Text style={footerText}>
                📍 Address: 22219 Avalon Blvd, Carson, CA 90745
                </Text>
                <Text style={footerText}>
                📞 Phone: 424-328-8947
                </Text>
                <Text style={footerText}>
                ⏰ Hours: Mon–Fri (by Appointment)<br />
                Sat – 3:00pm – 5:00pm<br />
                Sun – 10:00am – 3:00pm
                </Text>
            </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactFormConfirmationEmailClient;

// === STYLES ===
const main = {
  backgroundColor: "#f9f9f9",
  padding: "40px 0",
  fontFamily: "Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "30px",
  maxWidth: "600px",
  margin: "0 auto",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};

const header = {
  textAlign: "center" as const,
  marginBottom: "20px",
};

const title = {
  fontSize: "24px",
  color: "#2d3748",
};

const content = {
  marginTop: "10px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  marginBottom: "20px",
};

const button = {
  display: "inline-block",
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "50px",
  textDecoration: "none",
  fontWeight: "bold",
  fontFamily: "Poiret One",
};

const footer = {
  marginTop: "40px",
  paddingTop: "20px",
  borderTop: "1px solid #e5e5e5",
  fontSize: "13px",
  color: "#666",
  textAlign: "center" as const,
  lineHeight: "1.5",
};

const footerText = {
  margin: "4px 0",
};
