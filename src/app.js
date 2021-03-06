const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect.js");
// const {registerUser} = require("./controllers/usersController");
const userRoute = require("./routes/usersRoute");
const incomeRoute = require("./routes/incomeRoute");
const expenseRoute = require("./routes/expenseRoute");
const {errorHandler, notFound} =  require("./middlewares/errorMiddleware");
const app = express();

app.use(express.json());
//Middleware
const logger = (req, res, next) => {
    console.log("Am a logger");
    next();
};

app.use(logger);

//dotenv
dotenv.config();

//dbConnect
dbConnect();

//routes
/* app.post('/register', (req, res)=>{
    res.json({ user:"admin" });
}); */
// app.post('/register', registerUser);
// app.post('/login', loginUser);

// app.use("/", userRoute);
app.use("/api/users", userRoute);

// Income Route
app.use("/api/income", incomeRoute);
// Expense Route
app.use("/api/expense", expenseRoute);
//Error
app.use(notFound);
app.use(errorHandler);

module.exports = app;