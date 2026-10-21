export interface Project {
  id: string;
  title: string;
  period: string;
  role: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  problem: string;
  architecture: string[];
  impact: string[];
  githubUrl?: string;
  liveUrl?: string;
  challengeSolved?: string;
  imageUrl?: string;
  featured?: boolean;
  repositories?: { name: string; url: string }[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
  iconName: string;
  description?: string;
}

export interface JourneyMilestone {
  year: string;
  phase: string;
  title: string;
  summary: string;
  learned: string;
  changed: string;
  highlightTag?: string;
  technologies?: string[];
}

export interface HackathonChallenge {
  id: string;
  name: string;
  organization: string;
  date: string;
  problem: string;
  idea: string;
  build: string;
  role: string;
  technologies: string[];
  result: string;
  rank?: string;
  lessonsLearned: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  type: 'leadership' | 'engineering' | 'ambassadorship';
  period: string;
  location: string;
  details: string[];
  impact: string;
  technologies?: string[];
}

export interface TeachingItem {
  title: string;
  platform: string;
  description: string;
  topics: string[];
  actionLabel: string;
  actionUrl: string;
  learnersCount?: string;
}

export interface ContentMediaItem {
  title: string;
  type: 'Video Tutorial' | 'Architecture Breakdown' | 'Technical Guide';
  description: string;
  duration?: string;
  tag: string;
  actionUrl: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: 'Competition' | 'Academic' | 'Engineering Metric' | 'Community';
  result: string;
  description: string;
  highlight?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  gpa: string;
  location: string;
  highlights?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills: string[];
  url?: string;
}

export interface CurrentlyStatus {
  building: { title: string; description: string; tag: string };
  learning: { title: string; description: string; tag: string };
  exploring: { title: string; description: string; tag: string };
  creating: { title: string; description: string; tag: string };
  currentGoal: string;
  openTo: string[];
}

export interface AboutSectionData {
  introduction: string;
  mindset: string;
  philosophy: string;
  curiosityAreas: string[];
  buildingPrinciples: { title: string; desc: string }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  text: string;
  timestamp: string;
  aiResponseDraft?: string;
  status: 'unread' | 'read' | 'replied';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

