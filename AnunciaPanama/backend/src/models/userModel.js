import supabase from '../config/supabase.js';

const createUser = async (userData) => {
  const { data, error } = await supabase
    .from('users')
    .insert([userData]);

  if (error) throw error;
  return data[0];
};

const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (error) throw error;
  return data.length > 0 ? data[0] : null;
};

export {
  createUser,
  findUserByEmail
};
