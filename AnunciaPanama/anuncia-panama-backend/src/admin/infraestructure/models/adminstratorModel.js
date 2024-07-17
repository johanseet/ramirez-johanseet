import supabase from '../../../config/supabaseConfig.js';

const createAdminData = async (adminData) => {
  const { data, error } = await supabase
    .from('administrator_data')
    .insert([adminData]);

  if (error) throw error;
  return data[0];
};

const findAdminDataByUserId = async (user_id) => {
  const { data, error } = await supabase
    .from('administrator_data')
    .select('*')
    .eq('id', user_id);

  if (error) throw error;
  return data.length > 0 ? data[0] : null;
};

export {
  createAdminData,
  findAdminDataByUserId
};
