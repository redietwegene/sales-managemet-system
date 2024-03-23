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
