import supabase from '../../../config/supabaseConfig.js';
import TransactionDTO from '../dto/TransactionDTO.js';
import logger from '../../../config/logger.js';

const registerBusinessTransaction = async (user, client, business) => {
  const transactionDetails = new TransactionDTO(user, client, business);

  try {
    const { data, error } = await supabase.rpc('register_business_transaction', {
      user_email: transactionDetails.user_email,
      user_password: transactionDetails.user_password,
      user_role: transactionDetails.user_role,
      user_username: transactionDetails.user_username,
      client_full_name: transactionDetails.client_full_name,
      client_date_of_birth: transactionDetails.client_date_of_birth,
      client_gender: transactionDetails.client_gender,
      business_type_id: transactionDetails.business_type_id,
      business_name: transactionDetails.business_name,
      business_description: transactionDetails.business_description,
      business_address: transactionDetails.business_address,
      business_contact_email: transactionDetails.business_contact_email,
      business_contact_phone: transactionDetails.business_contact_phone,
      business_website_url: transactionDetails.business_website_url,
      business_social_networks_url: transactionDetails.business_social_networks_url
    });
    if (error) {
      logger.error("Error durante la transacción:", error);
      throw new Error('Error interno del servicio');
    }

    return data[0].id;
  } catch (error) {
    logger.error("Error durante la transacción:", error);
    throw new Error('Error interno del servicio');
  }
};

export {
  registerBusinessTransaction
};
