import express from 'express';
import cors from 'cors';
import login from '../controllers/login.js';

const router = express.Router();
router.post('/login',login);
router.use(cors());

export default router;