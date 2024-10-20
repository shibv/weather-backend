import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import weatherRoutes from './routes/weatherRoutes.js';
import alertRoutes from './routes/alertRoutes.js'
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/weather', weatherRoutes);
app.use('/api/alerts', alertRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
