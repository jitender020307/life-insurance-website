import { Hero } from '@/components/layout/Hero';
import { ServiceCard } from '@/components/services/ServiceCard';
import { CTASection } from '@/components/layout/CTASection';
import { services } from '@/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Life Insurance Products & Coverage Options',
  description: 'Compare term, whole, universal, and indexed universal life insurance. Find the right coverage for your needs and budget. Free quotes, no obligation.',
};

export default function ServicesPage() {
  return (
    <>
      <Hero variant="service" />

      <section className="py-20 bg-white" aria-labelledby="products-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 id="products-heading" className="text-3xl md:text-4xl font-heading font-bold text-secondary-900">
              Our Life Insurance Products
            </h2>
            <p className="mt-4 text-lg text-secondary-600">
              Each product serves a different purpose. Compare features to find your perfect fit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} variant="featured" />
            ))}
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-xl border border-secondary-200">
            <table className="w-full" role="table">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-secondary-700">Feature</th>
                  {services.map((service) => (
                    <th key={service.id} className="p-4 text-left text-sm font-semibold text-secondary-900">
                      {service.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {[
                  { key: 'coverage', label: 'Coverage Duration' },
                  { key: 'cashValue', label: 'Builds Cash Value' },
                  { key: 'premiums', label: 'Premium Flexibility' },
                  { key: 'medicalExam', label: 'Medical Exam Required' },
                  { key: 'conversion', label: 'Convertible' },
                  { key: 'bestFor', label: 'Best For' },
                ].map((row) => (
                  <tr key={row.key}>
                    <td className="p-4 text-sm font-medium text-secondary-700">{row.label}</td>
                    {services.map((service) => (
                      <td key={service.id} className="p-4 text-sm text-secondary-600">
                        {(() => {
                          switch (row.key) {
                            case 'coverage':
                              return service.id === 'term' ? '10-30 years' : 'Lifetime';
                            case 'cashValue':
                              return service.id === 'term' ? 'No' : 'Yes';
                            case 'premiums':
                              return service.id === 'term' ? 'Fixed' : 'Flexible';
                            case 'medicalExam':
                              return 'Often not required*';
                            case 'conversion':
                              return service.id === 'term' ? 'Yes, to permanent' : 'N/A';
                            case 'bestFor':
                              const bestFor = {
                                term: 'Temporary needs, budget-conscious',
                                whole: 'Lifetime coverage, estate planning',
                                universal: 'Flexible needs, cash accumulation',
                                indexed: 'Market-linked growth, retirement',
                                variable: 'Investment control, higher risk tolerance',
                              };
                              return bestFor[service.id as keyof typeof bestFor] || '';
                            default:
                              return '';
                          }
                        })()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-secondary-500 text-center">
            *No medical exam for most applicants up to $1M coverage through accelerated underwriting.
          </p>
        </div>
      </section>

      {/* How to Choose */}
      <section className="py-20 bg-secondary-50" aria-labelledby="choose-heading">
        <div className="container-custom">
          <h2 id="choose-heading" className="text-3xl md:text-4xl font-heading font-bold text-center text-secondary-900 mb-16">
            Which Type Is Right for You?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Choose Term Life If:',
                items: [
                  'You need coverage for a specific period (mortgage, kids\' education)',
                  'You want the most affordable option',
                  'You have temporary financial obligations',
                  'You want simple, straightforward coverage',
                ],
              },
              {
                title: 'Choose Permanent Life If:',
                items: [
                  'You want lifetime coverage that never expires',
                  'You want to build cash value as a financial asset',
                  'You have estate planning or legacy goals',
                  'You want tax-advantaged wealth transfer',
                ],
              },
            ].map((column, index) => (
              <div key={index} className="bg-white rounded-xl border border-secondary-200 p-8">
                <h3 className="text-xl font-semibold text-secondary-900 mb-6">{column.title}</h3>
                <ul className="space-y-3">
                  {column.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-secondary-700">
                      <svg className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection variant="quote" />
    </>
  );
}
