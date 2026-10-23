'use client';

import { Hero } from '@/components/layout/Hero';
import { TrustBar } from '@/components/layout/TrustBar';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Testimonials } from '@/components/layout/Testimonials';
import { CTASection } from '@/components/layout/CTASection';
import { services, companyStats } from '@/lib/data';
import Link from 'next/link';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero variant="home" />

      {/* Trust Bar */}
      <TrustBar />

      {/* Services Overview */}
      <section className="py-20 bg-white" aria-labelledby="services-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 id="services-heading" className="text-3xl md:text-4xl font-heading font-bold text-secondary-900">
              Find the Right Coverage for Your Life
            </h2>
            <p className="mt-4 text-lg text-secondary-600">
              Whether you need temporary protection or lifetime coverage, we have options to fit every need and budget.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="btn btn-outline inline-flex items-center gap-2 text-lg"
            >
              View All Products & Compare
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary-50" aria-labelledby="why-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 id="why-heading" className="text-3xl md:text-4xl font-heading font-bold text-secondary-900">
                Why Families Choose LifeSecure
              </h2>
              <p className="mt-4 text-lg text-secondary-600">
                We\'ve spent over 40 years perfecting the life insurance experience. Here\'s what makes us different:
              </p>

              <div className="mt-10 space-y-6">
                {[
                  {
                    title: 'No Medical Exam Required',
                    description: 'Most applicants qualify for up to $1M in coverage with just a few health questions. Get covered in minutes, not weeks.',
                    icon: CheckIcon,
                  },
                  {
                    title: '30+ Top-Rated Carriers',
                    description: 'We shop the market for you, comparing rates from the nation\'s strongest insurers to find your best price.',
                    icon: CheckIcon,
                  },
                  {
                    title: 'Licensed Agents, No Pressure',
                    description: 'Our salaried agents are here to educate and guide—not to push products. No commission means unbiased advice.',
                    icon: CheckIcon,
                  },
                  {
                    title: 'Instant Decisions Available',
                    description: 'Our accelerated underwriting delivers real-time decisions for eligible applicants. No waiting, no wondering.',
                    icon: CheckIcon,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 flex-shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">{item.title}</h3>
                      <p className="mt-1 text-secondary-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-1">
                <div className="h-full bg-white/5 rounded-xl p-8 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-5xl font-bold mb-2">125K+</div>
                    <div className="text-xl text-primary-200 mb-4">Families Protected</div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-2xl font-bold">$2.4B+</div>
                        <div className="text-primary-200">Claims Paid</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">98%</div>
                        <div className="text-primary-200">Satisfaction</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">A+</div>
                        <div className="text-primary-200">A.M. Best Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <h4 className="font-semibold text-secondary-900 mb-2">Ready to Get Started?</h4>
                <p className="text-secondary-600 text-sm mb-4">See your personalized rate in minutes. No obligation.</p>
                <Link
                  href="/quote"
                  className="btn btn-primary w-full text-center"
                >
                  Get My Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* How It Works */}
      <section className="py-20 bg-white" aria-labelledby="how-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 id="how-heading" className="text-3xl md:text-4xl font-heading font-bold text-secondary-900">
              Get Covered in 3 Simple Steps
            </h2>
            <p className="mt-4 text-lg text-secondary-600">
              We\'ve streamlined the process so you can protect your family without the hassle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Answer a Few Questions',
                description: 'Tell us about yourself and your coverage needs. Takes about 5 minutes online or over the phone.',
              },
              {
                step: '02',
                title: 'Compare Your Options',
                description: 'We instantly match you with the best rates from top carriers. See side-by-side comparisons.',
              },
              {
                step: '03',
                title: 'Get Covered',
                description: 'Most applicants get instant approval. Your coverage can start today—no waiting period.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 relative">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">{item.title}</h3>
                <p className="text-secondary-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-secondary-50" aria-labelledby="faq-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-heading font-bold text-secondary-900">
              Common Questions
            </h2>
          </div>

          <dl className="max-w-3xl mx-auto space-y-4" role="list">
            {[
              {
                q: 'How much life insurance do I need?',
                a: 'A common guideline is 10-15x your annual income, but the right amount depends on your debts, dependents, and goals. Our calculator helps you find the right number.',
              },
              {
                q: 'Do I need a medical exam?',
                a: 'For coverage up to $1M, most applicants qualify with just health questions—no exam needed. Higher amounts may require a brief paramedical visit at your home or office.',
              },
              {
                q: 'What if my health changes after I buy?',
                a: 'Your premiums and coverage are locked in for the life of the policy. Health changes never affect your rates or eligibility.',
              },
              {
                q: 'Can I cancel if I change my mind?',
                a: 'Yes, you have a 30-day free look period to cancel for a full refund. After that, you can cancel anytime with no penalties.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
                <dt className="p-6 font-medium text-secondary-900 bg-secondary-50 border-b border-secondary-100 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600 font-bold">
                    {index + 1}
                  </span>
                  {item.q}
                </dt>
                <dd className="p-6 text-secondary-600">{item.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 text-center">
            <Link
              href="/resources/faqs"
              className="btn btn-outline inline-flex items-center"
            >
              View All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection />
    </>
  );
}
