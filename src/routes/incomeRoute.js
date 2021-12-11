const express = require("express");
const { createIncCtrl, fetchAllIncCtrl, fetchIncDetailsCtrl, updateIncCtrl, deleteIncCtrl } = require("../controllers/incomeController");
const authMiddleware = require("../middlewares/authMiddleware");


const incomeRoute = express.Router();


incomeRoute.post("/create", createIncCtrl);
incomeRoute.get("/",authMiddleware, fetchAllIncCtrl);
incomeRoute.get("/:id", fetchIncDetailsCtrl);
incomeRoute.put("/:id", updateIncCtrl);
incomeRoute.delete("/:id", deleteIncCtrl);

module.exports = incomeRoute;