'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Hero } from '@/components/layout/Hero';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, UserIcon, PhoneIcon, CalendarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const STATES = [
  { value: '', label: 'Select State' },
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }, { value: 'DC', label: 'District of Columbia' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      toast.success('Account created! Please sign in.');
      router.push('/auth/login?registered=true');
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Hero
        variant="service"
        title="Create Your Account"
        subtitle="Join 125,000+ families who trust LifeSecure. Manage policies, make payments, and get support—all in one place."
      />

      <section className="py-16 bg-white" aria-labelledby="register-heading">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Create Your Account</CardTitle>
                <CardDescription>Enter your information to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      placeholder="John"
                      leftIcon={<UserIcon className="h-5 w-5 text-secondary-400" />}
                      error={errors.firstName?.message}
                      {...register('firstName')}
                    />
                    <Input
                      label="Last Name"
                      placeholder="Doe"
                      leftIcon={<UserIcon className="h-5 w-5 text-secondary-400" />}
                      error={errors.lastName?.message}
                      {...register('lastName')}
                    />
                  </div>

                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    leftIcon={<EnvelopeIcon className="h-5 w-5 text-secondary-400" />}
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <Input
                    label="Phone (Optional)"
                    type="tel"
                    placeholder="(555) 123-4567"
                    leftIcon={<PhoneIcon className="h-5 w-5 text-secondary-400" />}
                    error={errors.phone?.message}
                    {...register('phone')}
                  />

                  <Input
                    label="Date of Birth"
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    leftIcon={<CalendarIcon className="h-5 w-5 text-secondary-400" />}
                    error={errors.dateOfBirth?.message}
                    {...register('dateOfBirth')}
                  />

                  <Select
                    label="State"
                    options={STATES}
                    placeholder="Select State"
                    error={errors.state?.message}
                    {...register('state')}
                  />

                  <div className="relative">
                    <Input
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      leftIcon={<LockClosedIcon className="h-5 w-5 text-secondary-400" />}
                      error={errors.password?.message}
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-[38px] text-secondary-400 hover:text-secondary-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      leftIcon={<LockClosedIcon className="h-5 w-5 text-secondary-400" />}
                      error={errors.confirmPassword?.message}
                      {...register('confirmPassword')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-[38px] text-secondary-400 hover:text-secondary-600"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Password Strength */}
                  {password && (
                    <div className="space-y-2">
                      <div className="h-2 bg-secondary-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-600 transition-all duration-300"
                          style={{
                            width: `${Math.min(password.length / 12 * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-secondary-500">
                        {password.length < 8 ? 'Too short' : password.length < 10 ? 'Fair' : password.length < 12 ? 'Good' : 'Strong'}
                      </p>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1 h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      {...register('terms')}
                    />
                    <label htmlFor="terms" className="text-sm text-secondary-600">
                      I agree to the <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
                    </label>
                    {errors.terms && <p className="text-sm text-red-600 ml-6">{errors.terms.message}</p>}
                  </div>

                  <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                    Create Account
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-secondary-600">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-primary-600 hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { icon: ShieldCheckIcon, title: 'Secure', desc: 'Bank-level encryption' },
                { icon: UserIcon, title: 'Personal', desc: 'Your dashboard, your way' },
                { icon: PhoneIcon, title: 'Support', desc: 'Licensed agents ready to help' },
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-xl bg-secondary-50">
                  <div className="flex h-10 w-10 mx-auto mb-2 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                    {item.icon}
                  </div>
                  <p className="font-medium text-secondary-900 text-sm">{item.title}</p>
                  <p className="text-xs text-secondary-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
