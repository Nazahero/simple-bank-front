const mongoose = require("mongoose");

const db = 'mongodb+srv://Nazarbek:asahero123@cluster0.cujiczp.mongodb.net/simple-bank?retryWrites=true&w=majority';

mongoose
    .connect(db)
    .then((res) => console.log("Connected DB"))
    .catch((err) => console.log("Error:" + err)); 

module.exports = mongoose;