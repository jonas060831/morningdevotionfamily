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

export const SubscriptionConfirmationClient = () => {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to Morning Devotion Family — Your daily encouragement
        awaits!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={title}>Welcome to Morning Devotion Family</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Hello Friend,
            </Text>

            <Text style={paragraph}>
              Thank you for subscribing to <strong>Morning Devotion Family</strong>.  
              Each day, you’ll receive encouragement, scripture, and reflections 
              to help you start your mornings with peace, clarity, and faith.
            </Text>

            <Text style={paragraph}>
              We’re so glad to have you with us on this journey of growth and devotion.
            </Text>

            <Text style={paragraph}>
              Stay tuned — your first devotion will arrive in your inbox tomorrow morning.  
            </Text>

            <Section style={{ textAlign: "center", marginTop: "30px" }}>
              <Link href="https://morningdevotionfamily.com" style={button2}>
                Visit Our Website
              </Link>
            </Section>

            <Text style={{ ...paragraph, marginTop: "40px", fontSize: "12px", color: "#888" }}>
              If you didn’t sign up for this, you can safely ignore this email.
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

export default SubscriptionConfirmationClient;

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
  backgroundColor: "#3182ce",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
};


const button2 = {
  display: "inline-block",
  backgroundColor: "white",
  color: "black",
  padding: "12px 24px",
  borderRadius: "100vw",
  border: "2px solid black",
  textDecoration: "none",
  fontWeight: "bold",
  fontFamily: ""
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
