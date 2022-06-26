const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const connect = async () => {
    await mongoose.connect(process.env.MONGO_URL.toString(),{
        useNewUrlParser : true, useUnifiedTopology: true
    });
    console.log('Connected to mongoDB..');
};

module.exports = connect;