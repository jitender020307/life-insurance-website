'use client';

import { cn } from '@/lib/utils';
import { trustBadges } from '@/lib/data';

interface TrustBarProps {
  variant?: 'default' | 'minimal';
}

export function TrustBar({ variant = 'default' }: TrustBarProps) {
  if (variant === 'minimal') {
    return (
      <div className="py-8 bg-secondary-50 border-y border-secondary-100">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {trustBadges.map((badge) => (
              <div key={badge.name} className="flex items-center gap-2 text-secondary-600">
                <span className="font-semibold text-secondary-900">{badge.name}</span>
                <span className="text-sm text-primary-600 font-medium">{badge.rating}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white border-y border-secondary-100" aria-label="Trust indicators">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {trustBadges.map((badge, index) => (
            <div
              key={badge.name}
              className="flex flex-col items-center text-center p-4 transition-colors hover:text-primary-600"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl md:text-3xl font-bold text-secondary-900 mb-1">
                {badge.rating.split(' ')[0]}
              </div>
              <div className="text-sm text-secondary-600 font-medium">{badge.name}</div>
              <div className="text-xs text-secondary-500">{badge.rating.split(' ').slice(1).join(' ')}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
