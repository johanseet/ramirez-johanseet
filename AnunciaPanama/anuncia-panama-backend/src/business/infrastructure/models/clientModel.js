import supabase from '../../../config/supabaseConfig.js';
import logger from '../../../config/logger.js'; 

const createClientData = async (clientData) => {
  try {
    const { data, error } = await supabase
      .from('client_data')
      .insert([{
        id: clientData.id,
        full_name: clientData.fullName,
        date_of_birth: clientData.dateOfBirth,
        gender: clientData.gender,
        created_at: clientData.createdAt
      }]);

    if (error) {
      logger.error("Error creando datos del cliente:", error);
      throw new Error('Error interno del servicio');
    }
    return data[0];
  } catch (error) {
    logger.error("Error creando datos del cliente:", error);
    throw new Error('Error interno del servicio');
  }
};

export {
  createClientData
};
