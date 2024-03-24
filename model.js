import mongoose from "mongoose";


const customerSchema = new mongoose.Schema({
    name: String,
    TIN: String,
    phoneNumber: String,
    address: String,
    contactPerson: String
});


const salesSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer' 
    },
    number: String,
    FSNumber: String,
    price: Number,
    tax: Number,
    totalPrice: Number
});

const salesItemsSchema = new mongoose.Schema({
    salesID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sales'
    },
    itemID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item' 
    },
    itemDescription: String,
    quantity: Number,
    tax: Number,
    totalPrice: Number
});


const itemSchema = new mongoose.Schema({
    itemName: String,
    itemDescription: String,
    itemPrice: Number
});

const Customer = mongoose.model('Customer', customerSchema);
const Sales = mongoose.model('Sales', salesSchema);
const SalesItems = mongoose.model('SalesItems', salesItemsSchema);
const Item = mongoose.model('Item', itemSchema);
 

export {Customer ,Item} ;