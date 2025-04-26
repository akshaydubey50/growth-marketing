import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Section,
  Text,
} from "@react-email/components";
import EmailFooter from "./EmailFooter";

interface ResetPasswordEmailProps {
  userFirstname: string;
  resetPasswordLink: string;
}

export const ResetPasswordEmail = ({
  userFirstname,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={text}>Hi {userFirstname} 👋,</Text>
            <Text style={text}>No worries — let’s get you back on track!</Text>
            <Text style={textBold}>
              Click the button below to reset your password:
            </Text>
            <Section style={buttonContainer}>
              <Button style={button} href={resetPasswordLink}>
                Reset My Password
              </Button>
            </Section>
            <Text style={text}>
              For your security, this link will expire in 10 minutes.
            </Text>
            <Text style={text}>
              Need help? Just reply to this email, and we’ll assist you right
              away.
            </Text>
            <EmailFooter />
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ResetPasswordEmail.PreviewProps = {
  userFirstname: "",
  resetPasswordLink: "",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0px",
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontWeight: "400",
  // padding: "0px 35px"
};
const textBold = {
  ...text,
  fontWeight: 700,
};

const button = {
  fontWeight: "700",
  backgroundColor: "#2bb656",
  borderRadius: "4px",
  color: "#ffffff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
};

const upperSection = { padding: "25px 35px" };
const buttonContainer = {
  textAlign: "start" as const,
  margin: "20px 0",
};
const footerCenter = {
  ...footer,
  textAlign: "center" as const,
};
