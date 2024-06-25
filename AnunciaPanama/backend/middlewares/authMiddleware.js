import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/serverConfig.js';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No se proporciono un token' });

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Fallo al autenticar el token' });
    req.user = decoded;
    next();
  });
};
