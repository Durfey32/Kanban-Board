import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const secretKey = process.env.JWT_SECRET || '';

  const token = jwt.sign({ username }, secretKey);

  res.json({ token });

  return;
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
