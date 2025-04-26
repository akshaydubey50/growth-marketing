import React from "react";
import { Text } from "@react-email/components";
const EmailFooter = () => {
  return (
    <>
      <Text style={footer}>
        Stay creative!
        <br />
        Arpit Singh
        <br />
        CCF Team
      </Text>
      <Text style={footerCenter}>
        © 2024 Growth Marketing Tools. All Rights Reserved.
      </Text>
    </>
  );
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
};

const footerCenter = {
  ...footer,
  textAlign: "center" as const,
};

export default EmailFooter;
