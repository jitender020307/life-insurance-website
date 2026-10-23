'use client';

import { Hero } from '@/components/layout/Hero';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { TrustBar } from '@/components/layout/TrustBar';
import { CTASection } from '@/components/layout/CTASection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ShieldCheckIcon, ClockIcon, CurrencyDollarIcon, UsersIcon } from '@heroicons/react/24/outline';

export default function QuotePage() {
  return (
    <>
      <Hero variant="quote" showQuoteForm />

      <section className="py-16 bg-white" aria-labelledby="quote-form-heading">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div id="quote-form-heading" className="bg-white/90 backdrop-blur-sm rounded-2xl border border-secondary-200 shadow-xl p-6 md:p-8 sticky top-24">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <TrustBar variant="minimal" />

      {/* Why Get a Quote */}
      <section className="py-20 bg-secondary-50" aria-labelledby="why-quote-heading">
        <div className="container-custom">
          <h2 id="why-quote-heading" className="text-3xl md:text-4xl font-heading font-bold text-center text-secondary-900 mb-16">
            Why Get a Quote with LifeSecure?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <ShieldCheckIcon className="h-6 w-6" />,
                title: 'No Obligation',
                description: 'Getting a quote doesn\'t commit you to anything. Just see your options.',
              },
              {
                icon: <ClockIcon className="h-6 w-6" />,
                title: 'Instant Results',
                description: 'See estimated rates immediately. Full underwriting takes just days.',
              },
              {
                icon: <CurrencyDollarIcon className="h-6 w-6" />,
                title: 'Best Price Guarantee',
                description: 'We compare 30+ carriers to find you the lowest rate for your profile.',
              },
              {
                icon: <UsersIcon className="h-6 w-6" />,
                title: 'Expert Guidance',
                description: 'Licensed agents available to answer questions—no pressure, just help.',
              },
            ].map((item, index) => (
              <Card key={index} hover className="text-center">
                <CardContent className="p-6">
                  <div className="flex h-14 w-14 mx-auto mb-4 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-2">{item.title}</h3>
                  <p className="text-secondary-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Calculator Preview */}
      <section className="py-20 bg-white" aria-labelledby="calculator-heading">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-secondary-900 rounded-2xl p-8 md:p-12 text-center">
              <h2 id="calculator-heading" className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Not Sure How Much Coverage You Need?
              </h2>
              <p className="text-secondary-300 mb-8 max-w-xl mx-auto">
                Use our coverage calculator to get a personalized recommendation based on your income, debts, and family situation.
              </p>
              <a
                href="/resources/calculators"
                className="btn btn-secondary inline-flex items-center gap-2 text-lg"
              >
                Try the Coverage Calculator
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection variant="quote" />
    </>
  );
}
