import supabase from '../../../config/supabaseConfig.js';
import logger from '../../../config/logger.js';

const insertSubscriptionPaymentHistory = async (subscriptionPaymentData) => {
  try {
    // Asegúrate de que las fechas estén en formato ISO 8601
    const formattedSubscriptionPaymentData = {
      ...subscriptionPaymentData,
      paymentTime: new Date(subscriptionPaymentData.paymentTime).toISOString()
    };

    console.log("Formato insertSubscriptionPaymentHistory Data:", formattedSubscriptionPaymentData);

    const { data, error } = await supabase
      .from('subscription_payment_history')
      .insert([{
        subscription_id: formattedSubscriptionPaymentData.subscriptionId,
        cycle_sequence: formattedSubscriptionPaymentData.cycle_sequence,
        gross_amount: formattedSubscriptionPaymentData.grossAmount,
        total_item_amount: formattedSubscriptionPaymentData.totalItemAmount,
        shipping_amount: formattedSubscriptionPaymentData.shippingAmount,
        tax_amount: formattedSubscriptionPaymentData.taxAmount,
        payment_time: formattedSubscriptionPaymentData.paymentTime
    }])
    .select('id');

    console.log("Supabase response data:", data);
    console.log("Supabase response error:", error);

    if (error) {
      logger.error("Error guardando el historial de pago de la suscripción del cliente:", error);
      throw new Error('Error interno del servicio');
    }

    if (!data || data.length === 0) {
      throw new Error('No se pudo insertar el historial de pago de la suscripción');
    }

    return data[0].id;
  } catch (error) {
    logger.error("Error creando datos de historial de suscripción:", error);
    throw new Error('Error interno del servicio');
  }
};

export {
  insertSubscriptionPaymentHistory
};
