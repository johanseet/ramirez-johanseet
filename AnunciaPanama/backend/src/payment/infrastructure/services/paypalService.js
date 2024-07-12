import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { createSubscriptionInDB, updateSubscriptionStatusInDB } from '../models/subscriptionModel.js';

let cachedAccessToken = null;
let tokenExpirationTime = null;

const getAccessToken = async () => {
  if (cachedAccessToken && new Date() < tokenExpirationTime) {
    return cachedAccessToken;
  }

  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', 'grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  cachedAccessToken = response.data.access_token;
  tokenExpirationTime = new Date(new Date().getTime() + response.data.expires_in * 1000 - 60000); // Renovar el token un minuto antes de que expire
  return cachedAccessToken;
};

const createPayPalSubscription = async (plan, userId) => {
  try {
    const accessToken = await getAccessToken();
    const subscriptionId = uuidv4();
  
    const subscriptionData = {
      plan_id: plan,
      subscriber: {
        name: {
          given_name: "Customer",
          surname: "Business"
        },
        email_address: "customer@example.com"
      },
      application_context: {
        brand_name: "YourApp",
        locale: "en-US",
        shipping_preference: "SET_PROVIDED_ADDRESS",
        user_action: "SUBSCRIBE_NOW",
        payment_method: {
          payer_selected: "PAYPAL",
          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED"
        },
        return_url: "https://yourapp.com/subscription-success",
        cancel_url: "https://yourapp.com/subscription-cancel"
      }
    };

    const response = await axios.post('https://api-m.sandbox.paypal.com/v1/billing/subscriptions', subscriptionData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    await createSubscriptionInDB(subscriptionId, userId, plan);

    return response.data;
  } catch (error) {
    console.error('Error creating PayPal subscription:', error.response ? error.response.data : error.message);
    throw new Error('Failed to create PayPal subscription');
  }
};

const verifyPayPalWebhook = (req) => {
  const transmissionId = req.headers['paypal-transmission-id'];
  const timestamp = req.headers['paypal-transmission-time'];
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  const transmissionSig = req.headers['paypal-transmission-sig'];
  const certUrl = req.headers['paypal-cert-url'];
  const authAlgo = req.headers['paypal-auth-algo'];
  const webhookEvent = req.body;

  const expectedSignature = crypto.createHmac('sha256', process.env.PAYPAL_WEBHOOK_SECRET)
    .update(transmissionId + "|" + timestamp + "|" + webhookId + "|" + JSON.stringify(webhookEvent))
    .digest('base64');

  return transmissionSig === expectedSignature;
};

const handlePayPalWebhook = async (req, res) => {
  if (!verifyPayPalWebhook(req)) {
    return res.status(400).send('Invalid signature');
  }

  const eventType = req.body.event_type;
  const subscriptionId = req.body.resource.id;

  if (eventType === 'BILLING.SUBSCRIPTION.ACTIVATED') {
    await updateSubscriptionStatusInDB(subscriptionId, 'active');
  } else if (eventType === 'BILLING.SUBSCRIPTION.CANCELLED') {
    await updateSubscriptionStatusInDB(subscriptionId, 'cancelled');
  } else if (eventType === 'BILLING.SUBSCRIPTION.EXPIRED') {
    await updateSubscriptionStatusInDB(subscriptionId, 'expired');
  }

  res.status(200).send('Webhook handled');
};

const handlePayPalSuccess = async (token, plan, businessData, user) => {
  // Aquí puedes procesar el token, plan y demás datos necesarios.
};

export {
  createPayPalSubscription,
  handlePayPalWebhook,
  handlePayPalSuccess
};
