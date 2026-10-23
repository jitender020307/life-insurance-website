import { z } from 'zod';

export const quoteRequestSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(20),
  dateOfBirth: z.string().min(1, 'Date of birth is required').refine(
    (date) => {
      const age = new Date().getFullYear() - new Date(date).getFullYear();
      return age >= 18 && age <= 85;
    },
    { message: 'You must be between 18 and 85 years old' }
  ),
  gender: z.enum(['male', 'female', 'other']),
  state: z.string().min(2, 'State is required').max(2),
  coverageAmount: z.number().min(50000, 'Minimum coverage is $50,000').max(10000000, 'Maximum coverage is $10,000,000'),
  termLength: z.number().min(10).max(40).optional(),
  productType: z.enum(['term', 'whole', 'universal', 'variable', 'indexed']),
  healthRating: z.enum(['preferred_plus', 'preferred', 'standard_plus', 'standard', 'substandard']).optional(),
  tobaccoUse: z.boolean(),
});

export const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(20).optional(),
  subject: z.enum(['general', 'quote', 'claims', 'billing', 'policy_change', 'complaint', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  ),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(20).optional(),
  dateOfBirth: z.string().min(1, 'Date of birth is required').refine(
    (date) => {
      const age = new Date().getFullYear() - new Date(date).getFullYear();
      return age >= 18;
    },
    { message: 'You must be at least 18 years old' }
  ),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const passwordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const newPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters').regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const beneficiarySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  relationship: z.string().min(1, 'Relationship is required').max(50),
  percentage: z.number().min(1, 'Percentage must be at least 1%').max(100, 'Percentage cannot exceed 100%'),
  dateOfBirth: z.string().optional(),
  ssn: z.string().optional(),
  isPrimary: z.boolean(),
});

export const paymentMethodSchema = z.object({
  type: z.enum(['credit_card', 'bank_transfer']),
  // Credit card fields
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  // Bank transfer fields
  accountNumber: z.string().optional(),
  routingNumber: z.string().optional(),
  accountType: z.enum(['checking', 'savings']).optional(),
}).refine((data) => {
  if (data.type === 'credit_card') {
    return data.cardNumber && data.expiryDate && data.cvv;
  }
  if (data.type === 'bank_transfer') {
    return data.accountNumber && data.routingNumber && data.accountType;
  }
  return false;
}, { message: 'Please fill in all required fields for the selected payment method' });

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
export type NewPasswordInput = z.infer<typeof newPasswordSchema>;
export type BeneficiaryInput = z.infer<typeof beneficiarySchema>;
export type PaymentMethodInput = z.infer<typeof paymentMethodSchema>;