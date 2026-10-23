import { NextRequest, NextResponse } from 'next/server';
import { quoteRequestSchema } from '@/lib/validations';
import { addOrUpdateSubscriber, trackEvent } from '@/lib/integrations/mailchimp';
import { createOrUpdateContact, createDeal } from '@/lib/integrations/hubspot';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = quoteRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Calculate estimated premium (simplified)
    const age = new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear();
    const baseRate = data.coverageAmount / 1000;
    let multiplier = 0;

    if (age < 30) multiplier = 0.15;
    else if (age < 40) multiplier = 0.25;
    else if (age < 50) multiplier = 0.55;
    else if (age < 60) multiplier = 1.2;
    else multiplier = 2.5;

    const productMultipliers = {
      term: 1,
      whole: 4,
      universal: 3,
      variable: 3.5,
      indexed: 3,
    };

    const healthMultipliers = {
      preferred_plus: 0.7,
      preferred: 0.85,
      standard_plus: 1,
      standard: 1.25,
      substandard: 2,
    };

    const tobaccoMultiplier = data.tobaccoUse ? 2.5 : 1;
    const termMultiplier = data.productType === 'term' && data.termLength
      ? 1 + (data.termLength - 10) * 0.02
      : 1;

    const estimatedMonthly = Math.round(
      baseRate * multiplier *
      (productMultipliers[data.productType] || 1) *
      (healthMultipliers[data.healthRating || 'standard'] || 1) *
      tobaccoMultiplier *
      termMultiplier
    );

    // Integrate with Mailchimp
    await addOrUpdateSubscriber(data.email, {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      state: data.state,
      dateOfBirth: data.dateOfBirth,
      coverageAmount: data.coverageAmount,
      productType: data.productType,
      source: 'quote_form',
      tags: ['quote_request', data.productType],
    });

    // Track quote request event
    await trackEvent(data.email, 'quote_requested', {
      product_type: data.productType,
      coverage_amount: data.coverageAmount,
      estimated_premium: estimatedMonthly,
    });

    // Integrate with HubSpot CRM
    const contactResult = await createOrUpdateContact({
      email: data.email,
      firstname: data.firstName,
      lastname: data.lastName,
      phone: data.phone,
      state: data.state,
      date_of_birth: data.dateOfBirth,
      coverage_amount: data.coverageAmount.toString(),
      product_interest: data.productType,
      lead_source: 'website_quote_form',
      lifecycle_stage: 'lead',
      hs_lead_status: 'NEW',
    });

    if (contactResult.success && contactResult.data) {
      // Create a deal for the quote
      await createDeal({
        dealname: `Quote: ${data.firstName} ${data.lastName} - ${data.productType}`,
        amount: (estimatedMonthly * 12).toString(),
        dealstage: 'appointmentscheduled',
        pipeline: 'default',
        associated_contact_id: contactResult.data.id,
      });
    }

    // In a real app, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify agents
    // 4. Trigger nurture sequence

    console.log('Quote request received:', {
      ...data,
      estimatedMonthly,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      data: {
        quoteId: `Q-${Date.now()}`,
        estimatedMonthly,
        message: 'Quote request submitted successfully. An agent will contact you within 24 hours.',
      },
    });
  } catch (error) {
    console.error('Quote API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}