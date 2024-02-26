
const todos = require('../models/todoModel')
const asyncHandler = require('express-async-handler')
const Notification = require('../models/notificationModel');
const cron = require('node-cron');

cron.schedule('* * * * *', async () => {
    try {

        const currentTime = new Date(); 

        const tasksDue = await todos.find({
            dueDate: { $lte: currentTime }, 
            time: { $lte: currentTime }, 
        });

        for (const task of tasksDue) {
            if (task.reminded === false) {

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
           
        }

    } catch (error) {

        console.error('Error sending task reminders:', error);
    }
});


const getTodos = asyncHandler(async (req, res) => {

    const { id } = req.query;
    const todo = await todos.aggregate([
        { $match: { userId: id } },
        { $sort: { order: 1 } } 
    ]);

    if (!todo) {
        res.status(404);
        throw new Error("task not found");
    }

    res.status(200).json({ todo })
});


const getShared = asyncHandler(async (req, res) => {

    const { id } = req.query;
    const todo = await todos.aggregate([
        { $match: { shared: id } },
    ]);

    if (!todo) {
        res.status(404);
        throw new Error("todo not found");
    }

    res.status(200).json({ todo })
});


const CreateTodos = asyncHandler(async (req, res) => {

    const todo = await todos.create({ ...req.body });

    if (!todo) {
        res.status(404);
        throw new Error("task not found");
    }

    res.status(200).json({ todo });

});


const ShareTasks = asyncHandler(async (req, res) => {

    const { shareTask, selectedUsers } = req.body
    const { _id } = shareTask
    const userId = []

    for (const users of selectedUsers) {
        userId.push(users._id)
        await todos.findByIdAndUpdate(_id, { shared: userId });
    }

    if (!todos) {
        res.status(404);
        throw new Error("task not found");
    }

    res.status(200).json({ todos });
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

    try {
        const orderData = req.body;
       
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

    const todo = await todos.findByIdAndDelete(id)
    
    if (!todo) {
        res.status(404)
        throw new Error("task not found")
    }
    res.status(200).json({ todo });
});

module.exports = { getTodos, DeleteTodos, UpdateTodos, CreateTodos, UpdateStatus, UpdateOrder, ShareTasks ,getShared}