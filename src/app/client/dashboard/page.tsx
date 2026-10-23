'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { formatCurrency, formatDateShort, cn } from '@/lib/utils';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  CreditCardIcon,
  CalendarIcon,
  ArrowRightIcon,
  PlusIcon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

// Mock data for demo
const mockPolicies = [
  {
    id: '1',
    policyNumber: 'LI-2024-001234',
    productName: 'Term Life Insurance',
    productType: 'term',
    status: 'active',
    coverageAmount: 500000,
    premium: { amount: 42.50, frequency: 'monthly', currency: 'USD', dueDate: '2024-02-15' },
    nextPaymentDate: '2024-02-15',
    beneficiaries: [{ name: 'Jane Smith', relationship: 'Spouse', percentage: 100, isPrimary: true }],
  },
  {
    id: '2',
    policyNumber: 'LI-2023-005678',
    productName: 'Whole Life Insurance',
    productType: 'whole',
    status: 'active',
    coverageAmount: 250000,
    premium: { amount: 185.00, frequency: 'monthly', currency: 'USD', dueDate: '2024-02-20' },
    nextPaymentDate: '2024-02-20',
    beneficiaries: [
      { name: 'Jane Smith', relationship: 'Spouse', percentage: 60, isPrimary: true },
      { name: 'Michael Smith', relationship: 'Child', percentage: 40, isPrimary: false },
    ],
  },
];

const mockNotifications = [
  { id: '1', type: 'payment_due', title: 'Payment Due Soon', message: 'Your Term Life premium of $42.50 is due on February 15', date: '2024-02-08', read: false },
  { id: '2', type: 'document', title: 'New Document Available', message: 'Your annual policy statement is ready to view', date: '2024-01-25', read: true },
  { id: '3', type: 'info', title: 'Rate Guarantee Expiring', message: 'Your 20-year term rate guarantee expires in 6 months. Consider your options.', date: '2024-01-15', read: true },
];

