const express=require('express')
const router=express.Router()
const { getUsers, CreateUser,loginUser}=require('../controller/userController')

router.route("/").get(getUsers);
router.route("/").post(CreateUser);
router.route("/login").post(loginUser);



module.exports = router;