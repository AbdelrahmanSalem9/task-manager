const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

const app = express();

// Import routes
const userRouter = require('./routes/userRoutes');
const loginRouter = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');

// Middleware
const attachUserID = require('./util/userIdAttacher');
const loggerMiddleware = require('./middlewares/logMiddleware');

// Get environment variables
const { DATABASE_URL, PORT } = process.env;

// Middleware setup
app.use(express.json());
app.use(loggerMiddleware);

// Routes setup
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/tasks', attachUserID, taskRouter);
app.use('/check', (req,res)=>res.send("Ping :)"));

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
    app.listen(PORT, '0.0.0.0',() => {
        console.log(`Server running on port ${PORT}`);
    });
};

// Run the application
startServer();

// export the server instance 
module.exports = app