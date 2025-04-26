export const AirtableConf = {
  BASE_ID: String(process.env.BASE_ID),
  BEARER_TOKEN: String(process.env.BEARER_TOKEN),
  TABLE_ID: String(process.env.TABLE_ID),
  BASE_URL: String(process.env.AIRTABLE_BASE_URI),
  SUBMIT_TOOL_URI: String(process.env.AIRTABLE_SUBMIT_TOOL_URI),
  CONTACT_FORM_TABLE_ID: String(process.env.CONTACT_FORM_TABLE_ID),
  CONTACT_FORM_BASE_ID: String(process.env.CONTACT_FORM_TABLE_BASE_ID),
  CONTACT_FORM_BEARER_TOKEN: String(process.env.CONTACT_FORM_BEARER_TOKEN),
  PROMPT_BASE_ID: String(process.env.PROMPT_BASE_ID),
  PROMPT_TABLE_ID: String(process.env.PROMPT_TABLE_ID),
  RESOURCE_BASE_ID: String(process.env.RESOURCE_BASE_ID),
  RESOURCE_TABLE_ID: String(process.env.RESOURCE_TABLE_ID),
  EXPERT_BASE_ID: String(process.env.EXPERT_BASE_ID),
  EXPERT_TABLE_ID: String(process.env.EXPERT_TABLE_ID),
  PROJECTS_BASE_ID: String(process.env.PROJECTS_BASE_ID),
  PROJECTS_TABLE_ID: String(process.env.PROJECTS_TABLE_ID),
  JOB_BASE_ID:String(process.env.JOB_BASE_ID),
  JOB_TABLE_ID:String(process.env.JOB_TABLE_ID),
};


export const ResendConf = {
  API_KEY: String(process.env.RESEND_API_KEY),
  FROM: String(process.env.RESEND_FROM),
  WELCOME_SUBJECT:
    String(process.env.WELCOME_SUBJECT) ?? "Welcome to Growth Marketing Tools!",
  FORGET_SUBJECT:
    String(process.env.FORGET_SUBJECT) ??
    "Reset Your Password for ContentCreation.fyi",
  RESET_PASSWORD_SUBJECT: String(process.env.RESET_PASSWORD_SUBJECT),
  VERIFICATION_CODE_SUBJECT:
    String(process.env.VERIFICATION_CODE_SUBJECT) ??
    "Your Verification Code is Here!",
};

export const MongodbConf = {
  MONGO_URI: String(process.env.MONGO_URI),
  DB_NAME: String(process.env.MONGODB_NAME),
};

export const APPConf = {
  BASE_URL: String(process.env.NEXTAUTH_URL),
};

export const SanityConf={
  PROJECT_ID: String(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
  DATASET: String(process.env.NEXT_PUBLIC_SANITY_DATASET),
}
