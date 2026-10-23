'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quoteRequestSchema, type QuoteRequestInput } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface QuoteFormProps {
  productType?: string;
  onSubmit?: (data: QuoteRequestInput) => Promise<void>;
}

const STATES = [
  { value: '', label: 'Select State' },
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' },
];

const COVERAGE_OPTIONS = [
  { value: 100000, label: '$100,000' },
  { value: 250000, label: '$250,000' },
  { value: 500000, label: '$500,000' },
  { value: 750000, label: '$750,000' },
  { value: 1000000, label: '$1,000,000' },
  { value: 1500000, label: '$1,500,000' },
  { value: 2000000, label: '$2,000,000' },
  { value: 3000000, label: '$3,000,000' },
  { value: 5000000, label: '$5,000,000' },
];

const TERM_OPTIONS = [
  { value: 10, label: '10 Years' },
  { value: 15, label: '15 Years' },
  { value: 20, label: '20 Years' },
  { value: 25, label: '25 Years' },
  { value: 30, label: '30 Years' },
];

const HEALTH_RATINGS = [
  { value: 'preferred_plus', label: 'Preferred Plus (Excellent health)' },
  { value: 'preferred', label: 'Preferred (Very good health)' },
  { value: 'standard_plus', label: 'Standard Plus (Good health)' },
  { value: 'standard', label: 'Standard (Average health)' },
  { value: 'substandard', label: 'Substandard (Health issues)' },
];

