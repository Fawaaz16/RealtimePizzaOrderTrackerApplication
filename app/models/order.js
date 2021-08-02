//Menu model represents table in database
//The name of the model here is menu but in the database, the corresponding table name will be plural 
//Table is called collections in mongoDB

const mongoose = require('mongoose');
const Schema = mongoose.Schema//Schema is a constructor function or like a class. 
//A class or a construction function variable name always starts with a capital letter in JS

const orderSchema = new Schema({
    customerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {type: Object, require: true},
    phone: {type: String, require: true},
    address: {type: String, require: true},
    paymentType: {type: String, default: 'COD'},
    status: {type: String, default: 'order_placed'},
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)