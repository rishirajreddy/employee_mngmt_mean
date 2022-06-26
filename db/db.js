const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();
const url = "mongodb+srv://mrrobot:mrrobot@empmngmt.cs734kp.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {
    await mongoose.connect(url,{
        useNewUrlParser : true, useUnifiedTopology: true
    });
    console.log('Connected to mongoDB..');
};

module.exports = connect;