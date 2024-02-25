
const todos = require('../models/todoModel')
const asyncHandler = require('express-async-handler')
const Notification = require('../models/notificationModel');
const cron = require('node-cron');

cron.schedule('* * * * *', async () => {
    try {
        const currentTime = new Date(); // Current time
        const tasksDue = await todos.find({
            dueDate: { $lte: currentTime }, // Due date is now or in the past
            time: { $lte: currentTime }, // Time is now or in the past
        });
        for (const task of tasksDue) {
            if (task.reminded === false) {
                console.log(task);
              
                await Notification.create({
                    taskId: task._id,
                    title: task.title,
                    description: task.description,
                    dueDate: task.dueDate,
                    userId: task.userId,
                    time: task.time
                });
                await todos.findByIdAndUpdate(task._id, { reminded: true });
            }
            // Reminded is false
        }
    } catch (error) {
        console.error('Error sending task reminders:', error);
    }
});


const getTodos = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const todo = await todos.aggregate([
        { $match: { userId: id } },
        { $sort: { order: 1 } } // Sort in ascending order based on the 'order' field
    ]);
    if (!todo) {
        res.status(404);
        throw new Error("task not found");
    }
    res.status(200).json({ todo })
});


const CreateTodos = asyncHandler(async (req, res) => {

    console.log(req.body);
    const todo = await todos.create({ ...req.body });
    if (!todo) {
        res.status(404);
        throw new Error("task not found");
    }
    res.status(200).json({ todo });
});


const UpdateTodos = asyncHandler(async (req, res) => {
    const id = req.params.id
    const { data } = req.body
    const todo = await todos.findByIdAndUpdate(
        id,
        data
    );
    if (!todo) {
        res.status(404);
        throw new Error("task not found");
    }
    res.status(200).json({ todo });
});

const UpdateStatus = asyncHandler(async (req, res) => {
    const id = req.params.id
    console.log(id);
    // const status
    console.log(req.body.status);
    const todo = await todos.findByIdAndUpdate(
        id,
        req.body
    )
    if (!todo) {
        res.status(404);
        throw new Error("task not found");
    }
    res.status(200).json({ todo });
});

const UpdateOrder = asyncHandler(async (req, res) => {
    console.log("hgbhkhgdbckjsdbvkjshd");
    try {
        const orderData = req.body;
        // Iterate through the order data and update the order of tasks in MongoDB
        for (const { id, order } of orderData) {
            await todos.findByIdAndUpdate(id, { order });
        }
        res.status(200).json({ message: 'Task order updated successfully' });
    } catch (error) {
        console.error('Error updating task order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




const DeleteTodos = asyncHandler(async (req, res) => {
    const id = req.params.id
    console.log(id);
    const todo = await todos.findByIdAndDelete(id)
    if (!todo) {
        res.status(404)
        throw new Error("task not found")
    }
    res.status(200).json({ todo });
});

module.exports = { getTodos, DeleteTodos, UpdateTodos, CreateTodos, UpdateStatus, UpdateOrder }