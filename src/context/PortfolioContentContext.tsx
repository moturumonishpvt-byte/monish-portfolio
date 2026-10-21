import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  personalInfo as defaultPersonalInfo,
  aboutData as defaultAboutData,
  journeyMilestones as defaultJourneyMilestones,
  skillsData as defaultSkillsData,
  projectCaseStudies as defaultProjects,
  hackathonsData as defaultHackathonsData,
  experienceData as defaultExperienceData,
  teachingAndContentData as defaultTeachingAndContentData,
  achievementsData as defaultAchievementsData,
  educationData as defaultEducationData,
  certificationsData as defaultCertificationsData,
  courseworkData as defaultCourseworkData,
  currentlyStatus as defaultCurrentlyStatus,
} from '../data';
import {
  Project,
  SkillCategory,
  JourneyMilestone,
  HackathonChallenge,
  ExperienceItem,
  TeachingItem,
  ContentMediaItem,
  AchievementItem,
  EducationItem,
  CertificationItem,
  CurrentlyStatus,
  AboutSectionData,
} from '../types';

export interface StoryChapterMeta {
  index: number;
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  question: string;
}

export const defaultStoryChapters: StoryChapterMeta[] = [
  {
    index: 1,
    id: 'home',
    chapterNumber: 'CHAPTER 01',
    title: 'HERO & INTRO',
    subtitle: 'WHO AM I?',
    question: '[ WHO AM I? ]',
  },
  {
    index: 2,
    id: 'about',
    chapterNumber: 'CHAPTER 02',
    title: 'ABOUT ME',
    subtitle: 'WHAT DRIVES ME?',
    question: '[ WHAT DRIVES ME? ]',
  },
  {
    index: 3,
    id: 'journey',
    chapterNumber: 'CHAPTER 03',
    title: 'MY JOURNEY',
    subtitle: 'HOW DID I GET HERE?',
    question: '[ HOW DID I GET HERE? ]',
  },
  {
    index: 4,
    id: 'skills',
    chapterNumber: 'CHAPTER 04',
    title: 'SKILLS & STACK',
    subtitle: 'WHAT CAN I DO?',
    question: '[ WHAT CAN I DO? ]',
  },
  {
    index: 5,
    id: 'projects',
    chapterNumber: 'CHAPTER 05',
    title: 'PROJECTS',
    subtitle: 'WHAT DID I BUILD?',
    question: '[ WHAT DID I BUILD? ]',
  },
  {
    index: 6,
    id: 'hackathons',
    chapterNumber: 'CHAPTER 06',
    title: 'HACKATHONS & SPRINTS',
    subtitle: 'HOW DO I PERFORM UNDER PRESSURE?',
    question: '[ HOW DO I PERFORM UNDER PRESSURE? ]',
  },
  {
    index: 7,
    id: 'experience',
    chapterNumber: 'CHAPTER 07',
    title: 'EXPERIENCE & LEADERSHIP',
    subtitle: 'CAN I WORK WITH OTHERS & TAKE OWNERSHIP?',
    question: '[ CAN I WORK WITH OTHERS & TAKE OWNERSHIP? ]',
  },
  {
    index: 8,
    id: 'achievements',
    chapterNumber: 'CHAPTER 08',
    title: 'ACHIEVEMENTS & METRICS',
    subtitle: 'WHAT CAME FROM ALL OF THIS?',
    question: '[ WHAT CAME FROM ALL OF THIS? ]',
  },
  {
    index: 9,
    id: 'education',
    chapterNumber: 'CHAPTER 09',
    title: 'EDUCATION & CERTIFICATIONS',
    subtitle: 'WHERE AM I FORMALLY LEARNING?',
    question: '[ WHERE AM I FORMALLY LEARNING? ]',
  },
  {
    index: 10,
    id: 'currently',
    chapterNumber: 'CHAPTER 10',
    title: 'CURRENTLY & WHAT’S NEXT',
    subtitle: 'WHAT AM I DOING NOW?',
    question: '[ WHAT AM I DOING NOW? ]',
  },
  {
    index: 11,
    id: 'contact',
    chapterNumber: 'CHAPTER 11',
    title: 'CONTACT & INQUIRY',
    subtitle: 'WHAT HAPPENS NEXT?',
    question: '[ WHAT HAPPENS NEXT? ]',
  },
  {
    index: 12,
    id: 'epilogue',
    chapterNumber: 'CHAPTER 12',
    title: 'EPILOGUE & FOOTER',
    subtitle: 'THE JOURNEY CONTINUES',
    question: '[ THE JOURNEY CONTINUES ]',
  },
];

