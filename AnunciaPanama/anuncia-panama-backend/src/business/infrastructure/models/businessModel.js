import supabase from '../../../config/supabaseConfig.js';
import logger from '../../../config/logger.js';

const createBusinessData = async (businessData) => {
  try {
    const { data, error } = await supabase
      .from('business_data')
      .insert([businessData]);

    if (error) {
      logger.error("Error creando datos del negocio:", error);
      throw new Error('Error interno del servicio');
    }
    return data[0];
  } catch (error) {
    logger.error("Error creando datos del negocio:", error);
    throw new Error('Error interno del servicio');
  }
};

const findBusinessDataByUserId = async (user_id) => {
  try {
    const { data, error } = await supabase
      .from('business_data')
      .select('*')
      .eq('id', user_id);

    if (error) {
      logger.error("Error encontrando datos del negocio por ID de usuario:", error);
      throw new Error('Error interno del servicio');
    }
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    logger.error("Error encontrando datos del negocio por ID de usuario:", error);
    throw new Error('Error interno del servicio');
  }
};

const linkSubscriptionToBusiness = async (businessId, subscriptionId) => {
  try {
    const { error } = await supabase
      .from('business_data')
      .update({ paypal_subscription_id: subscriptionId })
      .eq('id', businessId);

    if (error) {
      logger.error("Error vinculando suscripción al negocio:", error);
      throw new Error('Error interno del servicio');
    }
  } catch (error) {
    logger.error("Error vinculando suscripción al negocio:", error);
    throw new Error('Error interno del servicio');
  }
};

export {
  createBusinessData,
  findBusinessDataByUserId,
  linkSubscriptionToBusiness
};
