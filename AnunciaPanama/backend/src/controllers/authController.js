import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { jwtSecret, jwtExpiration } from '../config/serverConfig.js';
import { createUser, findUserByEmail } from '../models/userModel.js';
import { createAdminData, findAdminDataByUserId } from '../models/administratorModel.js';
import { createClientData, findClientDataByUserId } from '../models/clientModel.js';
import { createBusinessData, findBusinessDataByUserId } from '../models/businessModel.js';

const isFieldValid = (field) => field && field.trim() !== '';

const registerAdmin = async (req, res) => {
  const { username, email, password, full_name, phone_number } = req.body;

  if (![username, email, password, full_name, phone_number].every(isFieldValid)) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios y no pueden estar vacíos.' });
  }

  try {
    const existsUser = await findUserByEmail(email);
    if (existsUser) return res.status(400).json({ message: 'El email ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hashedPassword, role: 'administrator', username });

    await createAdminData({ id: user.id, full_name, phone_number });
    
    res.status(201).json({ message: 'Administrador registrado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerClient = async (req, res) => {
  const { username, email, password, full_name, date_of_birth, gender } = req.body;

  try {
    const existsUser = await findUserByEmail(email);
    if (existsUser) return res.status(400).json({ message: 'El email ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hashedPassword, role: 'client', username });

    await createClientData({ id: user.id, full_name, date_of_birth, gender });

    res.status(201).json({ message: 'Cliente registrado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerBusiness = async (req, res) => {
  const { username, email, password, full_name, business_type_id, name, description, address, contact_email, contact_phone, website_url, logo_url } = req.body;

  try {
    const existsUser = await findUserByEmail(email);
    if (existsUser) return res.status(400).json({ message: 'El email ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hashedPassword, role: 'business', username });

    await createBusinessData({
      id: user.id,
      full_name,
      business_type_id,
      name,
      description,
      address,
      contact_email,
      contact_phone,
      website_url,
      logo_url
    });

    res.status(201).json({ message: 'Comercio registrado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    let userData;
    if (user.role === 'administrator') {
      userData = await findAdminDataByUserId(user.id);
    } else if (user.role === 'client') {
      userData = await findClientDataByUserId(user.id);
    } else if (user.role === 'business') {
      userData = await findBusinessDataByUserId(user.id);
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      userData
    };

    res.cookie('connect.sid', req.sessionID, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax' 
    });
  
    res.json({ message: 'Inicio de sesión exitoso', user: req.session.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ error: 'No se pudo cerrar la sesión' });
    }
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  });
};

const getSession = async (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'No hay sesión activa' });
  }
};

export {
  registerAdmin,
  registerClient,
  registerBusiness,
  loginUser,
  logoutUser,
  getSession
};
