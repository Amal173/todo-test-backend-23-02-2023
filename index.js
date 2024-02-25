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

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }))
app.use(bodyParser.json());
app.use(express.json());
app.use("/todo", require("./router/todoRouter"));
app.use("/user", require("./router/userRouter"));
app.use("/notification", require("./router/notificationRouter"));

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})