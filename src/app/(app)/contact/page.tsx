import type { Metadata } from "next";
import ContactScreen from "@/components/contact-us/ContactScreen";

export const metadata: Metadata = {
  title: "Contact - Growth Marketing Tools",
  description: "Get in touch with Growth Marketing Tools (CCF) for inquiries, feedback, or support. We're here to help you with all your Growth Marketing Toolsneeds."
};

export default function ContactUs() {
  return <ContactScreen />
}
