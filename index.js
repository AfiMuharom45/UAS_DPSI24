const express = require('express');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const dotenv = require('dotenv');
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());

// Import database config
const connectDB = require('./config/db')

// Database connection
connectDB();

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import routes
const bookRoutes = require('./routes/bookRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const reportRoutes = require('./routes/reportRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');

// Use routes
app.use('/api/books', bookRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Not Found middleware
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
