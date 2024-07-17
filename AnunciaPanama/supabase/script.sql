-- Eliminar tablas existentes con CASCADE
DROP TABLE IF EXISTS order_coupons CASCADE;
DROP TABLE IF EXISTS wishlist_items CASCADE;
DROP TABLE IF EXISTS wishlists CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS support_responses CASCADE;
DROP TABLE IF EXISTS support_tickets CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS order_history CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS advertisements CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS business_data CASCADE;
DROP TABLE IF EXISTS business_types CASCADE;
DROP TABLE IF EXISTS client_data CASCADE;
DROP TABLE IF EXISTS administrator_data CASCADE;
DROP TABLE IF EXISTS plans CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;
DROP TABLE IF EXISTS user_meta CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;

-- Crear tablas nuevas

-- Tabla de usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) CHECK (role IN ('administrator', 'client', 'business')) NOT NULL,
  username VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Tabla de datos del cliente
CREATE TABLE client_data (
  id UUID PRIMARY KEY, -- Same as user_id from users table
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10) CHECK (gender IN ('female', 'male', 'other')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de tipos de comercios
CREATE TABLE business_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Tabla de datos del comercio
CREATE TABLE business_data (
  id UUID PRIMARY KEY, -- Same as user_id from users table
  business_type_id UUID REFERENCES business_types(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  website_url VARCHAR(255),
  logo_url VARCHAR(255),
  social_networks_url JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de datos de administradores
CREATE TABLE administrator_data (
  id UUID PRIMARY KEY, -- Same as user_id from users table
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de sesiones
CREATE TABLE sessions (
  sid TEXT PRIMARY KEY,
  data TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crear tabla de planes de suscripción
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    paypal_plan_id VARCHAR(255),
    cost DECIMAL(10, 2) NOT NULL,
    max_ads_per_month INTEGER,
    description TEXT NOT NULL,
    features JSONB, -- JSONB para almacenar arrays de características
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Insertar los planes de suscripción
INSERT INTO plans (name, paypal_plan_id, cost, max_ads_per_month, description, features) VALUES 
('Freemium',null , 0.00, 3, 'Crear hasta 3 anuncios al mes.', '["Acceso básico a estadísticas de rendimiento", "Segmentación básica por edad y género", "Soporte vía correo electrónico"]'::jsonb),
('Básico', 'P-9GS50260GV547151EM2LMXBI' , 10.00, 10, 'Ideal para pequeñas empresas que desean aumentar su visibilidad.', '["Crear hasta 10 anuncios al mes", "Acceso a estadísticas detalladas", "Segmentación avanzada por edad, género, ubicación e intereses", "Soporte prioritario vía correo electrónico y chat"]'::jsonb),
('Profesional','P-0YU11842KJ006862XM2LNNXI', 30.00, NULL, 'Para empresas que desean maximizar su alcance y optimización.', '["Crear anuncios ilimitados", "Acceso completo a estadísticas con informes descargables", "Segmentación avanzada y retargeting", "Análisis de competencia y recomendaciones para optimización", "Soporte premium vía correo electrónico, chat y teléfono"]'::jsonb),
('Premium','P-3E659846UP649024EM2LNOFA', 50.00, NULL, 'Para grandes empresas con necesidades avanzadas de marketing.', '["Mayor visibilidad en la plataforma", "Anuncios destacados", "Herramientas de A/B testing", "Consultoría mensual con un experto en marketing digital", "Integraciones con herramientas externas de análisis"]'::jsonb);


-- Tabla de suscripciones
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL, -- Referencia a business_data
    plan_id UUID NOT NULL,
    paypal_subscription_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    status_update_time TIMESTAMP WITH TIME ZONE,
    start_time TIMESTAMP WITH TIME ZONE,
    payer_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    FOREIGN KEY (business_id) REFERENCES business_data(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
);

-- Tabla de historial de pagos de suscripción
CREATE TABLE IF NOT EXISTS subscription_payment_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscription_id UUID NOT NULL,
    cycle_sequence INTEGER,
    gross_amount DECIMAL(10, 2),
    gross_amount DECIMAL(10, 2),
    total_item_amount DECIMAL(10, 2),
    shipping_amount DECIMAL(10, 2),
    tax_amount DECIMAL(10, 2),
    payment_time TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE CASCADE
);

-- Tabla de anuncios
CREATE TABLE advertisements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_data(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    discount_percentage DECIMAL(5, 2) CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    image_url VARCHAR(255),
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Tabla de productos y servicios
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_data(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Tabla de órdenes
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES client_data(id) ON DELETE CASCADE,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'cancelled', 'returned', 'refunded')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    payment_method VARCHAR(50),
    shipping_address TEXT
);

-- Tabla de detalles de órdenes
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Tabla de transacciones
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    business_id UUID REFERENCES business_data(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    commission DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    transaction_status VARCHAR(20) CHECK (transaction_status IN ('pending', 'completed', 'failed')) NOT NULL
);

-- Tabla de historial de órdenes
CREATE TABLE order_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'cancelled', 'returned', 'refunded')) NOT NULL,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    changed_by UUID NOT NULL -- Puede referenciar a un admin o cliente
);

-- Tabla de auditoría
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- Puede ser admin, cliente o negocio
    action TEXT NOT NULL,
    entity VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de tickets de soporte
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES client_data(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('open', 'in_progress', 'closed')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Tabla de respuestas a tickets de soporte
CREATE TABLE support_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES administrator_data(id),
    response TEXT NOT NULL,
    responded_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Tabla de valoraciones y reseñas
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    client_id UUID REFERENCES client_data(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    review TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Tabla de listas de deseos
CREATE TABLE wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES client_data(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Tabla de productos en listas de deseos
CREATE TABLE wishlist_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wishlist_id UUID REFERENCES wishlists(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Tabla de cupones de descuento
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percentage DECIMAL(5, 2) CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    max_uses INTEGER,
    times_used INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Tabla para aplicar cupones a órdenes
CREATE TABLE order_coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    coupon_id UUID REFERENCES coupons(id) ON DELETE CASCADE,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Tabla de conversaciones
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES client_data(id) ON DELETE CASCADE,
    business_id UUID REFERENCES business_data(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

-- Tabla de mensajes
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL, -- Puede ser client_id o business_id
    sender_type VARCHAR(20) CHECK (sender_type IN ('client', 'business')) NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    read BOOLEAN DEFAULT FALSE
);

-- Tabla de notificaciones
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- Puede ser admin, cliente o negocio
    user_type VARCHAR(20) CHECK (user_type IN ('administrator', 'client', 'business')) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de carritos de compras
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES client_data(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);

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
  business_logo_url VARCHAR,
  business_social_networks_url JSONB
) RETURNS TABLE (id UUID) AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Iniciar la transacción
  BEGIN
    -- Insertar usuario
    INSERT INTO users (email, password, role, username)
    VALUES (user_email, user_password, user_role, user_username)
    RETURNING id INTO user_id;

    -- Insertar datos del cliente
    INSERT INTO client_data (id, full_name, date_of_birth, gender)
    VALUES (user_id, client_full_name, client_date_of_birth, client_gender);

    -- Insertar datos del negocio
    INSERT INTO business_data (id, business_type_id, name, description, address, contact_email, contact_phone, website_url, logo_url, social_networks_url)
    VALUES (user_id, business_type_id, business_name, business_description, business_address, business_contact_email, business_contact_phone, business_website_url, business_logo_url, business_social_networks_url);

    RETURN QUERY SELECT user_id;
  EXCEPTION
    WHEN OTHERS THEN
      -- En caso de error, deshacer la transacción
      ROLLBACK;
      RAISE;
  END;
END;
$$ LANGUAGE plpgsql;

-- Insertar tipos de comercios
INSERT INTO business_types (name, description) VALUES
('Restaurante', 'Establecimiento donde se sirven comidas y bebidas para ser consumidas en el mismo lugar.'),
('Cafetería', 'Local donde se sirve café, té, y otros productos ligeros.'),
('Supermercado', 'Establecimiento comercial donde se venden productos de alimentación, limpieza, etc.'),
('Tienda de Ropa', 'Comercio dedicado a la venta de prendas de vestir.'),
('Librería', 'Establecimiento donde se venden libros y otros materiales de lectura.'),
('Farmacia', 'Local donde se dispensan medicamentos y productos de salud.'),
('Panadería', 'Establecimiento donde se elaboran y venden pan y productos de repostería.'),
('Gimnasio', 'Centro deportivo donde se realizan actividades físicas y ejercicios.'),
('Centro de Belleza', 'Establecimiento dedicado a tratamientos estéticos y de cuidado personal.'),
('Clínica Dental', 'Centro de salud especializado en el cuidado y tratamiento de la salud bucal.'),
('Tienda de Electrónica', 'Comercio que vende dispositivos electrónicos y accesorios.'),
('Floristería', 'Tienda donde se venden flores y arreglos florales.'),
('Tienda de Mascotas', 'Establecimiento que vende animales de compañía y productos para su cuidado.'),
('Joyería', 'Tienda especializada en la venta de joyas y accesorios de lujo.'),
('Papelería', 'Comercio donde se venden artículos de oficina y material escolar.'),
('Bar', 'Establecimiento donde se sirven bebidas alcohólicas y no alcohólicas.'),
('Tienda de Deportes', 'Local que vende artículos y equipos deportivos.'),
('Autoescuela', 'Centro de formación para obtener licencias de conducir.'),
('Estudio Fotográfico', 'Establecimiento dedicado a la realización de fotografías y sesiones fotográficas.'),
('Taller Mecánico', 'Lugar donde se realizan reparaciones y mantenimiento de vehículos.'),
('Tienda de Muebles', 'Comercio dedicado a la venta de mobiliario y decoración para el hogar.'),
('Ferretería', 'Tienda donde se venden herramientas, materiales de construcción y productos para el hogar.'),
('Academia de Idiomas', 'Centro educativo especializado en la enseñanza de lenguas extranjeras.'),
('Escuela de Música', 'Institución dedicada a la enseñanza de música y práctica de instrumentos musicales.'),
('Consultoría', 'Empresa que ofrece asesoramiento especializado en diversas áreas.'),
('Agencia de Viajes', 'Empresa dedicada a la planificación y venta de servicios turísticos.'),
('Peluquería', 'Establecimiento donde se ofrecen servicios de corte y peinado de cabello.'),
('Centro de Yoga', 'Estudio donde se practican técnicas de yoga y meditación.'),
('Tienda de Juguetes', 'Comercio dedicado a la venta de juguetes y juegos para niños.'),
('Agencia de Publicidad', 'Empresa que ofrece servicios de marketing y publicidad.'),
('Despacho de Abogados', 'Oficina donde se ofrecen servicios legales y asesoramiento jurídico.'),
('Inmobiliaria', 'Empresa que se dedica a la venta y alquiler de bienes inmuebles.'),
('Tienda de Bicicletas', 'Comercio que vende bicicletas y accesorios relacionados.'),
('Centro Médico', 'Instalación que ofrece servicios de atención médica y sanitaria.'),
('Heladería', 'Establecimiento donde se venden helados y productos congelados.'),
('Spa', 'Centro de bienestar que ofrece tratamientos de relajación y belleza.'),
('Cerrajería', 'Taller que ofrece servicios de reparación e instalación de cerraduras.'),
('Veterinaria', 'Clínica que ofrece servicios médicos para animales.'),
('Estudio de Arquitectura', 'Empresa que ofrece servicios de diseño y planificación de edificaciones.'),
('Editorial', 'Empresa dedicada a la publicación de libros y revistas.'),
('Servicio de Catering', 'Empresa que ofrece servicios de comida y bebida para eventos.'),
('Lavandería', 'Establecimiento que ofrece servicios de lavado y planchado de ropa.'),
('Tienda de Calzado', 'Comercio dedicado a la venta de zapatos y accesorios para el calzado.'),
('Centro de Formación', 'Institución que ofrece cursos y programas educativos en diversas áreas.'),
('Alquiler de Coches', 'Empresa que ofrece servicios de alquiler de vehículos.'),
('Agencia de Empleos', 'Empresa que facilita la búsqueda de empleo y la contratación de personal.'),
('Pastelería', 'Tienda donde se venden productos de repostería y pasteles.'),
('Tienda de Instrumentos Musicales', 'Comercio que vende instrumentos musicales y accesorios.'),
('Centro de Terapias Alternativas', 'Establecimiento que ofrece tratamientos de medicina alternativa.'),
('Tienda de Manualidades', 'Comercio que vende materiales y herramientas para artesanías y manualidades.'),
('Centro de Salud Mental', 'Institución dedicada a la atención y tratamiento de problemas de salud mental.'),
('Boutique', 'Tienda de moda especializada en ropa y accesorios exclusivos.'),
('Pizzería', 'Restaurante especializado en la elaboración y venta de pizzas.'),
('Hostal', 'Establecimiento de alojamiento económico para viajeros.'),
('Zapatería', 'Tienda especializada en la venta de calzado.'),
('Guardería', 'Centro que ofrece cuidado y educación a niños pequeños.'),
('Estudio de Diseño Gráfico', 'Empresa que ofrece servicios de diseño gráfico y creación de contenido visual.'),
('Centro de Rehabilitación', 'Instalación que ofrece servicios de rehabilitación física y mental.'),
('Carnicería', 'Tienda donde se venden carnes frescas y productos cárnicos.'),
('Óptica', 'Establecimiento donde se venden gafas y productos ópticos.'),
('Centro de Entrenamiento Personal', 'Gimnasio especializado en entrenamiento personalizado.'),
('Jardinería', 'Servicio que ofrece el diseño y mantenimiento de jardines y áreas verdes.'),
('Escuela de Baile', 'Institución dedicada a la enseñanza de diferentes estilos de danza.'),
('Clínica de Estética', 'Centro especializado en tratamientos de belleza y cuidado de la piel.'),
('Academia de Artes Marciales', 'Institución dedicada a la enseñanza de artes marciales.'),
('Centro de Negocios', 'Espacio que ofrece oficinas y servicios para empresas y profesionales.'),
('Tienda de Decoración', 'Comercio dedicado a la venta de artículos de decoración para el hogar.'),
('Centro de Convenciones', 'Instalación diseñada para la realización de eventos y conferencias.'),
('Escuela de Cocina', 'Institución dedicada a la enseñanza de técnicas culinarias.'),
('Centro de Capacitación', 'Institución que ofrece programas de formación y desarrollo profesional.'),
('Tienda de Electrónica', 'Comercio que vende dispositivos electrónicos y tecnología.'),
('Centro de Envíos', 'Establecimiento que ofrece servicios de envío y recepción de paquetes.'),
('Agencia de Seguros', 'Empresa que ofrece servicios de aseguramiento en diversas áreas.'),
('Estación de Servicio', 'Establecimiento donde se venden combustibles y se ofrece mantenimiento para vehículos.'),
('Centro de Copiado', 'Establecimiento que ofrece servicios de copiado e impresión de documentos.'),
('Club Deportivo', 'Instalación que ofrece servicios y espacios para la práctica de deportes.'),
('Tienda de Artículos para el Hogar', 'Comercio que vende productos y utensilios para el hogar.'),
('Centro de Bienestar', 'Instalación que ofrece servicios de salud y bienestar integral.'),
('Centro de Idiomas', 'Institución especializada en la enseñanza de lenguas extranjeras.'),
('Centro de Yoga y Pilates', 'Estudio donde se practican técnicas de yoga y pilates.'),
('Centro de Innovación', 'Espacio que ofrece recursos y apoyo para el desarrollo de proyectos innovadores.'),
('Centro de Terapias Holísticas', 'Establecimiento que ofrece tratamientos de medicina holística.'),
('Centro de Emprendimiento', 'Institución que apoya a emprendedores y startups.'),
('Centro de Terapia Física', 'Instalación dedicada a la rehabilitación y tratamiento de lesiones físicas.'),
('Centro de Meditación', 'Espacio dedicado a la práctica de la meditación y la paz interior.'),
('Centro de Terapias Naturales', 'Establecimiento que ofrece tratamientos basados en la medicina natural.'),
('Centro de Negocios Internacionales', 'Instalación que ofrece servicios y apoyo para negocios internacionales.'),
('Centro de Atención al Cliente', 'Establecimiento que ofrece servicios de soporte y atención al cliente.'),
('Centro de Desarrollo Personal', 'Institución que ofrece programas y talleres de desarrollo personal.'),
('Centro de Arte', 'Espacio dedicado a la promoción y enseñanza de diferentes disciplinas artísticas.'),
('Centro de Cultura', 'Institución que ofrece actividades y programas culturales.'),
('Centro de Tecnologías de la Información', 'Institución que ofrece servicios y formación en tecnologías de la información.'),
('Centro de Formación Profesional', 'Institución que ofrece programas de formación para profesionales.'),
('Centro de Salud Integral', 'Instalación que ofrece servicios de salud integral y preventiva.'),
('Centro de Servicios Financieros', 'Establecimiento que ofrece servicios financieros y bancarios.'),
('Centro de Investigación', 'Institución dedicada a la investigación y desarrollo en diversas áreas.'),
('Centro de Terapia Ocupacional', 'Instalación dedicada al tratamiento y rehabilitación de pacientes.'),
('Centro de Recursos Humanos', 'Instalación que ofrece servicios y apoyo en la gestión de recursos humanos.'),
('Centro de Estudios Superiores', 'Institución dedicada a la educación superior y formación académica.');



