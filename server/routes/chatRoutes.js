import express from 'express';
import { handleFarmerChat } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', handleFarmerChat);
router.post('/ask', handleFarmerChat);

export default router;
