const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API_URL = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('PayPal credentials not configured');
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = await response.json();
  return data.access_token;
}

export async function createOrder(items: any[]) {
  const accessToken = await getAccessToken();
  const url = `${PAYPAL_API_URL}/v2/checkout/orders`;

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD', // PayPal doesn't support ARS for checkout easily, using USD for demo
          value: totalAmount.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: totalAmount.toFixed(2),
            },
          },
        },
        items: items.map((item) => ({
          name: item.name,
          description: `Talla: ${item.selectedSize || 'N/A'}`,
          quantity: item.quantity.toString(),
          unit_amount: {
            currency_code: 'USD',
            value: item.price.toFixed(2),
          },
        })),
      },
    ],
    application_context: {
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
      shipping_preference: 'NO_SHIPPING',
      user_action: 'PAY_NOW',
    },
  };

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data;
}

