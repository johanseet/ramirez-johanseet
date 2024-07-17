import supabase from '../../../config/supabaseConfig.js';

const fetchPlansFromDB = async () => {
  const { data, error } = await supabase
    .from('plans')
    .select('*');
  if (error) throw new Error(error.message);
  return data;
};

const getPlanByPaypalIdFromDB = async (paypalPlanId) => {
  console.log("*********************", paypalPlanId)
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('paypal_plan_id', paypalPlanId)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export {
  fetchPlansFromDB,
  getPlanByPaypalIdFromDB
};
