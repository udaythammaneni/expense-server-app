const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const incomeSchema = mongoose.Schema({
    title:{
        required: [true, "Title is required"],
        type: String
    },
    description:{
        required: [true, "Description is required"],
        type: String
    },
    type:{
        type: String,
        default: "income"
    },
    amount:{
        required: [true, "Amount is required"],
        type: Number
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, //Must be MongoDb ID
        ref: "User",
        required: [true, "User ID is required"]
    }

},{
    timestamp: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
});

//Paginate 
incomeSchema.plugin(mongoosePaginate);

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;