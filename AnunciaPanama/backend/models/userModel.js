import supabase from '../config/supabase.js';

export const createUser = async (user) => {
  const { data, error } = await supabase
    .from('users')
    .insert([user]);
  if (error) throw error;
  return data;
};

export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .limit(1)
    .single();
  if (error) {
    if (error.message === 'Ningun o multiples registros encontrados.') {
      return null;
    }
    throw error;
  }
  return data;
};
