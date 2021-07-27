//Table is called collections in mongoDB

const mongoose = require('mongoose');
const Schema = mongoose.Schema//Schema is a constructor function or like a class. 
//A class or a construction function variable name always starts with a capital letter in JS

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)//Model's name is given here and it is 'User'. So the collection name will be users.