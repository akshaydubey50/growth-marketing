export interface AirtableModel {
  id: string;
  createdTime: string;
  fields: {
    Name: string;
    ToolImage: string;
    Tags: string[];
    WebsiteLink: string;
    Description: string;
    Verified: boolean;
    "Popularity (Traffic)"?: string;
    LiveURL?: string;
  };
}

// ... rest of the file remains unchanged ...

export interface PropmtResourceModel {
  id: string;
  fields: {
    Name: string;
    Description: string;
    Category: string[];
    Tags: string[];
    Status: string;
    Source: string;
    SourceLink: string;
  };
}

export interface ResourceModel {
  id: string;
  fields: {
    Name?: string;
    Description?: string;
    Topics: string[];
    Tags: string;
    URL?: string;
    Status:string;
    "Author/Publisher/Admin/Creator"?: string;
  };
}

export interface ExpertModel {
  id: string;
  fields: {
    "Username": string;
    "Skills": string[];
    "First Name": string;
    "Country": string;
    "Verified":boolean;
    "Email": string;
    "ExpertType": string[];
    "Industry": string[];
    "Last Name": string;
    "Twitter": string;
    "LinkedIn": string;
    "Headline": string;
    "Professional Bio": string;
    "Portfolio": string;
    "Instagram": string;
    "Status": string;
    "Tools": string[];
    "Platforms": string[];
  };
}

export interface ProjectModel {
  id: string;
  fields: {
    "Project Title": string;
    Status: string,
    Category: string[];
    Budget: string;
    Deadline: string,
    "Project Description": string;
    ProjectType: string;
    ProjectURL: string;
  };
}

export interface JobModel {
  id: string;
  fields: {
    "Job_Title"?: string;
    "Company_LogoURL"?: string; 
    "CompanyName"?: string;
    "Location"?: string;
    "ApplyLink"?: string;
    "Salary"?: string;
    "JobType"?: string;
    "Status"?: string;
  };
}

