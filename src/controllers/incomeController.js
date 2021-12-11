const expressAsyncHandler = require("express-async-handler");

const Income = require("../models/Income");


//Create
const createIncCtrl = expressAsyncHandler(async (req,res) => {
    const {title,description, amount, user}  = req.body;
    try{
        const income = await Income.create({
            title, amount, description, user
        });
        res.json(income);
    }catch(error){
        res.json(error);
    }
});

//Fetch All
const fetchAllIncCtrl = expressAsyncHandler(async (req, res)=>{
    try {
        // const income = await Income.find();
        // console.log(req.query);
        const {page} = req.query;
        // const income = await Income.paginate({}, {limit:10, page:Number(page)});
        const income = await Income.paginate({}, {limit:10, page:Number(page), populate: "user"});

        res.json(income); 
    } catch (error) {
        res.json(error);
    }
});

//Fetch Details By ID
const fetchIncDetailsCtrl = expressAsyncHandler(async (req, res)=>{
    const {id} = req?.params;
    try {
        const income = await Income.findById(id);
        res.json(income);
    } catch (error) {
        res.json(error);
    }
});

//update
const updateIncCtrl = expressAsyncHandler(async (req, res)=>{
    const {id} = req?.params;
    const {title, amount, description} = req.body;
    try {
        const income = await Income.findByIdAndUpdate(id, {
            title, description, amount
        },
        {
            new: true
        });
        res.json(income);
    } catch (error) {
        res.json(error);
    }
});


//delete single income
const deleteIncCtrl  = expressAsyncHandler(async (req, res) => {
        const {id} = req?.params;
        try{
            const income = await Income.findByIdAndDelete(id);
            res.json(income);
        }catch(error){
            res.json(error);
        }
});


module.exports = {createIncCtrl, fetchAllIncCtrl, fetchIncDetailsCtrl, updateIncCtrl, deleteIncCtrl}