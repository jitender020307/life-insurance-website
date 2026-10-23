'use client';

import { useParams } from 'next/navigation';
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
  UserIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  DownloadIcon,
} from '@heroicons/react/24/outline';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { useState } from 'react';

// Mock policy data - in real app, fetch from API
const mockPolicy = {
  id: '1',
  policyNumber: 'LI-2024-001234',
  productName: '20-Year Term Life Insurance',
  productType: 'term',
  status: 'active',
  coverageAmount: 500000,
  premium: { amount: 42.50, frequency: 'monthly', currency: 'USD', dueDate: '2024-02-15' },
  nextPaymentDate: '2024-02-15',
  startDate: '2024-01-15',
  endDate: '2044-01-15',
  beneficiaries: [
    { id: 'b1', name: 'Jane Smith', relationship: 'Spouse', percentage: 100, isPrimary: true, dateOfBirth: '1985-03-22' },
  ],
  riders: [
    { id: 'r1', name: 'Accelerated Death Benefit', description: 'Access up to 80% of death benefit if diagnosed with terminal illness', additionalPremium: 0, isActive: true },
  ],
  paymentHistory: [
    { id: 'p1', amount: 42.50, date: '2024-01-15', status: 'completed', method: 'auto_pay' },
    { id: 'p2', amount: 42.50, date: '2023-12-15', status: 'completed', method: 'auto_pay' },
    { id: 'p3', amount: 42.50, date: '2023-11-15', status: 'completed', method: 'auto_pay' },
  ],
  documents: [
    { id: 'd1', name: 'Policy Contract', type: 'policy', url: '#', uploadedAt: '2024-01-15', size: 2450000 },
    { id: 'd2', name: 'Application Copy', type: 'application', url: '#', uploadedAt: '2024-01-10', size: 1200000 },
    { id: 'd3', name: 'Annual Statement 2023', type: 'statement', url: '#', uploadedAt: '2024-01-05', size: 850000 },
  ],
};

const productColors = {
  term: 'bg-blue-100 text-blue-600',
  whole: 'bg-green-100 text-green-600',
  universal: 'bg-purple-100 text-purple-600',
  indexed: 'bg-orange-100 text-orange-600',
  variable: 'bg-pink-100 text-pink-600',
};

