import supabase from '../../../config/supabaseConfig.js';
import logger from '../../../config/logger.js';

const createUser = async (userData) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        email: userData.email,
        password: userData.password,
        role: userData.role,
        username: userData.username
      }]);

    if (error) {
      logger.error("Error creando usuario:", error);
      throw new Error('Error interno del servicio');
    }
    return data[0];
  } catch (error) {
    logger.error("Error creando usuario:", error);
    throw new Error('Error interno del servicio');
  }
};

const findUserByUsername = async (username) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username);

    if (error) {
      logger.error("Error encontrando usuario por nombre de usuario:", error);
      throw new Error('Error interno del servicio');
    }
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    logger.error("Error encontrando usuario por nombre de usuario:", error);
    throw new Error('Error interno del servicio');
  }
};

const findUserByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    if (error) {
      logger.error("Error encontrando usuario por email:", error);
      throw new Error('Error interno del servicio');
    }
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    logger.error("Error encontrando usuario por email:", error);
    throw new Error('Error interno del servicio');
  }
};

export {
  createUser,
  findUserByUsername,
  findUserByEmail
};
