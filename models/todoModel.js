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
    }
})

module.exports = mongoose.model('todo', todoSchema)