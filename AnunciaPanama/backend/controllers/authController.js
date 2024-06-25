import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUserByEmail, createUser } from '../models/userModel.js';
import { jwtSecret, jwtExpiration } from '../config/serverConfig.js';

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Correo existente' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ email, password: hashedPassword });

    const token = jwt.sign({ id: newUser[0].id, email: newUser[0].email }, jwtSecret, { expiresIn: jwtExpiration });
    res.status(201).json({ token, user: newUser[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: jwtExpiration });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
