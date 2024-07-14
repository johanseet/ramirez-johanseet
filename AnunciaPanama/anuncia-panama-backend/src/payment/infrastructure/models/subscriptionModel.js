import supabase from '../../../config/supabase.js';

const createSubscriptionInDB = async (subscriptionId, userId, planId) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([
      {
        id: subscriptionId,
        business_id: userId,
        plan_id: planId,
        start_date: new Date(),
        created_at: new Date()
      }
    ]);

  if (error) throw new Error(error.message);
  return data[0];
};

const updateSubscriptionStatusInDB = async (subscriptionId, status) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .update({ status })
    .eq('id', subscriptionId);

  if (error) throw new Error(error.message);
  return data[0];
};

export {
  createSubscriptionInDB,
  updateSubscriptionStatusInDB
};
