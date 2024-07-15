-- Definir la función de transacción
CREATE OR REPLACE FUNCTION register_business_transaction(
  user_email VARCHAR,
  user_password VARCHAR,
  user_role VARCHAR,
  user_username VARCHAR,
  client_full_name VARCHAR,
  client_date_of_birth DATE,
  client_gender VARCHAR,
  business_type_id UUID,
  business_name VARCHAR,
  business_description TEXT,
  business_address TEXT,
  business_contact_email VARCHAR,
  business_contact_phone VARCHAR,
  business_website_url VARCHAR,
  business_social_networks_url JSONB
) RETURNS TABLE (id UUID) AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Insertar usuario
  INSERT INTO users (email, password, role, username)
  VALUES (user_email, user_password, user_role, user_username)
  RETURNING users.id INTO user_id;

  -- Insertar datos del cliente
  INSERT INTO client_data (id, full_name, date_of_birth, gender)
  VALUES (user_id, client_full_name, client_date_of_birth, client_gender);

  -- Insertar datos del negocio
  INSERT INTO business_data (id, business_type_id, name, description, address, contact_email, contact_phone, website_url, social_networks_url)
  VALUES (user_id, business_type_id, business_name, business_description, business_address, business_contact_email, business_contact_phone, business_website_url, business_social_networks_url);

  RETURN QUERY SELECT user_id;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error occurred during transaction: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;