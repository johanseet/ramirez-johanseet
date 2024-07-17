import axios from 'axios';
import logger from '../../../config/logger.js';

const getToken = async () => {
  try {
    const response = await axios.post(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, 'grant_type=client_credentials', {
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_CLIENT_SECRET
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log('Token response:', response.data);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const createProduct = async (name, description) => {
  try {
    const token = await getToken();
    const response = await axios.post(`${process.env.PAYPAL_API_URL}/v1/catalogs/products`, {
      name,
      description,
      type: 'SERVICE',
      category: 'SOFTWARE'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Create product response:', response.data);
    return response.data.id;
  } catch (error) {
    console.error('Error creating product:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const createPlan = async (productId, planName, price) => {
  try {
    const token = await getToken();
    const response = await axios.post(`${process.env.PAYPAL_API_URL}/v1/billing/plans`, {
      product_id: productId,
      name: planName,
      billing_cycles: [
        {
          frequency: {
            interval_unit: 'MONTH',
            interval_count: 1
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: {
            fixed_price: {
              value: price,
              currency_code: 'USD'
            }
          }
        }
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {
          value: '0',
          currency_code: 'USD'
        },
        setup_fee_failure_action: 'CANCEL',
        payment_failure_threshold: 3
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Create plan response:', response.data);
    return response.data.id;
  } catch (error) {
    console.error('Error creating plan:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const createSubscription = async (planId, subscriber, startTime, shippingAmount, shippingAddress) => {
  try {
    logger.debug("planId: ", planId)
    const token = await getToken();
    const request = {
      plan_id: planId,
      start_time: startTime,
      shipping_amount: {
        currency_code: shippingAmount.currency_code,
        value: shippingAmount.value
      },
      subscriber: {
        name: {
          given_name: subscriber.given_name,
          surname: subscriber.surname
        },
        email_address: subscriber.email_address,
        shipping_address: {
          name: {
            full_name: shippingAddress.name.full_name
          },
          address: {
            address_line_1: shippingAddress.address.address_line_1,
            address_line_2: shippingAddress.address.address_line_2,
            admin_area_2: shippingAddress.address.admin_area_2,
            admin_area_1: shippingAddress.address.admin_area_1,
            postal_code: shippingAddress.address.postal_code,
            country_code: shippingAddress.address.country_code
          }
        }
      },
      application_context: {
        brand_name: 'Anuncia Panama',
        locale: 'en-US',
        shipping_preference: 'SET_PROVIDED_ADDRESS',
        user_action: 'SUBSCRIBE_NOW',
        payment_method: {
          payer_selected: 'PAYPAL',
          payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
        },
        return_url: 'https://example.com/return',
        cancel_url: 'https://example.com/cancel'
      }
    }
    logger.debug("Request /v1/billing/subscriptions: ", request)
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.post(`${process.env.PAYPAL_API_URL}/v1/billing/subscriptions`, request, headers);
    return response.data;
  } catch (error) {
    logger.error("Error durante ejecución del createSubscription:", error);
    throw error;
  }
};

export {
  createProduct,
  createPlan,
  createSubscription
};
