'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
} from '@/components/ui/SocialIcons';

const footerLinks = {
  products: [
    { label: 'Term Life', href: '/services/term-life' },
    { label: 'Whole Life', href: '/services/whole-life' },
    { label: 'Universal Life', href: '/services/universal-life' },
    { label: 'Indexed Universal Life', href: '/services/indexed-universal' },
    { label: 'Compare Policies', href: '/compare' },
  ],
  resources: [
    { label: 'Learning Center', href: '/resources/learning-center' },
    { label: 'FAQs', href: '/resources/faqs' },
    { label: 'Calculators', href: '/resources/calculators' },
    { label: 'Blog', href: '/blog' },
    { label: 'Glossary', href: '/resources/glossary' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Financial Strength', href: '/financial-strength' },
    { label: 'Agents & Partners', href: '/partners' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'File a Claim', href: '/claims' },
    { label: 'Policy Login', href: '/auth/login' },
    { label: 'Make a Payment', href: '/payments' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
  { name: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedInIcon },
  { name: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
];

const contactInfo = {
  phone: '1-800-LIFE-SEC',
  email: 'info@lifesecure.com',
  address: '100 Financial Plaza, Suite 500, New York, NY 10001',
};

export function Footer() {
  return (
    <footer className="bg-secondary-900 text-secondary-300" role="contentinfo">
      <div className="container-custom py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6" aria-label="LifeSecure Home">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-heading font-bold text-xl text-white">LifeSecure</span>
            </Link>
            <p className="text-secondary-400 text-sm mb-6 max-w-xs">
              Protecting families since 1979. Simple, affordable life insurance for every stage of life.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-secondary-400 hover:text-white transition-colors"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <nav aria-label="Products">
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Support">
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contact Info & Bottom */}
        <div className="mt-12 pt-8 border-t border-secondary-800">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-start gap-3">
              <PhoneIcon className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-white">Call Us</p>
                <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="text-secondary-400 hover:text-white transition-colors text-sm">
                  {contactInfo.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <EnvelopeIcon className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-white">Email Us</p>
                <a href={`mailto:${contactInfo.email}`} className="text-secondary-400 hover:text-white transition-colors text-sm">
                  {contactInfo.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPinIcon className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-white">Visit Us</p>
                <address className="text-secondary-400 text-sm not-italic">
                  {contactInfo.address}
                </address>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-secondary-800">
            <p className="text-secondary-500 text-sm">
              © {new Date().getFullYear()} LifeSecure Insurance Company. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-secondary-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-secondary-400 hover:text-white transition-colors">
                Terms of Use
              </Link>
              <Link href="/licenses" className="text-secondary-400 hover:text-white transition-colors">
                Licenses
              </Link>
              <Link href="/accessibility" className="text-secondary-400 hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}