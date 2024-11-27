import express from 'express';
import { createUser, findUserByEmail, comparePassword } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await createUser(email, password);
    res.status(201).json({
      message: 'User created successfully',
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ user: { id: user.id, email: user.email } }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

export default router;
