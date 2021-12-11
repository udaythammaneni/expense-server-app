const express = require("express");
const { createExpCtrl, fetchAllExpCtrl, fetchExpDetailsCtrl, updateExpCtrl, deleteExpCtrl } = require("../controllers/expenseController");


const expenseRoute = express.Router();


expenseRoute.post("/create", createExpCtrl);
expenseRoute.get("/", fetchAllExpCtrl);
expenseRoute.get("/:id", fetchExpDetailsCtrl);
expenseRoute.put("/:id", updateExpCtrl);
expenseRoute.delete("/:id", deleteExpCtrl);

module.exports = expenseRoute;