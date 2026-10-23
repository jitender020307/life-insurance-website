'use client';

import { Hero } from '@/components/layout/Hero';
import { ContactForm } from '@/components/forms/ContactForm';
import { CTASection } from '@/components/layout/CTASection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: 'Call Us',
      details: '1-800-LIFE-SEC (1-800-543-3732)',
      hours: 'Mon-Fri: 8am-8pm ET | Sat: 9am-5pm ET',
      href: 'tel:18005433732',
    },
    {
      icon: <EnvelopeIcon className="h-6 w-6" />,
      title: 'Email Us',
      details: 'info@lifesecure.com',
      hours: 'We respond within 24 hours',
      href: 'mailto:info@lifesecure.com',
    },
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: 'Visit Us',
      details: '100 Financial Plaza, Suite 500',
      hours: 'New York, NY 10001',
      href: 'https://maps.google.com',
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: 'Claims Support',
      details: '1-800-CLAIM-SEC (1-800-252-4673)',
      hours: '24/7 Claims Hotline',
      href: 'tel:18002524673',
    },
  ];

  return (
    <>
      <Hero
        variant="contact"
        title="We're Here to Help"
        subtitle="Have questions about your policy, need a quote, or want to speak with an agent? Our team is ready to assist."
      />

      <section className="py-16 bg-white" aria-labelledby="contact-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <Card key={index} hover>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 flex-shrink-0">
                        {method.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-secondary-900">{method.title}</h3>
                        <a href={method.href} className="text-primary-600 hover:underline mt-1 block">{method.details}</a>
                        <p className="text-sm text-secondary-500 mt-1">{method.hours}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-secondary-50" aria-labelledby="quick-help-heading">
        <div className="container-custom">
          <h2 id="quick-help-heading" className="text-3xl font-heading font-bold text-center text-secondary-900 mb-12">
            Quick Help Topics
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Policy Questions',
                links: ['Coverage details', 'Beneficiary changes', 'Policy loans', 'Rider options', 'Conversion rights'],
              },
              {
                title: 'Billing & Payments',
                links: ['Payment methods', 'Auto-pay setup', 'Billing schedule', 'Grace periods', 'Payment history'],
              },
              {
                title: 'Claims & Benefits',
                links: ['File a claim', 'Required documents', 'Claim status', 'Benefit options', 'Accelerated benefits'],
              },
              {
                title: 'Account Management',
                links: ['Online account access', 'Profile updates', 'Document center', 'Communication preferences', 'Agent contact'],
              },
            ].map((category, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-secondary-900 mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.links.map((link, i) => (
                      <li key={i}>
                        <a href={`/contact?subject=${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-secondary-600 hover:text-primary-600 transition-colors flex items-center gap-2">
                          <svg className="h-4 w-4 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection variant="contact" />
    </>
  );
}
