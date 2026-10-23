'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRightIcon, ShieldCheckIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface CTASectionProps {
  variant?: 'default' | 'quote' | 'contact';
  title?: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  features?: { icon: React.ReactNode; title: string; description: string }[];
}

export function CTASection({
  variant = 'default',
  title,
  description,
  primaryCTA,
  secondaryCTA,
  features,
}: CTASectionProps) {
  const defaultContent = {
    default: {
      title: 'Ready to Protect Your Family\'s Future?',
      description: 'Get a personalized quote in minutes. No obligation, no pressure—just clear options and honest guidance.',
      primaryCTA: { text: 'Get My Free Quote', href: '/quote' },
      secondaryCTA: { text: 'Speak with an Agent', href: '/contact' },
      features: [
        { icon: <ShieldCheckIcon className="h-5 w-5" />, title: 'No Medical Exam', description: 'Most applicants qualify without an exam' },
        { icon: <ClockIcon className="h-5 w-5" />, title: 'Instant Decisions', description: 'Get your rate in as little as 15 minutes' },
        { icon: <CurrencyDollarIcon className="h-5 w-5" />, title: 'Best Price Guarantee', description: 'We shop 30+ carriers for your best rate' },
      ],
    },
    quote: {
      title: 'See Your Rate in Minutes',
      description: 'Answer a few questions to get your personalized quote. No commitment required.',
      primaryCTA: { text: 'Start My Quote', href: '/quote' },
      secondaryCTA: { text: 'Learn More About Options', href: '/services' },
    },
    contact: {
      title: 'Have Questions? We\'re Here to Help',
      description: 'Our licensed agents are ready to answer your questions and help you find the right coverage.',
      primaryCTA: { text: 'Contact Us', href: '/contact' },
      secondaryCTA: { text: 'Call 1-800-LIFE-SEC', href: 'tel:18005433732' },
    },
  };

  const content = defaultContent[variant];
  const finalTitle = title || content.title;
  const finalDescription = description || content.description;
  const finalPrimaryCTA = primaryCTA || content.primaryCTA;
  const finalSecondaryCTA = secondaryCTA || content.secondaryCTA;
  const finalFeatures = features || content.features;

  return (
    <section className="py-20 bg-secondary-900" aria-labelledby="cta-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <h2 id="cta-heading" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">
              {finalTitle}
            </h2>
            <p className="mt-4 text-lg text-secondary-300 max-w-xl">
              {finalDescription}
            </p>

            {/* Features */}
            {finalFeatures && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {finalFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600/20 text-primary-400 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{feature.title}</h3>
                      <p className="text-sm text-secondary-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href={finalPrimaryCTA.href}
                className="btn btn-primary w-full sm:w-auto gap-2"
              >
                {finalPrimaryCTA.text}
              </Link>
              {finalSecondaryCTA && (
                <Link
                  href={finalSecondaryCTA.href}
                  className="btn btn-outline w-full sm:w-auto border-secondary-600 text-white hover:bg-secondary-800"
                >
                  {finalSecondaryCTA.text}
                </Link>
              )}
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="relative h-[400px] w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-600/20 rounded-3xl blur-2xl" />
              <div className="relative h-full w-full bg-white/5 rounded-3xl border border-white/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex h-24 w-24 mx-auto mb-6 items-center justify-center rounded-2xl bg-primary-600/20">
                    <ShieldCheckIcon className="h-12 w-12 text-primary-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Protected & Confident</h3>
                  <p className="text-secondary-300">Join 125,000+ families who trust LifeSecure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
