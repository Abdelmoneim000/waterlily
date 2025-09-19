import express from 'express';
import authRoutes from './Routes/FormRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';


// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors({
    // enable CORS for all origins (for development purposes)
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const PORT = process.env.PORT || 3000;

// Mount the auth routes
app.use(express.json());
app.use('/api', authRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});