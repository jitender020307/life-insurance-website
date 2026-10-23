// Mailchimp Integration for Lead Management

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX || 'us1';

const BASE_URL = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0`;

interface MailchimpMember {
  email_address: string;
  status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
  merge_fields?: {
    FNAME?: string;
    LNAME?: string;
    PHONE?: string;
    ADDRESS?: string;
    CITY?: string;
    STATE?: string;
    ZIP?: string;
    DOB?: string;
    COVERAGE?: string;
    PRODUCT?: string;
    SOURCE?: string;
  };
  tags?: string[];
}

interface MailchimpResponse {
  id: string;
  email_address: string;
  status: string;
}

export async function addOrUpdateSubscriber(
  email: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    dateOfBirth?: string;
    coverageAmount?: number;
    productType?: string;
    source?: string;
    tags?: string[];
  }
): Promise<{ success: boolean; data?: MailchimpResponse; error?: string }> {
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) {
    console.warn('Mailchimp credentials not configured');
    return { success: false, error: 'Mailchimp not configured' };
  }

  const member: MailchimpMember = {
    email_address: email.toLowerCase(),
    status: 'subscribed',
    merge_fields: {
      FNAME: data.firstName,
      LNAME: data.lastName,
      PHONE: data.phone,
      ADDRESS: data.address,
      CITY: data.city,
      STATE: data.state,
      ZIP: data.zipCode,
      DOB: data.dateOfBirth,
      COVERAGE: data.coverageAmount ? formatCurrency(data.coverageAmount) : undefined,
      PRODUCT: data.productType,
      SOURCE: data.source || 'website',
    },
    tags: data.tags || ['lead', 'website'],
  };

  try {
    const response = await fetch(`${BASE_URL}/lists/${MAILCHIMP_AUDIENCE_ID}/members`, {
      method: 'POST',
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });

    const result = await response.json();

    if (response.status >= 400) {
      // If member exists, try to update
      if (result.title === 'Member Exists') {
        return updateSubscriber(email, data);
      }
      return { success: false, error: result.detail || 'Failed to add subscriber' };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Mailchimp add subscriber error:', error);
    return { success: false, error: 'Failed to connect to Mailchimp' };
  }
}

export async function updateSubscriber(
  email: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    tags?: string[];
    [key: string]: unknown;
  }
): Promise<{ success: boolean; data?: MailchimpResponse; error?: string }> {
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) {
    return { success: false, error: 'Mailchimp not configured' };
  }

  const subscriberHash = await getSubscriberHash(email);

  try {
    const response = await fetch(`${BASE_URL}/lists/${MAILCHIMP_AUDIENCE_ID}/members/${subscriberHash}`, {
      method: 'PATCH',
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merge_fields: {
          FNAME: data.firstName,
          LNAME: data.lastName,
          PHONE: data.phone,
        },
        tags: data.tags,
      }),
    });

    const result = await response.json();

    if (response.status >= 400) {
      return { success: false, error: result.detail || 'Failed to update subscriber' };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Mailchimp update subscriber error:', error);
    return { success: false, error: 'Failed to connect to Mailchimp' };
  }
}

export async function addTagsToSubscriber(
  email: string,
  tags: string[]
): Promise<{ success: boolean; error?: string }> {
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) {
    return { success: false, error: 'Mailchimp not configured' };
  }

  const subscriberHash = await getSubscriberHash(email);

  try {
    const response = await fetch(`${BASE_URL}/lists/${MAILCHIMP_AUDIENCE_ID}/members/${subscriberHash}/tags`, {
      method: 'POST',
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: tags.map((tag) => ({ name: tag, status: 'active' })),
      }),
    });

    if (response.status >= 400) {
      const result = await response.json();
      return { success: false, error: result.detail || 'Failed to add tags' };
    }

    return { success: true };
  } catch (error) {
    console.error('Mailchimp add tags error:', error);
    return { success: false, error: 'Failed to connect to Mailchimp' };
  }
}

async function getSubscriberHash(email: string): Promise<string> {
  const crypto = await import('crypto');
  return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function trackEvent(
  email: string,
  eventName: string,
  properties?: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  // This would integrate with Mailchimp's marketing automation or a separate analytics tool
  // For now, we'll add a tag to track the event
  return addTagsToSubscriber(email, [`event:${eventName}`]);
}