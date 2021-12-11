const jwt = require("jsonwebtoken");

const generateToken = id => {
    return jwt.sign({id}, process.env.JWT_KEY, {expiresIn: "30d"});//Expires on 30 Days
}

module.exports = generateToken;