// src/user/infrastructure/models/clientModel.js
import supabase from '../../../config/supabase.js';

const createClientData = async (clientData) => {
  const { data, error } = await supabase
    .from('client_data')
    .insert([{
      id: clientData.id,
      full_name: clientData.fullName,
      date_of_birth: clientData.dateOfBirth,
      gender: clientData.gender,
      created_at: clientData.createdAt
    }]);

  if (error) throw error;
  return data[0];
};

export {
  createClientData
};
