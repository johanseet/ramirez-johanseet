import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/serverConfig.js';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
    req.user = decoded;
    next();
  });
};