export function QuoteForm({ productType, onSubmit }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);
  const [estimatedPremium, setEstimatedPremium] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<QuoteRequestInput>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      productType: (productType as QuoteRequestInput['productType']) || 'term',
      tobaccoUse: false,
      coverageAmount: 500000,
      termLength: 20,
    },
    mode: 'onChange',
  });

  const coverageAmount = watch('coverageAmount');
  const termLength = watch('termLength');
  const dateOfBirth = watch('dateOfBirth');
  const healthRating = watch('healthRating');
  const tobaccoUse = watch('tobaccoUse');
  const selectedProductType = watch('productType');

  // Simple premium estimation (for demo purposes)
  const calculateEstimate = () => {
    if (!coverageAmount || !dateOfBirth) return;

    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    const baseRate = coverageAmount / 1000;
    let multiplier = 0;

    // Age-based multiplier
    if (age < 30) multiplier = 0.15;
    else if (age < 40) multiplier = 0.25;
    else if (age < 50) multiplier = 0.55;
    else if (age < 60) multiplier = 1.2;
    else multiplier = 2.5;

    // Product type multiplier
    const productMultipliers = {
      term: 1,
      whole: 4,
      universal: 3,
      variable: 3.5,
      indexed: 3,
    };

    // Health rating multiplier
    const healthMultipliers = {
      preferred_plus: 0.7,
      preferred: 0.85,
      standard_plus: 1,
      standard: 1.25,
      substandard: 2,
    };

    // Tobacco multiplier
    const tobaccoMultiplier = tobaccoUse ? 2.5 : 1;

    // Term length adjustment (for term only)
    const termMultiplier = selectedProductType === 'term' && termLength
      ? 1 + (termLength - 10) * 0.02
      : 1;

    const monthly = baseRate * multiplier * (productMultipliers[selectedProductType] || 1) * (healthMultipliers[healthRating || 'standard'] || 1) * tobaccoMultiplier * termMultiplier;

    setEstimatedPremium(Math.round(monthly));
    setShowEstimate(true);
  };

  // Recalculate on relevant field changes
  [coverageAmount, dateOfBirth, healthRating, tobaccoUse, termLength, selectedProductType].forEach((value) => {
    if (value) calculateEstimate();
  });

  const handleFormSubmit = async (data: QuoteRequestInput) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default submission to API
        const response = await fetch('/api/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to submit quote request');

        toast.success('Quote request submitted! We\'ll contact you within 24 hours.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" noValidate>
      {/* Personal Information */}
      <fieldset className="space-y-6">
        <legend className="text-lg font-semibold text-secondary-900">Personal Information</legend>
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
            label="Phone"
            type="tel"
            placeholder="(555) 123-4567"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <Input
            label="Date of Birth"
            type="date"
            max={new Date().toISOString().split('T')[0]}
            error={errors.dateOfBirth?.message}
            {...register('dateOfBirth')}
          />
          <Select
            label="Gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
            placeholder="Select Gender"
            error={errors.gender?.message}
            {...register('gender')}
          />
          <Select
            label="State"
            options={STATES}
            placeholder="Select State"
            error={errors.state?.message}
            {...register('state')}
          />
          <Select
            label="Health Rating"
            options={HEALTH_RATINGS}
            placeholder="Select Health Rating"
            error={errors.healthRating?.message}
            {...register('healthRating')}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="tobaccoUse"
            className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
            {...register('tobaccoUse')}
          />
          <label htmlFor="tobaccoUse" className="text-sm text-secondary-700 cursor-pointer">
            I have used tobacco/nicotine products in the past 12 months
          </label>
          {errors.tobaccoUse && <p className="text-sm text-red-600">{errors.tobaccoUse.message}</p>}
        </div>
      </fieldset>

      {/* Coverage Details */}
      <fieldset className="space-y-6 pt-6 border-t border-secondary-100">
        <legend className="text-lg font-semibold text-secondary-900">Coverage Details</legend>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1.5">
            Product Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['term', 'whole', 'universal', 'indexed', 'variable'].map((type) => (
              <label
                key={type}
                className={cn(
                  'relative cursor-pointer',
                  selectedProductType === type ? 'ring-2 ring-primary-500' : ''
                )}
              >
                <input
                  type="radio"
                  value={type}
                  className="sr-only"
                  {...register('productType')}
                />
                <div className={cn(
                  'p-4 rounded-lg border-2 text-center transition-all',
                  selectedProductType === type
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-secondary-200 hover:border-secondary-300'
                )}>
                  <p className="font-medium text-secondary-900 capitalize">{type === 'indexed' ? 'Indexed UL' : type}</p>
                  <p className="text-xs text-secondary-500 mt-1">
                    {type === 'term' && 'Most affordable'}
                    {type === 'whole' && 'Lifetime coverage + cash value'}
                    {type === 'universal' && 'Flexible premiums'}
                    {type === 'indexed' && 'Market-linked growth'}
                    {type === 'variable' && 'Investment options'}
                  </p>
                </div>
              </label>
            ))}
          </div>
          {errors.productType && <p className="mt-1.5 text-sm text-red-600">{errors.productType.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Coverage Amount"
            options={COVERAGE_OPTIONS.map((o) => ({ value: String(o.value), label: o.label }))}
            placeholder="Select Amount"
            error={errors.coverageAmount?.message}
            {...register('coverageAmount', { valueAsNumber: true })}
          />

          {selectedProductType === 'term' && (
            <Select
              label="Term Length"
              options={TERM_OPTIONS.map((o) => ({ value: String(o.value), label: o.label }))}
              placeholder="Select Term"
              error={errors.termLength?.message}
              {...register('termLength', { valueAsNumber: true })}
            />
          )}
        </div>
      </fieldset>

      {/* Premium Estimate */}
      {showEstimate && (
        <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 animate-slide-down">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-700">Estimated Monthly Premium</p>
              <p className="text-3xl font-bold text-primary-900">${estimatedPremium}/mo</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-primary-600">*Estimate only</p>
              <p className="text-xs text-primary-600">Final rate requires underwriting</p>
            </div>
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="pt-4 border-t border-secondary-100">
        <Button type="submit" className="w-full md:w-auto" size="lg" loading={isSubmitting}>
          Get My Personalized Quote
        </Button>
        <p className="mt-3 text-center text-sm text-secondary-500">
          By submitting, you agree to our <a href="/privacy" className="link">Privacy Policy</a> and
          consent to be contacted via phone, email, or SMS about your quote.
        </p>
      </div>
    </form>
  );
}
