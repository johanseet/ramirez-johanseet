import { authenticateUser } from '../../application/AuthUseCases.js';

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
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
  loginUser,
  logoutUser,
  getSession
};
