import supabase from '../../../config/supabase.js';

const fetchPlans = async () => {
  const { data, error } = await supabase
    .from('plans')
    .select('*');
  if (error) throw new Error(error.message);
  return data;
};

export {
  fetchPlans
};
