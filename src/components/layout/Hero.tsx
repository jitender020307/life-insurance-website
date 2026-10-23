'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRightIcon, ShieldCheckIcon, ClockIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface HeroProps {
  variant?: 'home' | 'service' | 'quote' | 'about' | 'contact';
  title?: string;
  subtitle?: string;
  showQuoteForm?: boolean;
}

export function Hero({ variant = 'home', title, subtitle, showQuoteForm = false }: HeroProps) {
  const defaultContent: Record<string, { title: string; subtitle: string }> = {
    home: {
      title: 'Life Insurance That\'s Simple, Affordable, and Built Around You',
      subtitle: 'Get covered in minutes. No medical exam required for most applicants. Protect your family\'s future with confidence.',
    },
    service: {
      title: title || 'Find the Right Coverage',
      subtitle: subtitle || 'Compare our life insurance options and choose the perfect fit for your needs and budget.',
    },
    quote: {
      title: 'Get Your Personalized Quote in Minutes',
      subtitle: 'Answer a few quick questions to see your estimated monthly premium. No obligation, no pressure.',
    },
    about: {
      title: 'Protecting Families Since 1979',
      subtitle: 'We believe everyone deserves access to quality life insurance. Our mission is to make it simple, transparent, and affordable.',
    },
    contact: {
      title: 'We\'re Here to Help',
      subtitle: 'Have questions about your policy, need a quote, or want to speak with an agent? Our team is ready to assist.',
    },
  };

  const content = defaultContent[variant] || defaultContent.home;

  const stats = [
    { label: 'Policies Active', value: '125K+', icon: <ShieldCheckIcon className="h-6 w-6" /> },
    { label: 'Claims Paid (2023)', value: '$2.4B+', icon: <UsersIcon className="h-6 w-6" /> },
    { label: 'Avg. Approval Time', value: '15 min', icon: <ClockIcon className="h-6 w-6" /> },
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary-100/50 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent-100/50 blur-3xl" />
      </div>

      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
            </span>
            No medical exam for most applicants • Rates from $12/mo
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-secondary-900 animate-slide-up">
            {content.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-secondary-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
            {content.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link
              href="/quote"
              className="btn btn-primary w-full sm:w-auto gap-2"
            >
              Get My Free Quote
            </Link>
            <Link
              href="/services"
              className="btn btn-outline w-full sm:w-auto"
            >
              Explore Options
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  {stat.icon}
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                  <p className="text-sm text-secondary-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Form in Hero */}
        {showQuoteForm && (
          <div className="mt-16 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-200 shadow-xl p-6 md:p-8">
              <div id="quote-form-placeholder">
                {/* QuoteForm will be rendered here via props or children */}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
