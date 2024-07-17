import supabase from '../../../config/supabaseConfig.js';
import logger from '../../../config/logger.js';

const insertSubscription = async (subscriptionData) => {
  console.log("*********************", subscriptionData);
  try {
    // Asegúrate de que las fechas estén en formato ISO 8601
    const formattedSubscriptionData = {
      ...subscriptionData,
      statusUpdateTime: new Date(subscriptionData.statusUpdateTime).toISOString(),
      startTime: new Date(subscriptionData.startTime).toISOString(),
      createdAt: new Date(subscriptionData.createdAt).toISOString()
    };

    console.log("Formato:", formattedSubscriptionData);

    const { data, error } = await supabase
      .from('subscriptions')
      .insert([{
        business_id: formattedSubscriptionData.businessId,
        plan_id: formattedSubscriptionData.planId,
        paypal_subscription_id: formattedSubscriptionData.paypalSubscriptionId,
        status: formattedSubscriptionData.status,
        status_update_time: formattedSubscriptionData.statusUpdateTime,
        start_time: formattedSubscriptionData.startTime,
        payer_id: formattedSubscriptionData.payerId,
        created_at: formattedSubscriptionData.createdAt
    }])
    .select('id');

    console.log("Supabase response data:", data);
    console.log("Supabase response error:", error);

    if (error) {
      logger.error("Error guardando la suscripción del cliente:", error);
      throw new Error('Error interno del servicio');
    }

    if (!data || data.length === 0) {
      throw new Error('No se pudo insertar la suscripción');
    }

    return data[0].id;
  } catch (error) {
    logger.error("Error creando datos de suscripción:", error);
    throw new Error('Error interno del servicio');
  }
};

export {
  insertSubscription
};
