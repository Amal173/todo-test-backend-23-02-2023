const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    dueDate: {
        required: true,
        type: String
    },
    status: {
       default:"uncompleted",
        type: String
    },
    priority: {
        required: true,
        type: String
    },
    time: {
        required: true,
        type: String
    },
    order: {
        type: Number
    },
    userId: {
        type: String,
        required: true
    },
    reminded: {
        default:false,
        type: Boolean
    }
})

module.exports = mongoose.model('todo', todoSchema)