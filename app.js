const express = require('express');
const app = express();
require('dotenv').config()
const userRouter = require('./routes/User.js');
const mongoose = require('mongoose');
const uri = process.env.DATABASE_URL;
const port = process.env.PORT;


app.use(express.json());
app.use('/user', userRouter);
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


