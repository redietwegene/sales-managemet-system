const mongoose = require('mongoose');
mongoose
.connect(mongourl)
.then(()=>{
    console.log("Database is connected successfully");
    app.listen(PORT ,()=>{
        console.log(`server is running on port ${PORT}`)
    });
})
.catch((error) => console.log(error));


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
s
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
    itemDescription: String
});

const Customer = mongoose.model('Customer', customerSchema);
const Sales = mongoose.model('Sales', salesSchema);
const SalesItems = mongoose.model('SalesItems', salesItemsSchema);
const Item = mongoose.model('Item', itemSchema);

module.exports = { Customer, Sales, SalesItems, Item };