export default function ClientDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // In a real app, you'd fetch this from an API
  // For now, using mock data

  const totalCoverage = mockPolicies.reduce((sum, p) => sum + p.coverageAmount, 0);
  const monthlyPremiums = mockPolicies.reduce((sum, p) => {
    const freq = p.premium.frequency;
    const monthly = freq === 'monthly' ? p.premium.amount :
                    freq === 'quarterly' ? p.premium.amount / 3 :
                    freq === 'semi-annual' ? p.premium.amount / 6 :
                    p.premium.amount / 12;
    return sum + monthly;
  }, 0);

  const activePolicies = mockPolicies.filter(p => p.status === 'active').length;
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  if (status === 'loading') {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login?callbackUrl=/client/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Client Header */}
      <header className="bg-white border-b border-secondary-200 sticky top-0 z-30">
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/client/dashboard" className="flex items-center gap-2" aria-label="LifeSecure Client Portal">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="font-heading font-bold text-xl text-secondary-900">LifeSecure</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">Client Portal</span>
              </Link>

              <nav className="hidden md:flex items-center gap-6" aria-label="Client navigation">
                <Link href="/client/dashboard" className="text-sm font-medium text-primary-600">Dashboard</Link>
                <Link href="/client/policies" className="text-sm font-medium text-secondary-600 hover:text-secondary-900">My Policies</Link>
                <Link href="/client/documents" className="text-sm font-medium text-secondary-600 hover:text-secondary-900">Documents</Link>
                <Link href="/client/payments" className="text-sm font-medium text-secondary-600 hover:text-secondary-900">Payments</Link>
                <Link href="/client/profile" className="text-sm font-medium text-secondary-600 hover:text-secondary-900">Profile</Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-secondary-600 hover:text-secondary-900 rounded-lg hover:bg-secondary-100" aria-label="Notifications">
                <BellIcon className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-secondary-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-medium">
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-secondary-900">{session?.user?.name}</p>
                  <p className="text-xs text-secondary-500">{session?.user?.email}</p>
                </div>
                <Link href="/auth/logout" className="text-sm text-secondary-600 hover:text-primary-600">Sign Out</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {/* Welcome Banner */}
        <div className="mb-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold">Welcome back, {session?.user?.name?.split(' ')[0]}!</h1>
              <p className="mt-2 text-primary-100">Here's an overview of your life insurance coverage.</p>
            </div>
            <Link
              href="/quote"
              className="btn btn-secondary bg-white/10 text-white hover:bg-white/20 border-white/20 inline-flex items-center gap-2"
            >
              Add Coverage <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-500">Total Coverage</p>
                  <p className="text-2xl font-bold text-secondary-900">{formatCurrency(totalCoverage)}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <ShieldCheckIcon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-500">Monthly Premiums</p>
                  <p className="text-2xl font-bold text-secondary-900">{formatCurrency(monthlyPremiums)}/mo</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <CreditCardIcon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-500">Active Policies</p>
                  <p className="text-2xl font-bold text-secondary-900">{activePolicies}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <DocumentTextIcon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-500">Next Payment</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {mockPolicies.length > 0
                      ? format(new Date(Math.min(...mockPolicies.map(p => new Date(p.nextPaymentDate).getTime()))), 'MMM d')
                      : '—'}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                  <CalendarIcon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Policies Overview */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Policies */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-secondary-900">Your Policies</h2>
              <Button variant="outline" size="sm" >
                <Link href="/client/policies">View All <ArrowRightIcon className="h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="space-y-4">
              {mockPolicies.map((policy) => (
                <Card key={policy.id} hover>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-xl',
                          policy.productType === 'term' && 'bg-blue-100 text-blue-600',
                          policy.productType === 'whole' && 'bg-green-100 text-green-600',
                          policy.productType === 'universal' && 'bg-purple-100 text-purple-600',
                        )}>
                          <ShieldCheckIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-secondary-900">{policy.productName}</h3>
                          <p className="text-sm text-secondary-500">Policy #{policy.policyNumber}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 md:ml-auto">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-secondary-900">{formatCurrency(policy.coverageAmount)}</p>
                          <p className="text-sm text-secondary-500">Coverage Amount</p>
                        </div>
                        <StatusBadge status={policy.status} />
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-secondary-100 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-sm text-secondary-600">
                        <span className="font-medium text-secondary-900">{formatCurrency(policy.premium.amount)}</span>
                        <span>/{policy.premium.frequency}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-secondary-600">
                        <span>Next payment:</span>
                        <span className="font-medium text-secondary-900">{formatDateShort(policy.nextPaymentDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" >
                          <Link href={`/client/policy/${policy.id}`}>View Details</Link>
                        </Button>
                        <Button variant="ghost" size="sm" >
                          <Link href={`/client/policy/${policy.id}/pay`}>Make Payment</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {mockPolicies.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <ShieldCheckIcon className="h-12 w-12 mx-auto text-secondary-300 mb-4" />
                    <h3 className="text-lg font-medium text-secondary-900 mb-2">No Policies Yet</h3>
                    <p className="text-secondary-600 mb-4">Get started by exploring our coverage options.</p>
                    <Button >
                      <Link href="/quote">Get a Quote</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BellIcon className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                  {unreadNotifications > 0 && (
                    <Badge variant="primary" size="sm">{unreadNotifications} new</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'p-3 rounded-lg border border-secondary-100',
                      !notification.read && 'bg-primary-50 border-primary-100'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className={cn('font-medium text-sm', !notification.read && 'text-secondary-900')}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-secondary-500 mt-0.5">{notification.message}</p>
                      </div>
                      <span className="text-xs text-secondary-400 whitespace-nowrap">{formatDateShort(notification.date)}</span>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full" >
                  <Link href="/client/notifications">View All Notifications</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3" >
                  <Link href="/client/payments">
                    <CreditCardIcon className="h-5 w-5" />
                    Make a Payment
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" >
                  <Link href="/client/documents">
                    <DocumentTextIcon className="h-5 w-5" />
                    View Documents
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" >
                  <Link href="/client/profile">
                    <UserCircleIcon className="h-5 w-5" />
                    Update Profile
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" >
                  <Link href="/client/beneficiaries">
                    <UserCircleIcon className="h-5 w-5" />
                    Manage Beneficiaries
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
