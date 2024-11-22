const express = require('express');
const app = express();
const PORT = 3000;
const userRouter = require('./routes/User.js');
const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://abdelrahmansalem16:Salem1612@cluster0.ylsm2.mongodb.net/task-manager?retryWrites=true&w=majority&appName=Cluster0";


app.use(express.json());
app.use('/user', userRouter);
mongoose.connect(uri).then(() => {
    console.log("Database connection is established.....");
}).catch((err) => {
    console.log(err);
    console.log("Exit Process");
    process.exit(1);
})
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


