import { registerClient } from '../../application/UserUseCases.js';

const register = async (req, res) => {
  try {
    const userId = await registerClient(req.body);

    req.session.user = {
      id: userId,
      username: req.body.username,
      email: req.body.email,
      role: 'client'
    };

    res.cookie('connect.sid', req.sessionID, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    res.status(201).json({ message: 'Cliente registrado exitosamente', user: req.session.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  register
};
