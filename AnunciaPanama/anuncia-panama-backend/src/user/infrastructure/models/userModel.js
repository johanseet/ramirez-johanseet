import supabase from '../../../config/supabaseConfig.js';

const createUser = async (userData) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{
      email: userData.email,
      password: userData.password,
      role: userData.role,
      username: userData.username,
      created_at: userData.createdAt
    }]);

  if (error) throw error;
  return data[0];
};

const findUserByUsername = async (username) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username);

  if (error) throw error;
  return data.length > 0 ? data[0] : null;
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
  findUserByEmail,
  findUserByUsername
};
