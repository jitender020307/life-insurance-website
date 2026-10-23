'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  variant?: 'default' | 'featured';
}

const ICONS: Record<string, React.ReactNode> = {
  'shield-check': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'infinity': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  'sliders-horizontal': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 01-2 2H3.055a15.987 15.987 0 013.678-3.056 2 2 0 011.558-2.441 2 2 0 012.442 1.559 16.976 16.976 0 011.499 3.45A9.91 9.91 0 0012 18c2.683 0 5.166-.932 7.044-2.5A16.56 16.56 0 0020.945 11H23a2 2 0 012 2v1a2 2 0 01-2 2h-2.055a15.987 15.987 0 00-3.678 3.056 2 2 0 00-1.559 2.44 2 2 0 002.442 1.559 16.975 16.975 0 001.499-3.45A9.914 9.914 0 0012 6c-2.682 0-5.166.931-7.044 2.5A16.56 16.56 0 013.055 11z" />
    </svg>
  ),
  'chart-bar': (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

export function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  const Icon = ICONS[service.icon] || ICONS['shield-check'];

  if (variant === 'featured') {
    return (
      <Link
        href={service.ctaLink}
        className="group block bg-white rounded-2xl border border-secondary-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full"
      >
        <div className="p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
            {Icon}
          </div>
          <h3 className="mt-6 text-xl font-semibold text-secondary-900">{service.name}</h3>
          <p className="mt-2 text-secondary-600">{service.shortDescription}</p>
          <ul className="mt-6 space-y-3">
            {service.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-secondary-700">
                <svg className="h-5 w-5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-8 pb-8 pt-0">
          <span
            className="btn btn-outline w-full block text-center"
          >
            {service.ctaText}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Card className="h-full" hover>
      <CardContent className="p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
          {Icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-secondary-900">{service.name}</h3>
        <p className="mt-2 text-secondary-600">{service.shortDescription}</p>
        <ul className="mt-4 space-y-2">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-secondary-700">
              <svg className="h-4 w-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href={service.ctaLink}
          className="btn btn-outline mt-6 w-full block text-center"
        >
          {service.ctaText}
        </Link>
      </CardContent>
    </Card>
  );
}
