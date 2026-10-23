import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validations';
import { hash } from 'bcryptjs';
import { addOrUpdateSubscriber } from '@/lib/integrations/mailchimp';
import { createOrUpdateContact } from '@/lib/integrations/hubspot';

// In a real app, you would use a database like Prisma
// This is a mock implementation for demonstration
const users: Array<{
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'client' | 'agent' | 'admin';
  status: 'active' | 'pending' | 'inactive';
  createdAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check if user already exists
    const existingUser = users.find(u => u.email === data.email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(data.password, 12);

    // Create user
    const newUser = {
      id: `user_${Date.now()}`,
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      password: hashedPassword,
      role: 'client' as const,
      status: 'active' as const,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    // Integrate with Mailchimp
    await addOrUpdateSubscriber(data.email, {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      state: data.state,
      dateOfBirth: data.dateOfBirth,
      source: 'registration',
      tags: ['customer', 'registered'],
    });

    // Integrate with HubSpot CRM
    await createOrUpdateContact({
      email: data.email,
      firstname: data.firstName,
      lastname: data.lastName,
      phone: data.phone,
      date_of_birth: data.dateOfBirth,
      lead_source: 'website_registration',
      lifecycle_stage: 'lead',
      hs_lead_status: 'NEW',
    });

    // In a real app, you would also:
    // 1. Send welcome email
    // 2. Create customer profile in policy admin system
    // 3. Trigger onboarding sequence
    // 4. Send verification email (if email verification is required)

    console.log('User registered:', {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Account created successfully. You can now sign in.',
    });
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create account' },
      { status: 500 }
    );
  }
}