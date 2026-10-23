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
  FilterIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

// Extended mock data
const mockPolicies = [
  {
    id: '1',
    policyNumber: 'LI-2024-001234',
    productName: '20-Year Term Life',
    productType: 'term',
    status: 'active',
    coverageAmount: 500000,
    premium: { amount: 42.50, frequency: 'monthly', currency: 'USD', dueDate: '2024-02-15' },
    nextPaymentDate: '2024-02-15',
    startDate: '2024-01-15',
    endDate: '2044-01-15',
    beneficiaries: [{ name: 'Jane Smith', relationship: 'Spouse', percentage: 100, isPrimary: true }],
    riders: [{ name: 'Accelerated Death Benefit', additionalPremium: 0, isActive: true }],
    cashValue: 0,
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
    startDate: '2023-06-01',
    endDate: null,
    beneficiaries: [
      { name: 'Jane Smith', relationship: 'Spouse', percentage: 60, isPrimary: true },
      { name: 'Michael Smith', relationship: 'Child', percentage: 40, isPrimary: false },
    ],
    riders: [
      { name: 'Waiver of Premium', additionalPremium: 12.00, isActive: true },
      { name: 'Accelerated Death Benefit', additionalPremium: 0, isActive: true },
    ],
    cashValue: 8500,
  },
  {
    id: '3',
    policyNumber: 'LI-2022-009876',
    productName: 'Universal Life Insurance',
    productType: 'universal',
    status: 'lapsed',
    coverageAmount: 100000,
    premium: { amount: 85.00, frequency: 'monthly', currency: 'USD', dueDate: '2023-11-15' },
    nextPaymentDate: '2023-11-15',
    startDate: '2022-03-10',
    endDate: null,
    beneficiaries: [{ name: 'Jane Smith', relationship: 'Spouse', percentage: 100, isPrimary: true }],
    riders: [],
    cashValue: 2100,
  },
];

export default function ClientPoliciesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login?callbackUrl=/client/policies');
    return null;
  }

  const activePolicies = mockPolicies.filter(p => p.status === 'active');
  const lapsedPolicies = mockPolicies.filter(p => p.status === 'lapsed');

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
                <Link href="/client/dashboard" className="text-sm font-medium text-secondary-600 hover:text-secondary-900">Dashboard</Link>
                <Link href="/client/policies" className="text-sm font-medium text-primary-600">My Policies</Link>
                <Link href="/client/documents" className="text-sm font-medium text-secondary-600 hover:text-secondary-900">Documents</Link>
                <Link href="/client/payments" className="text-sm font-medium text-secondary-600 hover:text-secondary-900">Payments</Link>
                <Link href="/client/profile" className="text-sm font-medium text-secondary-600 hover:text-secondary-900">Profile</Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-secondary-900">{session?.user?.name}</p>
                <p className="text-xs text-secondary-500">{session?.user?.email}</p>
              </div>
              <Link href="/auth/logout" className="text-sm text-secondary-600 hover:text-primary-600">Sign Out</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-secondary-900">My Policies</h1>
              <p className="mt-1 text-secondary-600">Manage and view all your life insurance policies</p>
            </div>
            <Button >
              <Link href="/quote">Add New Policy <PlusIcon className="h-4 w-4" /></Link>
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Search policies..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
              />
            </div>
            <select className="px-4 py-2 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none">
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="lapsed">Lapsed</option>
              <option value="pending">Pending</option>
            </select>
            <Button variant="outline" className="gap-2">
              <FilterIcon className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Policy Cards */}
        <div className="space-y-6">
          {/* Active Policies */}
          {activePolicies.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                <Badge variant="success" size="sm" dot>Active</Badge>
                Active Policies ({activePolicies.length})
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activePolicies.map((policy) => (
                  <PolicyCard key={policy.id} policy={policy} />
                ))}
              </div>
            </section>
          )}

          {/* Lapsed/Other Policies */}
          {lapsedPolicies.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                <Badge variant="danger" size="sm" dot>Other</Badge>
                Other Policies ({lapsedPolicies.length})
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {lapsedPolicies.map((policy) => (
                  <PolicyCard key={policy.id} policy={policy} />
                ))}
              </div>
            </section>
          )}

          {mockPolicies.length === 0 && (
            <Card className="text-center py-16">
              <CardContent>
                <ShieldCheckIcon className="h-16 w-16 mx-auto text-secondary-300 mb-4" />
                <h3 className="text-xl font-medium text-secondary-900 mb-2">No Policies Found</h3>
                <p className="text-secondary-600 mb-6 max-w-md mx-auto">
                  You don't have any policies yet. Start by getting a quote to find the right coverage for you.
                </p>
                <Button size="lg" >
                  <Link href="/quote">Get a Quote</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

function PolicyCard({ policy }: { policy: typeof mockPolicies[0] }) {
  const productColors = {
    term: 'bg-blue-100 text-blue-600',
    whole: 'bg-green-100 text-green-600',
    universal: 'bg-purple-100 text-purple-600',
    indexed: 'bg-orange-100 text-orange-600',
    variable: 'bg-pink-100 text-pink-600',
  };

  return (
    <Card hover>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', productColors[policy.productType] || 'bg-primary-100 text-primary-600')}>
              <ShieldCheckIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900">{policy.productName}</h3>
              <p className="text-sm text-secondary-500">#{policy.policyNumber}</p>
            </div>
          </div>
          <StatusBadge status={policy.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-secondary-500">Coverage</p>
            <p className="text-2xl font-bold text-secondary-900">{formatCurrency(policy.coverageAmount)}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-500">Premium</p>
            <p className="text-lg font-semibold text-secondary-900">{formatCurrency(policy.premium.amount)}/{policy.premium.frequency.slice(0, 3)}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-500">Next Payment</p>
            <p className="text-sm font-medium text-secondary-900">{formatDateShort(policy.nextPaymentDate)}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-500">Since</p>
            <p className="text-sm font-medium text-secondary-900">{formatDateShort(policy.startDate)}</p>
          </div>
        </div>

        {policy.cashValue > 0 && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-green-700">Cash Value: <span className="font-semibold">{formatCurrency(policy.cashValue)}</span></p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm"  className="flex-1 min-w-[120px]">
            <Link href={`/client/policy/${policy.id}`}>View Details</Link>
          </Button>
          <Button variant="ghost" size="sm"  className="flex-1 min-w-[120px]">
            <Link href={`/client/policy/${policy.id}/pay`}>Pay</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
