import { ResendConf } from "@/conf/conf";
import { resend } from "@/helper/resend";
import ResetPasswordEmail from "../../emails/ResetPasswordEmail";
import PasswordChangedSuccessfullyEmail from "../../emails/PasswordChangedSuccessfullyEmail";
import VerificationEmail from "../../emails/VerificationEmail";
import OnboardingEmail from "../../emails/OnboardingEmail";

interface Response {
  success: boolean;
  message: string;
}

interface sendmailProps {
  emailTo: string;
  verifyCode?: string;
  username?: string;
  subject: string;
  resetLink?: string;
  emailType: EmailType;
}

export enum EmailType {
  Verification = "verification",
  Welcome = "welcome",
  ResetPassword = "resetPassword",
  PasswordChangedSuccessfully = "passwordResetSuccessfully",
}

export async function sendmail({
  emailTo,
  verifyCode,
  username = "there",
  subject,
  emailType,
  resetLink,
}: sendmailProps): Promise<Response> {
  try {
    // Validate subject
    if (!subject) {
      return { success: false, message: "Subject is required" };
    }

    let emailComponent: JSX.Element | null = null;

    // Choose the React component based on the email type
    switch (emailType) {
      case EmailType.Verification:
        if (!verifyCode) {
          return { success: false, message: "Verification code is required" };
        }
        emailComponent = VerificationEmail({ verificationCode: verifyCode });
        break;

      case EmailType.Welcome:
        if (!username) {
          return { success: false, message: "Username is required" };
        }
        emailComponent = OnboardingEmail({ userFirstname: username });
        break;

      case EmailType.ResetPassword:
        if (!resetLink) {
          return { success: false, message: "Reset password link is required" };
        }
        emailComponent = ResetPasswordEmail({
          userFirstname: username,
          resetPasswordLink: resetLink,
        });
        break;

      case EmailType.PasswordChangedSuccessfully:
        if (!username) {
          return { success: false, message: "Username is required" };
        }
        emailComponent = PasswordChangedSuccessfullyEmail({
          userFirstname: username,
        });
        break;

      default:
        return { success: false, message: "Invalid email type" };
    }

    // If emailComponent is still null, something went wrong
    if (!emailComponent) {
      return { success: false, message: "Failed to generate email component" };
    }

    const resendSentMailResponse = await resend().emails.send({
      from: ResendConf.FROM,
      to: emailTo,
      subject: subject,
      react: emailComponent,
    });
    console.log({ resendSentMailResponse });

    return {
      success: true,
      message: `Email sent successfully to ${emailTo}`,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email",
    };
  }
}
