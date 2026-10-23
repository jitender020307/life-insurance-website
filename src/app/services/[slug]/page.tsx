import { Hero } from '@/components/layout/Hero';
import { CTASection } from '@/components/layout/CTASection';
import { services } from '@/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: service.name,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

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

  const Icon = ICONS[service.icon] || ICONS['shield-check'];

  return (
    <>
      <Hero
        variant="service"
        title={service.name}
        subtitle={service.shortDescription}
      />

      <section className="py-20 bg-white" aria-labelledby="details-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 id="details-heading" className="text-3xl font-heading font-bold text-secondary-900">
                  About {service.name}
                </h2>
                <p className="mt-4 text-lg text-secondary-600 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-2xl font-heading font-bold text-secondary-900 mb-6">
                  Key Features
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-secondary-50">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-secondary-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-2xl font-heading font-bold text-secondary-900 mb-6">
                  Why Choose {service.name}?
                </h3>
                <ul className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-4 p-4 rounded-lg border border-secondary-100">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 flex-shrink-0">
                        <CheckIcon className="h-5 w-5" />
                      </div>
                      <span className="text-secondary-700 pt-0.5">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQs */}
              <div>
                <h3 className="text-2xl font-heading font-bold text-secondary-900 mb-6">
                  Frequently Asked Questions
                </h3>
                <dl className="space-y-4" role="list">
                  {service.faqs.map((faq, index) => (
                    <div key={index} className="bg-secondary-50 rounded-xl p-6">
                      <dt className="font-medium text-secondary-900">{faq.question}</dt>
                      <dd className="mt-2 text-secondary-600">{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-primary-600 mx-auto mb-4">
                    {Icon}
                  </div>
                  <CardTitle className="text-center">{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4 pt-4 border-t border-secondary-100">
                    {service.features.slice(0, 5).map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm text-secondary-700">
                        <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full" size="lg" as={Link} href={service.ctaLink}>
                    {service.ctaText}
                  </Button>

                  <Button variant="outline" className="w-full" as={Link} href="/contact">
                    Speak with an Agent
                  </Button>

                  <div className="pt-4 border-t border-secondary-100 space-y-3 text-sm">
                    <div className="flex justify-between text-secondary-600">
                      <span>Coverage Amounts</span>
                      <span className="font-medium text-secondary-900">$50K - $10M+</span>
                    </div>
                    <div className="flex justify-between text-secondary-600">
                      <span>Available Riders</span>
                      <span className="font-medium text-secondary-900">5+ options</span>
                    </div>
                    <div className="flex justify-between text-secondary-600">
                      <span>Approval Time</span>
                      <span className="font-medium text-secondary-900">As fast as 15 min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <CTASection variant="quote" />
    </>
  );
}