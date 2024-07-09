import supabase from '../config/supabase.js';

const createBusinessData = async (businessData) => {
  const { data, error } = await supabase
    .from('business_data')
    .insert([businessData]);

  if (error) throw error;
  return data[0];
};

const findBusinessDataByUserId = async (user_id) => {
  const { data, error } = await supabase
    .from('business_data')
    .select('*')
    .eq('id', user_id);

  if (error) throw error;
  return data.length > 0 ? data[0] : null;
};

export {
  createBusinessData,
  findBusinessDataByUserId
};
