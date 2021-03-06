const expressAsyncHandler = require("express-async-handler");

const generateToken = require("../middlewares/generateToken");

const User = require("../models/User");
const { use } = require("../routes/usersRoute");

/* const registerUser = (req, res)=>{
    res.json({ user:"admin" });
}; */

//Register
const registerUser = expressAsyncHandler(async (req, res)=>{
    // const {} = req.body;//Destructor 
    // const {} = req && req.body;
    const { email, firstname, lastname, password } = req?.body;
    //check if user exists //Always put custom error handler upside not in try and catch
    const userExists = await User.findOne({email: req.body.email});
    if(userExists)throw new Error ('User already exists');
    try{
        //check if user exists
        // const userExists = await User.findOne({email: req.body.email});
        // if(userExists){
        //     res.json("User Exist");
        // } 

        const user = await User.create({email, firstname, lastname, password});
        //Http Status Code
        res.status(200).json(user);

    } catch (error) {
        res.json(error);
    }
});
/* const registerUser = async (req, res)=>{
    // const {} = req.body;//Destructor 
    // const {} = req && req.body;
    const { email, firstname, lastname, password } = req?.body;
    //check if user exists
    const userExists = await User.findOne({email: req.body.email});
    if(userExists)throw new Error ('User already exists');
    try{
        //check if user exists
        // const userExists = await User.findOne({email: req.body.email});
        // if(userExists){
        //     res.json("User Exist");
        // } 

        const user = await User.create({email, firstname, lastname, password});
        //Http Status Code
        res.status(200).json(user);

    } catch (error) {
        res.json(error);
    }
}; */

//Fetch all users
const fetchUsers = expressAsyncHandler(async (req, res) => {
    try {
        const users  = await User.find({}); 
        res.json(users);   
    } catch (error) {
        res.json(error);
    }
});

//login user
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
    const {email, password} = req?.body;
    const userFound  = await User.findOne({email});
    if(userFound && (await userFound?.isPasswordMatch(password))){
        // res.json(userFound);
        res.json({
            _id: userFound?._id,
            firstname:userFound?.firstname,
            token: generateToken(userFound?._id)
        });
    }else{
        res.status(401);
        throw new Error("Invalid login credentials");
    }
    //Can not set headers after they are sent to the client
    // res.status(401);
    // throw new Error("Invalid login credentials");
})

// module.exports = {register:registerUser}
module.exports = {registerUser, fetchUsers, loginUserCtrl}