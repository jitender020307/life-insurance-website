// HubSpot CRM Integration for Lead Management

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;

const BASE_URL = 'https://api.hubapi.com';

interface HubSpotContact {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  date_of_birth?: string;
  coverage_amount?: string;
  product_interest?: string;
  lead_source?: string;
  lifecycle_stage?: 'subscriber' | 'lead' | 'marketingqualifiedlead' | 'salesqualifiedlead' | 'opportunity' | 'customer';
  hs_lead_status?: 'NEW' | 'OPEN' | 'IN_PROGRESS' | 'OPEN_DEAL' | 'UNQUALIFIED' | 'ATTEMPTED_TO_CONTACT' | 'CONNECTED' | 'BAD_TIMING';
}

interface HubSpotContactResponse {
  id: string;
  properties: HubSpotContact;
  createdAt: string;
  updatedAt: string;
}

interface HubSpotDeal {
  dealname: string;
  amount: string;
  dealstage: string;
  pipeline: string;
  closing_date?: string;
  associated_contact_id?: string;
}

export async function createOrUpdateContact(
  data: HubSpotContact
): Promise<{ success: boolean; data?: HubSpotContactResponse; error?: string }> {
  if (!HUBSPOT_API_KEY) {
    console.warn('HubSpot API key not configured');
    return { success: false, error: 'HubSpot not configured' };
  }

  const properties = {
    email: data.email,
    firstname: data.firstname,
    lastname: data.lastname,
    phone: data.phone,
    address: data.address,
    city: data.city,
    state: data.state,
    zip: data.zip,
    date_of_birth: data.date_of_birth,
    coverage_amount: data.coverage_amount,
    product_interest: data.product_interest,
    lead_source: data.lead_source || 'website',
    lifecycle_stage: data.lifecycle_stage || 'lead',
    hs_lead_status: data.hs_lead_status || 'NEW',
  };

  try {
    // First, search for existing contact by email
    const searchResponse = await fetch(
      `${BASE_URL}/crm/v3/objects/contacts/search?hapikey=${HUBSPOT_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: data.email }] }],
          properties: ['email', 'firstname', 'lastname', 'phone', 'lifecycle_stage', 'hs_lead_status'],
        }),
      }
    );

    const searchResult = await searchResponse.json();

    if (searchResult.results && searchResult.results.length > 0) {
      // Update existing contact
      const contactId = searchResult.results[0].id;
      return updateContact(contactId, properties);
    }

    // Create new contact
    const response = await fetch(`${BASE_URL}/crm/v3/objects/contacts?hapikey=${HUBSPOT_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ properties }),
    });

    const result = await response.json();

    if (response.status >= 400) {
      return { success: false, error: result.message || 'Failed to create contact' };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('HubSpot create contact error:', error);
    return { success: false, error: 'Failed to connect to HubSpot' };
  }
}

export async function updateContact(
  contactId: string,
  properties: Partial<HubSpotContact>
): Promise<{ success: boolean; data?: HubSpotContactResponse; error?: string }> {
  if (!HUBSPOT_API_KEY) {
    return { success: false, error: 'HubSpot not configured' };
  }

  try {
    const response = await fetch(`${BASE_URL}/crm/v3/objects/contacts/${contactId}?hapikey=${HUBSPOT_API_KEY}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ properties }),
    });

    const result = await response.json();

    if (response.status >= 400) {
      return { success: false, error: result.message || 'Failed to update contact' };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('HubSpot update contact error:', error);
    return { success: false, error: 'Failed to connect to HubSpot' };
  }
}

export async function createDeal(
  data: HubSpotDeal
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  if (!HUBSPOT_API_KEY) {
    return { success: false, error: 'HubSpot not configured' };
  }

  try {
    const response = await fetch(`${BASE_URL}/crm/v3/objects/deals?hapikey=${HUBSPOT_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        properties: {
          dealname: data.dealname,
          amount: data.amount,
          dealstage: data.dealstage,
          pipeline: data.pipeline,
          closing_date: data.closing_date,
        },
        associations: data.associated_contact_id
          ? [
              {
                to: { id: data.associated_contact_id },
                types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
              },
            ]
          : [],
      }),
    });

    const result = await response.json();

    if (response.status >= 400) {
      return { success: false, error: result.message || 'Failed to create deal' };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('HubSpot create deal error:', error);
    return { success: false, error: 'Failed to connect to HubSpot' };
  }
}

export async function associateContactWithDeal(
  contactId: string,
  dealId: string
): Promise<{ success: boolean; error?: string }> {
  if (!HUBSPOT_API_KEY) {
    return { success: false, error: 'HubSpot not configured' };
  }

  try {
    const response = await fetch(
      `${BASE_URL}/crm/v3/objects/contacts/${contactId}/associations/deals/${dealId}/3?hapikey=${HUBSPOT_API_KEY}`,
      {
        method: 'PUT',
      }
    );

    if (response.status >= 400) {
      const result = await response.json();
      return { success: false, error: result.message || 'Failed to associate contact with deal' };
    }

    return { success: true };
  } catch (error) {
    console.error('HubSpot associate error:', error);
    return { success: false, error: 'Failed to connect to HubSpot' };
  }
}

export async function getContactByEmail(email: string): Promise<{ success: boolean; data?: HubSpotContactResponse; error?: string }> {
  if (!HUBSPOT_API_KEY) {
    return { success: false, error: 'HubSpot not configured' };
  }

  try {
    const response = await fetch(
      `${BASE_URL}/crm/v3/objects/contacts/${email}?idProperty=email&hapikey=${HUBSPOT_API_KEY}`
    );

    if (response.status === 404) {
      return { success: false, error: 'Contact not found' };
    }

    const result = await response.json();

    if (response.status >= 400) {
      return { success: false, error: result.message || 'Failed to get contact' };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('HubSpot get contact error:', error);
    return { success: false, error: 'Failed to connect to HubSpot' };
  }
}

export async function addNoteToContact(
  contactId: string,
  note: string
): Promise<{ success: boolean; error?: string }> {
  if (!HUBSPOT_API_KEY) {
    return { success: false, error: 'HubSpot not configured' };
  }

  try {
    const response = await fetch(`${BASE_URL}/crm/v3/objects/notes?hapikey=${HUBSPOT_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        properties: {
          hs_note_body: note,
          hs_timestamp: new Date().toISOString(),
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
          },
        ],
      }),
    });

    if (response.status >= 400) {
      const result = await response.json();
      return { success: false, error: result.message || 'Failed to add note' };
    }

    return { success: true };
  } catch (error) {
    console.error('HubSpot add note error:', error);
    return { success: false, error: 'Failed to connect to HubSpot' };
  }
}