const mongoose = require("mongoose");

const connectDb = async (connectionString) => {
    await mongoose.connect(connectionString)
        .then(() => console.log("Database connected"))
        .catch(e => console.log(e));
}

module.exports = {connectDb};