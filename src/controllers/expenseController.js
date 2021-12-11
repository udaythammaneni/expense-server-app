const expressAsyncHandler = require("express-async-handler");

const Expense = require("../models/Expense");


//Create
const createExpCtrl = expressAsyncHandler(async (req,res) => {
    const {title,description, amount, user}  = req.body;
    try{
        const expense = await Expense.create({
            title, amount, description, user
        });
        res.json(expense);
    }catch(error){
        res.json(error);
    }
});

//Fetch All
const fetchAllExpCtrl = expressAsyncHandler(async (req, res)=>{
    try {
        // const expense = await Expense.find();
        // console.log(req.query);
        const {page} = req.query;
        const expense = await Expense.paginate({}, {limit:10, page:Number(page)});

        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});

//Fetch Details By ID
const fetchExpDetailsCtrl = expressAsyncHandler(async (req, res)=>{
    const {id} = req?.params;
    try {
        const expense = await Expense.findById(id);
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});

//update
const updateExpCtrl = expressAsyncHandler(async (req, res)=>{
    const {id} = req?.params;
    const {title, amount, description} = req.body;
    try {
        const expense = await Expense.findByIdAndUpdate(id, {
            title, description, amount
        },
        {
            new: true
        });
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});


//delete single expense
const deleteExpCtrl  = expressAsyncHandler(async (req, res) => {
        const {id} = req?.params;
        try{
            const expense = await Expense.findByIdAndDelete(id);
            res.json(expense);
        }catch(error){
            res.json(error);
        }
});


module.exports = {createExpCtrl, fetchAllExpCtrl, fetchExpDetailsCtrl, updateExpCtrl, deleteExpCtrl}