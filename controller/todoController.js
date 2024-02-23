const express = require('express')
const todos = require('../models/todoModel')
const asyncHandler = require('express-async-handler')



const getTodos = asyncHandler(async (req, res) => {
    const todo = await todos.find();
    if (!todo) {
        res.status(404);
        throw new Error("task not found");
    }
    res.status(200).json({ todo });
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
    const  id = req.params.id
    const {data}=req.body
    console.log(data,"sjdvb,sjdvb");
    console.log(id,"sjdvb,sjmbfdjbfbjkdf,dfmjkdvb");
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

module.exports = { getTodos, DeleteTodos, UpdateTodos, CreateTodos, UpdateStatus }