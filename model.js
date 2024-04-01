import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    userName:String,
    email:String,
    password:String,


})

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
    // number: String,
    // FSNumber: String,
    price: Number,
    tax: Number,
    totalPrice: Number,
    items: [{
        itemName: String,
        quantity: Number,
        itemPrice: Number
    }]
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
    itemName: String,
    itemDescription: String,
    itemPrice:Number,
    quantity: Number,
    // tax: Number,
    totalPrice: Number
});


const itemSchema = new mongoose.Schema({
    itemName: String,
    itemDescription: String,
    itemPrice: Number
});
const User =mongoose.model('user' ,userSchema)
const Customer = mongoose.model('Customer', customerSchema);
const Sales = mongoose.model('Sales', salesSchema);
const SalesItems = mongoose.model('SalesItems', salesItemsSchema);
const Item = mongoose.model('Item', itemSchema);
 

export { User, Customer, Item,Sales ,SalesItems};