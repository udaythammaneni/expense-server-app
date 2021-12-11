const express  = require("express");
const { registerUser, fetchUsers } = require("../controllers/usersController");

const userRoute = express.Router();


userRoute.post("/register", registerUser);

userRoute.get("/", fetchUsers);

module.exports = userRoute;