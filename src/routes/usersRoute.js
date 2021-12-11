const express  = require("express");
const { registerUser, fetchUsers, loginUserCtrl } = require("../controllers/usersController");

const userRoute = express.Router();


userRoute.post("/register", registerUser);
userRoute.post("/login",loginUserCtrl);
userRoute.get("/", fetchUsers);

module.exports = userRoute;