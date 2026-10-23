'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormInput } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import toast from 'react-hot-toast';

interface ContactFormProps {
  onSubmit?: (data: ContactFormInput) => Promise<void>;
}

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'quote', label: 'Get a Quote' },
  { value: 'claims', label: 'Claims Assistance' },
  { value: 'billing', label: 'Billing & Payments' },
  { value: 'policy_change', label: 'Policy Changes' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'other', label: 'Other' },
];

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  const handleFormSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to submit');

        toast.success('Message sent! We\'ll get back to you within 1 business day.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          placeholder="John"
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label="Last Name"
          placeholder="Doe"
          error={errors.lastName?.message}
          {...register('lastName')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Phone (Optional)"
          type="tel"
          placeholder="(555) 123-4567"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      <Select
        label="Subject"
        options={SUBJECT_OPTIONS}
        placeholder="Select a subject"
        error={errors.subject?.message}
        {...register('subject')}
      />

      <Textarea
        label="Message"
        placeholder="How can we help you?"
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          required
          className="mt-1 h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="privacy" className="text-sm text-secondary-600">
          I agree to the <a href="/privacy" className="link">Privacy Policy</a> and consent to being contacted.
        </label>
      </div>

      <Button type="submit" className="w-full md:w-auto" size="lg" loading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}
