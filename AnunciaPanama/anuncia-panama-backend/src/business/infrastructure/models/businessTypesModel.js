import supabase from '../../../config/supabase.js';

const fetchBusinessTypesFromDB = async () => {
  const { data, error } = await supabase
    .from('business_types')
    .select('*');
  if (error) throw new Error(error.message);
  return data;
};

export {
  fetchBusinessTypesFromDB
};
