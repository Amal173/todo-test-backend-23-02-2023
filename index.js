const { connectDb } = require('./config/dbConnection')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT

connectDb()

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/todo", require("./router/todoRouter"));

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})