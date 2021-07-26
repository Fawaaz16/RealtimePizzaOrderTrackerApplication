//Menu model represents table in database
//The name of the model here is menu but in the database, the corresponding table name will be plural 
//Table is called collections in mongoDB

const mongoose = require('mongoose');
const Schema = mongoose.Schema//Schema is a constructor function or like a class. 
//A class or a construction function variable name always starts with a capital letter in JS

const menuSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true }
})

module.exports = mongoose.model('Menu', menuSchema)