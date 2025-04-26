import { ResendConf } from "@/conf/conf";
import { Resend } from "resend";
export const resend = () => {
  if (ResendConf.API_KEY === undefined) {
    throw new Error("Please add RESEND_API_KEY env variable.");
  }

  return new Resend(ResendConf.API_KEY);
};
