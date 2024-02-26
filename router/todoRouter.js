const express = require('express')
const router = express.Router()
const { getTodos, DeleteTodos, UpdateTodos, CreateTodos, UpdateStatus, UpdateOrder, ShareTasks, getShared } = require('../controller/todoController')

router.route("/").get(getTodos);
router.route("/shared").get(getShared);
router.route("/").post(CreateTodos);
router.route("/:id").put(UpdateTodos);
router.route("/status/:id").put(UpdateStatus);
router.route("/order").post(UpdateOrder);
router.route("/sharetask").post(ShareTasks);
router.route("/:id").delete(DeleteTodos);


module.exports = router;