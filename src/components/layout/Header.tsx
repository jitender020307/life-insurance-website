'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-secondary-100'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="LifeSecure Home">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="font-heading font-bold text-xl text-secondary-900">LifeSecure</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors relative',
                  pathname === item.href
                    ? 'text-primary-600'
                    : 'text-secondary-600 hover:text-secondary-900'
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute bottom-[-6px] left-0 right-0 h-0.5 bg-primary-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <Link href="/quote" className="btn btn-ghost text-sm">
              Get a Quote
            </Link>
            <Link href="/auth/login" className="btn btn-primary text-sm">
              <UserCircleIcon className="h-4 w-4" />
              Client Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              className="text-secondary-600 hover:text-secondary-900 p-2 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-menu" 
            className="md:hidden overflow-hidden bg-white border-t border-secondary-100 animate-slide-down"
          >
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 rounded-lg text-base font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-secondary-100 flex flex-col gap-3">
                <Link
                  href="/quote"
                  className="btn btn-outline w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get a Quote
                </Link>
                <Link
                  href="/auth/login"
                  className="btn btn-primary w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserCircleIcon className="h-4 w-4" />
                  Client Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}