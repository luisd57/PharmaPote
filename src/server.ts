import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import treatmentRoutes from './routes/treatment.routes';

dotenv.config();

const app: Application = express();
const PORT: number = 3000;

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connection established'))
    .catch((err: Error) => console.log('MongoDB connection error: ', err));

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', treatmentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
