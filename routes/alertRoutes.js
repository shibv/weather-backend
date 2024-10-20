import express from 'express';
import { triggerAlert } from '../controllers/alertController.js';

const router = express.Router();


router.post('/trigger', triggerAlert);
export default router;
