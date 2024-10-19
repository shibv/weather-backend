import express from 'express';
import { retrieveWeather, getDailySummary } from '../controllers/weatherController.js';

const router = express.Router();
router.get('/retrieve', retrieveWeather);
router.get('/summary', getDailySummary);

export default router;
