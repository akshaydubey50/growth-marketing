import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Text,
} from "@react-email/components";
import EmailFooter from "./EmailFooter";

interface VerifyEmailProps {
  verificationCode: string;
}

export default function VerificationEmail({
  verificationCode,
}: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={text}>Hi there 👋,</Text>
            <Text style={text}>
              Thank you for choosing to sign up for Growth Marketing Tools!
            </Text>
            <Text style={textBold}>
              To complete your account creation process, please enter the
              verification code when prompted.
            </Text>

            <Section style={verificationSection}>
              <Text style={verifyText}>Verification code</Text>

              <Text style={codeText}>{verificationCode}</Text>

              <Text style={validityText}>
                (This code is valid for 10 minutes)
              </Text>
            </Section>
            <Text style={text}>
              Need help? Just reply to this email, and we&apos;ll assist you
              right away.
            </Text>
            <Text style={text}>
              Welcome to the ContentCreation.fyi community — we&apos;re excited
              to have you on board!
            </Text>
            <EmailFooter />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  fontWeight: "400",
};

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 0px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
};

const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };

const footer = {
  color: "#8898aa",
  fontSize: "14px",
};

const footerCenter = {
  ...footer,
  textAlign: "center" as const,
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const textBold = {
  ...text,
  fontWeight: 700,
};

const button = {
  fontWeight: "700",
  backgroundColor: "#2bb656",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
