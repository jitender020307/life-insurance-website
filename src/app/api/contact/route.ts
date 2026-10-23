import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { addOrUpdateSubscriber, trackEvent } from '@/lib/integrations/mailchimp';
import { createOrUpdateContact, addNoteToContact } from '@/lib/integrations/hubspot';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Integrate with Mailchimp
    await addOrUpdateSubscriber(data.email, {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      source: 'contact_form',
      tags: ['contact_form', data.subject],
    });

    // Track contact form submission
    await trackEvent(data.email, 'contact_form_submitted', {
      subject: data.subject,
    });

    // Integrate with HubSpot CRM
    const contactResult = await createOrUpdateContact({
      email: data.email,
      firstname: data.firstName,
      lastname: data.lastName,
      phone: data.phone,
      lead_source: 'website_contact_form',
      lifecycle_stage: 'lead',
      hs_lead_status: 'NEW',
    });

    // Add note to contact with the message
    if (contactResult.success && contactResult.data) {
      await addNoteToContact(contactResult.data.id, `Contact Form Submission:\nSubject: ${data.subject}\nMessage: ${data.message}`);
    }

    // In a real app, you would also:
    // 1. Send confirmation email to user
    // 2. Notify support team (Slack, email, etc.)
    // 3. Create support ticket in helpdesk
    // 4. Save to database

    console.log('Contact form submitted:', {
      ...data,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully. We\'ll get back to you within 1 business day.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}