const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });


const app = express();

// Import routes
const userRouter = require('./routes/User');
const loginRouter = require('./routes/auth');
const taskRouter = require('./routes/Task');

// Middleware
const attachUserID = require('./util/attachUserID');
const loggerMiddleware = require('./middlewares/loggerMW');

// Get environment variables
const { DATABASE_URL, PORT } = process.env;

// Middleware setup
app.use(express.json());
app.use(loggerMiddleware);

// Routes setup
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/tasks', attachUserID, taskRouter);

// Database connection
const connectToDatabase = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("Database connection established...");
    } catch (err) {
        console.error("Error connecting to the database", err);
        process.exit(1); // Exit the process with failure code
    }
};

// Start server and connect to DB
const startServer = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

// Run the application
startServer();

// export the server instance 
module.exports = app