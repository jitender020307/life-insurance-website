import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Mock policies data - in real app, fetch from database
const mockPolicies = [
  {
    id: '1',
    userId: '1',
    policyNumber: 'LI-2024-001234',
    productName: '20-Year Term Life Insurance',
    productType: 'term',
    status: 'active',
    coverageAmount: 500000,
    premium: { amount: 42.50, frequency: 'monthly', currency: 'USD', dueDate: '2024-02-15' },
    nextPaymentDate: '2024-02-15',
    startDate: '2024-01-15',
    endDate: '2044-01-15',
    beneficiaries: [{ id: 'b1', name: 'Jane Smith', relationship: 'Spouse', percentage: 100, isPrimary: true, dateOfBirth: '1985-03-22' }],
    riders: [{ id: 'r1', name: 'Accelerated Death Benefit', description: 'Access up to 80% of death benefit if diagnosed with terminal illness', additionalPremium: 0, isActive: true }],
    paymentHistory: [
      { id: 'p1', amount: 42.50, date: '2024-01-15', status: 'completed', method: 'auto_pay' },
      { id: 'p2', amount: 42.50, date: '2023-12-15', status: 'completed', method: 'auto_pay' },
    ],
    documents: [
      { id: 'd1', name: 'Policy Contract', type: 'policy', url: '#', uploadedAt: '2024-01-15', size: 2450000 },
      { id: 'd2', name: 'Application Copy', type: 'application', url: '#', uploadedAt: '2024-01-10', size: 1200000 },
    ],
  },
];

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // In a real app, filter by user ID
    const userPolicies = mockPolicies.filter(p => p.userId === session.user.id);

    return NextResponse.json({
      success: true,
      data: userPolicies,
    });
  } catch (error) {
    console.error('Policies API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch policies' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // In a real app, create policy in database
    // This would typically be done after application approval

    return NextResponse.json({
      success: true,
      message: 'Policy creation initiated',
    });
  } catch (error) {
    console.error('Create policy API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create policy' },
      { status: 500 }
    );
  }
}