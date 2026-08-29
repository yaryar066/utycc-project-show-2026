export interface Project {
  id: string;
  title: string;
  major: string;
  year: string;
  teamName?: string;
  teamMembers?: string[];
  advisor?: string;
  shortSummary?: string;
  fullDescription?: string;
  image?: string;
  category?: string;
  technologies?: string[];
  features?: string[];
}

export interface MajorInfo {
  code: string;
  fullName: string;
  description: string;
}