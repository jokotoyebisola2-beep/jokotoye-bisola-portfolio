export type ProjectStatus = 'draft' | 'preview' | 'published' | 'archived';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  shortDescription?: string;
  description?: string;
  slug: string;
  industry?: string;
  category: string;
  image: string;
  coverImage?: string;
  gallery?: string[];
  galleryImages?: string[];
  challenge?: string;
  solution?: string;
  keyFeatures?: string[];
  businessOutcome?: {
    metric: string;
    description: string;
  };
  technologies: string[];
  liveDemoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
  dribbbleUrl?: string;
  figmaUrl?: string;
  completionDate?: string;
  clientName?: string;
  client?: string;
  duration?: string;
  role?: string;
  status: ProjectStatus;
  featured: boolean;
  year?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  status: 'active' | 'inactive';
  order?: number;
  tagline?: string;
  businessOutcome?: string;
  keyDeliverables?: string[];
  idealFor?: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  resultsAchieved?: string;
  projectContext?: string;
  status: 'published' | 'draft';
  order?: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'archived';
}

export type MediaFolder = 'Projects' | 'Profile' | 'Logo' | 'Services' | 'Reviews';

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  folder: MediaFolder;
  size?: number;
  uploadedAt: string;
}

export interface WebsiteSettings {
  heroHeadline: string;
  heroSubheadline: string;
  professionalTitle: string;
  brandStatement: string;
  whatsappNumber: string;
  email: string;
  logoUrl?: string;
  profilePhotoUrl?: string;
  resumeUrl?: string;
  footerText?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  updatedAt?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables?: string[];
  duration?: string;
  outputs?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface ProjectScopeOption {
  id: string;
  title?: string;
  label?: string;
  description: string;
  timeline?: string;
  estimatedWeeks?: number;
  typicalOutcome?: string;
  deliverables?: string[];
  icon?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}
