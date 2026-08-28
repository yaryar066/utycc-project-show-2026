export type MajorType = "All" | "IST" | "CE" | "ECE" | "PrE" | "AME";
export type AcademicYear = 
  | "All"
  | "6th Year"
  | "5th Year - 1st Sem"
  | "5th Year - 2nd Sem"
  | "5th Year"
  | "4th Year"
  | "3rd Year"
  | "2nd Year"
  | "1st Year"
  | "";

export interface Project {
  id: string;
  title: string;
  major: Exclude<MajorType, "All">;
  year: AcademicYear;
  teamName: string;
  shortSummary: string;
  fullDescription: string;
  teamMembers: string[];
  advisor: string;
  image: string;
  featured?: boolean;
}

export interface MajorInfo {
  code: Exclude<MajorType, "All">;
  fullName: string;
  description: string;
}