'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Hero } from '@/components/layout/Hero';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/client/dashboard';
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        toast.error('Invalid email or password');
      } else {
        toast.success('Welcome back!');
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Hero
        variant="service"
        title="Welcome Back"
        subtitle="Sign in to your LifeSecure account to manage your policies, make payments, and more."
      />

      <section className="py-16 bg-white" aria-labelledby="login-heading">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    leftIcon={<EnvelopeIcon className="h-5 w-5 text-secondary-400" />}
                    error={errors.email?.message}
                    {...register('email')}
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

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        {...register('rememberMe')}
                      />
                      <span className="text-sm text-secondary-600">Remember me</span>
                    </label>
                    <Link href="/auth/forgot-password" className="text-sm text-primary-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                    Sign In
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-secondary-600">
                    New to LifeSecure?{' '}
                    <Link href="/auth/register" className="text-primary-600 hover:underline font-medium">
                      Create an account
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 text-center text-sm text-secondary-500">
              <p>Demo credentials: demo@example.com / password123</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
