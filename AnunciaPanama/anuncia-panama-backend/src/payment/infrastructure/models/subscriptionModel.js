import { createClient } from '@supabase/supabase-js';
import logger from '../../../config/logger.js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const saveSubscription = async (subscription) => {
  try{
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([subscription]);

  if (error) {
    logger.error("subscriptions insert error:", error);
    throw new Error(error.message);
  }
  logger.debug("subscription insert:", data)
  return data;
}catch(error){
  logger.error("Error durante ejecución del saveSubscription:", error);
}
};

const getSubscriptionById = async (subscriptionId) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('paypal_subscription_id', subscriptionId)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export {
  saveSubscription,
  getSubscriptionById
};
