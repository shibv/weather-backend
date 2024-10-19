import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
