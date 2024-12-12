import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import cors from 'cors';

// Initialize environment variables
dotenv.config();

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://e-commerce-eight-blue.vercel.app',
      'https://another-frontend-url.com',
      'http://localhost:3000', // Add any other origins you want to allow
    ];
    
    if (allowedOrigins.includes(origin) || !origin) { // The !origin check allows requests from non-browser clients
      callback(null, true); // Allow the request
    } else {
      callback(new Error('CORS not allowed'), false); // Reject the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type']
}));

app.options('*', cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));