const express = require('express');
const app = express();
require('dotenv').config()
const userRouter = require('./routes/User.js');
const mongoose = require('mongoose');
const loginRouter = require('./routes/auth.js');
const taskRouter = require('./routes/Task.js');
const attachUserID = require('./util/attachUserID.js');
const loggerMiddleware = require('./middlewares/loggerMW.js');
const uri = process.env.DATABASE_URL;
const port = process.env.PORT;


app.use(express.json());
app.use(loggerMiddleware);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/tasks', attachUserID, taskRouter);
mongoose.connect(uri).then(() => {
    console.log("Database connection is established.....");
}).catch((err) => {
    console.log(err);
    console.log("Exit Process");
    process.exit(1);
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


