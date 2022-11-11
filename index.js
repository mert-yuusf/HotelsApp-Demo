const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const app = express();

app.use(express.json());

// js Objects
// Json Objects

// Create a user model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please Provide your first name"],
        trim: true,
        minlength: [2, "First name must be greater then 2 char"]
    },

    lastName: {
        type: String,
        required: [true, "Please Provide your last name"],
        trim: true,
        minlength: [2, "Last name must be greater then 2 char"]
    },


    // mert@email.com
    email: {
        type: String,
        required: [true, "Please Provide your last name"],
        trim: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email address"
        },
        unique: [true, "This email has used before"]
    },

    password: {
        type: String,
        minlength: [4, "Min Length of password is 4 char"],
        maxlength: [12, "Max length of password is 12 char"],
        required: [true, "Please Provide valid password"],
    },


    photo: {
        type: String,
        default: "Photo"
    },


    about: {
        type: String,
        default: null,
    }
})

const User = mongoose.model("User", userSchema);




// create a route
app.get("/", (req, res) => {
    res.send({ index: "page" })
});


// to define a route we need three things
// 1- we need to select the correct http method type (get,post,put,delete)
// 2- we need to define a path of the route which will be a unique string value for example "/register","/users/123","/profile"
// 3- we need to generate a controller function to handle the incoming request data and the output response data

app.post("/register", (req, res) => {
    res.send("Resister route")
})



// HTTP Methods Types
// GET Method
// POST Method
// PUT Method
// PATCH Method
// DELETE Method

// Client (Phone or browser or postman) 
// ----> Request (all-records) 
// ----> Server (Express Server) 
// ----> DataStorage ---> 

// Server ---> Response ---> Client

// run the server
app.listen(5000, () => {
    console.log("Server now is running on http://localhost:5000");
});


/// 

