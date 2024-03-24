import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import  Customer  from "./model.js";

import dotenv from "dotenv";



const app =express();
dotenv.config();
const PORT = process.env.PORT|| 5000;
const mongourl=process.env.MONGO_URL;
mongoose
.connect(mongourl)
.then(()=>{
    console.log("Database is connected successfully");
    app.listen(PORT ,()=>{
        console.log(`server is running on port ${PORT}`)
    });
})
.catch((error) => console.log(error));



  

app.set('view engine', 'ejs');
app.use (bodyParser.urlencoded({extended:true}));







app.get("/customer" ,async(req ,res) =>{
    try {
        const customerData = await Customer.find(); 

        res.render("customerList", { customerData: customerData }); 
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Error fetching custmer data");
    }


});
app.post ("/createCustomer" , (req ,res)=>{
    const user= new Customer ({
        name:req.body.name,
        TIN:req.body.TIN,
        phoneNumber:req.body.phoneNumber,
        address:req.body.address,
        contactPerson:req.body.contactPerson,
    });
    user.save()
    .then(savedUser =>{
        console.log("user saved sucessfullly.")
        res.redirect("/");
    })
    .catch(error => {
        console.error("Error saving user:", error);
        res.status(500).send("Error saving user");
    });

})



app.post("/addItem" ,(req ,res )=>{
    const items= new  Item ({
        itemName:  req.body.itemName,
        itemDescription:  req.body.itemDescription,
        itemPrice: req.body.itemPrice
    });
    items.save()
    .then(saveditem =>{
        console.log("item added sucessfully")
    }) 
    .catch(error => {
        console.error("Error adding item :", error);
        res.status(500).send("Error adding item");
    });
    
})
app.get("/item" ,async(req ,res) =>{
    try {
        const itemData = await Item.find(); 

        res.render("itemList", { itemData: itemData }); 
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Error fetching custmer data");
    }


});
app.get("/createsale", async (req, res) => {
    try {
        
        const items = await Item.find();

       
        res.render("createSale", { items: items });
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).send("Error fetching items");
    }
});
app.post("/createSale", async (req, res) => {
    try {
        const { customerName, itemName, quantity } = req.body;

        const customer = await Customer.findOne({ name: customerName });
        if (!customer) {
            return res.status(400).send("Customer not found. Please enter a valid customer name.");
        }

      
        const item = await Item.findOne({ itemName: itemName });
        if (!item) {
            return res.status(400).send("Item not found. Please select a valid item.");
        }

        const outputData = {
            customerName: customerName,
            itemName: itemName,
            quantity: quantity,
            itemPrice: item.itemPrice,
            totalPrice: item.itemPrice * quantity
        };

        res.render("outputTable", { outputData: outputData });
    } catch (error) {
        console.error("Error creating sale:", error);
        res.status(500).send("Error creating sale");
    }
});