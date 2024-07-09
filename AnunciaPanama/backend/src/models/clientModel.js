import supabase from '../config/supabase.js';

const createClientData = async (clientData) => {
  const { data, error } = await supabase
    .from('client_data')
    .insert([clientData]);

  if (error) throw error;
  return data[0];
};

const findClientDataByUserId = async (user_id) => {
  const { data, error } = await supabase
    .from('client_data')
    .select('*')
    .eq('id', user_id);

  if (error) throw error;
  return data.length > 0 ? data[0] : null;
};

export {
  createClientData,
  findClientDataByUserId
};
