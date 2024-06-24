import { getUserByEmail } from '../models/userModel.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserByEmail(req.user.email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
