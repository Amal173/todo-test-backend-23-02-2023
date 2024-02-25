const express=require('express')
const router=express.Router()
const {getTodos,DeleteTodos,UpdateTodos,CreateTodos,UpdateStatus,UpdateOrder}=require('../controller/todoController')

router.route("/").get(getTodos);
router.route("/").post(CreateTodos);
router.route("/:id").put(UpdateTodos);
router.route("/status/:id").put(UpdateStatus);
router.route("/order").post(UpdateOrder);
router.route("/:id").delete(DeleteTodos);


module.exports = router;