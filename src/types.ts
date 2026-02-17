export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  techStack: string[];
  link?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}