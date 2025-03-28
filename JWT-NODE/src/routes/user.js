import express from 'express';
import cors from 'cors';
import getUsers from '../services/user.js';
import authenticateToken from '../utils/authMiddleware.js';

const router = express.Router();
router.use(cors());
router.get("/users",authenticateToken, getUsers);
export default router;