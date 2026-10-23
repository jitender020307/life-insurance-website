// Core Types for Life Insurance Website

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  dateOfBirth?: string;
  address?: Address;
  createdAt: string;
  updatedAt: string;
  role: 'client' | 'agent' | 'admin';
  status: 'active' | 'pending' | 'inactive';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Policy {
  id: string;
  policyNumber: string;
  userId: string;
  productId: string;
  productName: string;
  productType: PolicyType;
  status: PolicyStatus;
  coverageAmount: number;
  premium: Premium;
  beneficiaries: Beneficiary[];
  riders: Rider[];
  startDate: string;
  endDate?: string;
  nextPaymentDate: string;
  paymentHistory: Payment[];
  documents: PolicyDocument[];
  createdAt: string;
  updatedAt: string;
}

export type PolicyType = 'term' | 'whole' | 'universal' | 'variable' | 'indexed';

export type PolicyStatus = 'active' | 'pending' | 'lapsed' | 'cancelled' | 'expired' | 'pending_review';

export interface Premium {
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  currency: 'USD';
  dueDate: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  relationship: string;
  percentage: number;
  dateOfBirth?: string;
  ssn?: string;
  isPrimary: boolean;
}

export interface Rider {
  id: string;
  name: string;
  description: string;
  additionalPremium: number;
  isActive: boolean;
}

export interface Payment {
  id: string;
  policyId: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  method: 'credit_card' | 'bank_transfer' | 'check' | 'auto_pay';
  transactionId?: string;
}

export interface PolicyDocument {
  id: string;
  name: string;
  type: 'policy' | 'amendment' | 'rider' | 'correspondence' | 'statement';
  url: string;
  uploadedAt: string;
  size: number;
}

export interface QuoteRequest {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  state: string;
  coverageAmount: number;
  termLength?: number;
  productType: PolicyType;
  healthRating?: HealthRating;
  tobaccoUse: boolean;
  createdAt?: string;
  status?: 'new' | 'contacted' | 'quoted' | 'applied' | 'approved' | 'declined';
}

export type HealthRating = 'preferred_plus' | 'preferred' | 'standard_plus' | 'standard' | 'substandard';

export interface ContactForm {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: ContactSubject;
  message: string;
  createdAt?: string;
}

export type ContactSubject = 'general' | 'quote' | 'claims' | 'billing' | 'policy_change' | 'complaint' | 'other';

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  benefits: string[];
  faqs: FAQ[];
  ctaText: string;
  ctaLink: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  content: string;
  rating: number;
  productType?: PolicyType;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar?: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featuredImage?: string;
  readTime: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube';
  url: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}