export interface PortfolioContentState {
  personalInfo: typeof defaultPersonalInfo;
  aboutData: AboutSectionData;
  journeyMilestones: JourneyMilestone[];
  skillsData: SkillCategory[];
  projects: Project[];
  hackathonsData: HackathonChallenge[];
  experienceData: ExperienceItem[];
  teachingAndContentData: {
    teaching: TeachingItem[];
    content: ContentMediaItem[];
  };
  achievementsData: AchievementItem[];
  educationData: EducationItem[];
  certificationsData: CertificationItem[];
  courseworkData: string[];
  currentlyStatus: CurrentlyStatus;
  chapters: StoryChapterMeta[];
}

export interface PortfolioContentContextType {
  content: PortfolioContentState;
  updatePersonalInfo: (partial: Partial<typeof defaultPersonalInfo>) => void;
  updateAboutData: (partial: Partial<AboutSectionData>) => void;
  updateProjects: (projects: Project[]) => void;
  updateSkillsData: (skills: SkillCategory[]) => void;
  updateMilestones: (milestones: JourneyMilestone[]) => void;
  updateHackathons: (hackathons: HackathonChallenge[]) => void;
  updateExperience: (exp: ExperienceItem[]) => void;
  updateCurrentlyStatus: (partial: Partial<CurrentlyStatus>) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'monish_portfolio_content_v2';

const PortfolioContentContext = createContext<PortfolioContentContextType | undefined>(undefined);

export const PortfolioContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<PortfolioContentState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          // Always use code-defined data — these are never user-editable
          projects: defaultProjects,
          chapters: defaultStoryChapters,
        };
      }
    } catch {
      // ignore
    }
    return {
      personalInfo: defaultPersonalInfo,
      aboutData: defaultAboutData,
      journeyMilestones: defaultJourneyMilestones,
      skillsData: defaultSkillsData,
      projects: defaultProjects,
      hackathonsData: defaultHackathonsData,
      experienceData: defaultExperienceData,
      teachingAndContentData: defaultTeachingAndContentData,
      achievementsData: defaultAchievementsData,
      educationData: defaultEducationData,
      certificationsData: defaultCertificationsData,
      courseworkData: defaultCourseworkData,
      currentlyStatus: defaultCurrentlyStatus,
      chapters: defaultStoryChapters,
    };
  });

  const saveContent = (next: PortfolioContentState) => {
    setContent(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const updatePersonalInfo = (partial: Partial<typeof defaultPersonalInfo>) => {
    saveContent({
      ...content,
      personalInfo: { ...content.personalInfo, ...partial },
    });
  };

  const updateAboutData = (partial: Partial<AboutSectionData>) => {
    saveContent({
      ...content,
      aboutData: { ...content.aboutData, ...partial },
    });
  };

  const updateProjects = (projects: Project[]) => {
    saveContent({ ...content, projects });
  };

  const updateSkillsData = (skillsData: SkillCategory[]) => {
    saveContent({ ...content, skillsData });
  };

  const updateMilestones = (journeyMilestones: JourneyMilestone[]) => {
    saveContent({ ...content, journeyMilestones });
  };

  const updateHackathons = (hackathonsData: HackathonChallenge[]) => {
    saveContent({ ...content, hackathonsData });
  };

  const updateExperience = (experienceData: ExperienceItem[]) => {
    saveContent({ ...content, experienceData });
  };

  const updateCurrentlyStatus = (partial: Partial<CurrentlyStatus>) => {
    saveContent({
      ...content,
      currentlyStatus: { ...content.currentlyStatus, ...partial },
    });
  };

  const resetToDefaults = () => {
    const initial: PortfolioContentState = {
      personalInfo: defaultPersonalInfo,
      aboutData: defaultAboutData,
      journeyMilestones: defaultJourneyMilestones,
      skillsData: defaultSkillsData,
      projects: defaultProjects,
      hackathonsData: defaultHackathonsData,
      experienceData: defaultExperienceData,
      teachingAndContentData: defaultTeachingAndContentData,
      achievementsData: defaultAchievementsData,
      educationData: defaultEducationData,
      certificationsData: defaultCertificationsData,
      courseworkData: defaultCourseworkData,
      currentlyStatus: defaultCurrentlyStatus,
      chapters: defaultStoryChapters,
    };
    saveContent(initial);
  };

  return (
    <PortfolioContentContext.Provider
      value={{
        content,
        updatePersonalInfo,
        updateAboutData,
        updateProjects,
        updateSkillsData,
        updateMilestones,
        updateHackathons,
        updateExperience,
        updateCurrentlyStatus,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContentContext.Provider>
  );
};

export const usePortfolioContent = () => {
  const context = useContext(PortfolioContentContext);
  if (!context) {
    throw new Error('usePortfolioContent must be used within a PortfolioContentProvider');
  }
  return context;
};
