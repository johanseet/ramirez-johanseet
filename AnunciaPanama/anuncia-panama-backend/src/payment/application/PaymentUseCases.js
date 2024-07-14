import { createPayPalSubscription as createPayPalSubscriptionService } from '../infrastructure/services/paypalService.js';
import Payment from '../domain/Payment.js';
import supabase from '../../config/supabase.js';

const createPayPalSubscription = async (businessId, planId) => {
  const subscriptionData = await createPayPalSubscriptionService(planId, businessId);

  const payment = new Payment(null, businessId, planId, subscriptionData.id, new Date(), null, new Date());

  const { data, error } = await supabase
    .from('subscriptions')
    .insert([payment]);

  if (error) throw error;
  return data[0];
};

export {
  createPayPalSubscription
};
