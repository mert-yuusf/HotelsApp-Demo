const express = require("express");

const app = express();

app.use(express.json());

// js Objects
// Json Objects

// create a route
app.get("/", (req, res) => {
    res.send({ index: "page" })
});

// HTTP Methods Types
// GET Method
// POST Method
// PUT Method
// PATCH Method
// DELETE Method

// Client (Phone or browser or postman) ----> Request (all-records) ---> Server (Express Server) 
//          ---> DataStorage ---> 

// Server ---> Response ---> Client

// run the server
app.listen(5000, () => {
    console.log("Server now is running on http://localhost:5000");
});