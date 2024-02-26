
const user = require('../models/userModels')
const asyncHandler = require('express-async-handler')

const getUsers = asyncHandler(async (req, res) => {
    const users = await user.aggregate([
        { $sort: { order: 1 } }
    ]);
    if (!users) {
        res.status(404);
        throw new Error("user not found");
    }
    res.status(200).json({ users })
});


const CreateUser = asyncHandler(async (req, res) => {

    const users = await user.create({ ...req.body });
    if (!users) {
        res.status(404);
        throw new Error("user not found");
    }
    res.status(200).json({ users });
});


const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    try {
        const users = await user.findOne({ email });
        if (!users) {
            return res.status(404).json({ error: 'Authentication failed due to admin not found' });
        }
        const passwordMatch = password === users.password
        if (!passwordMatch) {
            return res.status(404).json({ error: 'Authentication failed due to password missmatch' });
        }

        res.cookie("token", "token", {
            withCredentials: true,
            httpOnly: false,
            maxAge: 60 * 60 * 1000,
        });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Login failed', err: error.message });
    }
})



module.exports = { getUsers, CreateUser, loginUser }