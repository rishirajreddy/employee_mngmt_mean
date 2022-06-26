const mongoose = require('mongoose');

const employee = mongoose.Schema({
    name: {
        type: String
    },
    position: {
        type: String
    },
    dept: {
        type: String
    }
})

module.exports = mongoose.model('employee', employee);