export default function PolicyDetailPage() {
  const params = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (status === 'loading') {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push(`/auth/login?callbackUrl=/client/policy/${params.id}`);
    return null;
  }

  const policy = mockPolicy;

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Client Header */}
      <header className="bg-white border-b border-secondary-200 sticky top-0 z-30">
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/client/dashboard" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="font-heading font-bold text-xl text-secondary-900">LifeSecure</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/client/dashboard" className="text-sm font-medium text-secondary-600 hover:text-secondary-900">Dashboard</Link>
                <Link href="/client/policies" className="text-sm font-medium text-primary-600">My Policies</Link>
                <Link href="/client/documents" className="text-sm font-medium text-secondary-600 hover:text-secondary-900">Documents</Link>
                <Link href="/client/payments" className="text-sm font-medium text-secondary-600 hover:text-secondary-900">Payments</Link>
              </nav>
            </div>
            <Link href="/auth/logout" className="text-sm text-secondary-600 hover:text-primary-600">Sign Out</Link>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-secondary-500" aria-label="Breadcrumb">
          <Link href="/client/dashboard" className="hover:text-secondary-700">Dashboard</Link>
          <span>/</span>
          <Link href="/client/policies" className="hover:text-secondary-700">Policies</Link>
          <span>/</span>
          <span className="text-secondary-900 font-medium">{policy.policyNumber}</span>
        </nav>

        {/* Policy Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', productColors[policy.productType] || 'bg-primary-100 text-primary-600')}>
                  <ShieldCheckIcon className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-secondary-900">{policy.productName}</h1>
                  <p className="text-secondary-600">Policy #{policy.policyNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={policy.status} />
                <Badge variant="secondary" className="capitalize">{policy.productType}</Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/client/policy/${policy.id}/pay`}
                className="btn btn-outline inline-flex items-center gap-2"
              >
                <CreditCardIcon className="h-4 w-4" />
                Make Payment
              </Link>
              <Link
                href="/client/documents"
                className="btn btn-outline inline-flex items-center gap-2"
              >
                <DocumentTextIcon className="h-4 w-4" />
                Documents
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coverage Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Coverage Summary
                  <Badge variant="outline" className="capitalize">{policy.premium.frequency}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="md:col-span-2">
                    <p className="text-sm text-secondary-500">Death Benefit</p>
                    <p className="text-4xl font-bold text-secondary-900">{formatCurrency(policy.coverageAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Premium</p>
                    <p className="text-2xl font-bold text-secondary-900">{formatCurrency(policy.premium.amount)}</p>
                    <p className="text-sm text-secondary-500">/{policy.premium.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Next Due</p>
                    <p className="text-xl font-bold text-secondary-900">{formatDateShort(policy.nextPaymentDate)}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-secondary-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-secondary-500">Policy Date</p>
                    <p className="font-medium">{formatDateShort(policy.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-secondary-500">Expiration</p>
                    <p className="font-medium">{policy.endDate ? formatDateShort(policy.endDate) : 'Lifetime'}</p>
                  </div>
                  <div>
                    <p className="text-secondary-500">Payment Method</p>
                    <p className="font-medium capitalize">{policy.premium.frequency === 'monthly' ? 'Auto-pay' : 'Manual'}</p>
                  </div>
                  <div>
                    <p className="text-secondary-500">Remaining Term</p>
                    <p className="font-medium">{policy.endDate ? `${Math.ceil((new Date(policy.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 365))} years` : 'Lifetime'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Beneficiaries */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Beneficiaries</CardTitle>
                  <Link
                    href={`/client/policy/${policy.id}/beneficiaries`}
                    className="btn btn-outline inline-flex items-center gap-2 text-sm"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add Beneficiary
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {policy.beneficiaries.map((beneficiary) => (
                    <div key={beneficiary.id} className="flex items-center justify-between p-4 rounded-lg border border-secondary-100">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 font-medium">
                          {beneficiary.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">{beneficiary.name}</p>
                          <p className="text-sm text-secondary-500">{beneficiary.relationship} • {beneficiary.percentage}%</p>
                        </div>
                        {beneficiary.isPrimary && <Badge variant="primary" size="sm">Primary</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/client/policy/${policy.id}/beneficiaries/${beneficiary.id}`}
                          className="btn btn-ghost inline-flex items-center gap-2 text-sm"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                  {policy.beneficiaries.length === 0 && (
                    <div className="text-center py-8 text-secondary-500">
                      <p>No beneficiaries designated yet.</p>
                      <Link
                        href={`/client/policy/${policy.id}/beneficiaries`}
                        className="btn btn-outline inline-flex items-center gap-2 text-sm mt-2"
                      >
                        Add Beneficiary
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Riders */}
            <Card>
              <CardHeader>
                <CardTitle>Policy Riders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {policy.riders.length > 0 ? (
                    policy.riders.map((rider) => (
                      <div key={rider.id} className="p-4 rounded-lg border border-secondary-100">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-secondary-900">{rider.name}</p>
                            <p className="text-sm text-secondary-500 mt-1">{rider.description}</p>
                            {rider.additionalPremium > 0 && (
                              <p className="text-sm text-secondary-600 mt-1">
                                Additional premium: {formatCurrency(rider.additionalPremium)}/month
                              </p>
                            )}
                          </div>
                          <Badge variant={rider.isActive ? 'success' : 'secondary'} size="sm">
                            {rider.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-secondary-500">
                      <p>No riders added to this policy.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-secondary-500 border-b border-secondary-100">
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Method</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-100">
                      {policy.paymentHistory.map((payment) => (
                        <tr key={payment.id} className="text-sm">
                          <td className="py-3">{formatDateShort(payment.date)}</td>
                          <td className="py-3 font-medium">{formatCurrency(payment.amount)}</td>
                          <td className="py-3 text-secondary-600 capitalize">{payment.method.replace('_', ' ')}</td>
                          <td className="py-3">
                            <Badge variant={payment.status === 'completed' ? 'success' : 'warning'} size="sm">
                              {payment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link
                  href={`/client/policy/${policy.id}/pay`}
                  className="btn btn-primary w-full justify-start gap-3"
                >
                  <CreditCardIcon className="h-5 w-5" />
                  Make Payment
                </Link>
                <Link
                  href="/client/documents"
                  className="btn btn-outline w-full justify-start gap-3"
                >
                  <DocumentTextIcon className="h-5 w-5" />
                  View Documents
                </Link>
                <Link
                  href={`/client/policy/${policy.id}/beneficiaries`}
                  className="btn btn-outline w-full justify-start gap-3"
                >
                  <UserIcon className="h-5 w-5" />
                  Manage Beneficiaries
                </Link>
                <Link
                  href={`/client/policy/${policy.id}/riders`}
                  className="btn btn-outline w-full justify-start gap-3"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Rider
                </Link>
                <Link
                  href={`/client/policy/${policy.id}/change-coverage`}
                  className="btn btn-outline w-full justify-start gap-3"
                >
                  <ShieldCheckIcon className="h-5 w-5" />
                  Change Coverage
                </Link>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Documents</CardTitle>
                  <Link
                    href="/client/documents"
                    className="btn btn-ghost text-sm"
                  >
                    View All
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {policy.documents.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-secondary-100 hover:bg-secondary-50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-100">
                        <DocumentTextIcon className="h-5 w-5 text-secondary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-secondary-900">{doc.name}</p>
                        <p className="text-xs text-secondary-500">{formatDateShort(doc.uploadedAt)}</p>
                      </div>
                    </div>
                    <a
                      href={doc.url}
                      download
                      className="btn btn-ghost text-sm inline-flex items-center gap-2"
                    >
                      <DownloadIcon className="h-4 w-4" />
                    </a>
                  </div>
                ))}
                <Link
                  href="/client/documents"
                  className="btn btn-ghost text-sm w-full inline-flex items-center justify-center"
                >
                  View All Documents
                </Link>
              </CardContent>
            </Card>

            {/* Policy Info */}
            <Card>
              <CardHeader>
                <CardTitle>Policy Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-secondary-500">Policy Number</dt>
                    <dd className="font-medium text-secondary-900 font-mono">{policy.policyNumber}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-secondary-500">Product Type</dt>
                    <dd className="font-medium text-secondary-900 capitalize">{policy.productType}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-secondary-500">Status</dt>
                    <dd className="font-medium text-secondary-900">
                      <StatusBadge status={policy.status} />
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-secondary-500">Payment Frequency</dt>
                    <dd className="font-medium text-secondary-900 capitalize">{policy.premium.frequency}</dd>
                  </div>
                </dl>
              </CardContent            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}