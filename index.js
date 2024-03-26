import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Customer, Item ,Sales ,SalesItems} from "./model.js";

import dotenv from "dotenv";


const itemsInSale = [];




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



// app.get("/",(req ,res)=>{
//     res.render("addCustomer");
// })
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

app.get("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const customerData = await Customer.findById(id);
        res.render("editCustomer.ejs", { customerData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { updatedName, updatedTIN, updatedPhonenumber, updatedAdress ,updatedContactperson } = req.body; // Use req.body to access form data

    try {
        const customerData = await UserModel.findByIdAndUpdate(id, {
          name:updatedName,
          TIN:updatedTIN,
          phoneNumber:updatedPhonenumber,
          address:updatedAdress,
          contactPerson:updatedContactperson,
        }, { new: true });

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

});

app.get("/delete/:id" , async(req , res )=>{
    const {id} = req.params;
    try{
        const customerData= await Customer.findByIdAndDelete(id);
        res.redirect("/");
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }

 });




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

        const salesItem =new SalesItems ({
            itemName :itemName,
            itemDescription: item.itemDescription,
            quantity:quantity,
            itemPrice: item.itemPrice,
            totalPrice: item.itemPrice * quantity,
           

        });
        salesItem.save();


        const outputData = {
            customerName: customerName,
            itemName: itemName,
            quantity: quantity,
            itemPrice: item.itemPrice,
            totalPrice: item.itemPrice * quantity
        };
        itemsInSale.push(outputData)
      
       
        res.render("outputTable", { itemsInSale: itemsInSale });
    } catch (error) {
        console.error("Error creating sale:", error);
        res.status(500).send("Error creating sale");
    }
});

app.get("/aggregateSale", (req, res) => {
    try {
       
        const Price = itemsInSale.reduce((total, item) => total + item.totalPrice, 0);
        const taxRate= 0.15;
        const totalPrice =(Price*taxRate)+ Price;

        const items = itemsInSale.map(item => ({
            itemName: item.itemName,
            quantity: item.quantity,
            itemPrice: item.itemPrice
        }));
        const total={
            customerName:itemsInSale[0].customerName,
            items:items,
            Price:Price,
            taxRate:taxRate,
            totalPrice:totalPrice
        }
        const customerName = itemsInSale[0].customerName;
        const customer =  Customer.findOne({ name: customerName });
        
        const customerID = customer._id;
       const sale=new Sales({
        customerID:customerID,
        price:Price,
        tax:taxRate,
        totalPrice:totalPrice,
        items:items,
       })
       sale.save();
        res.render("aggregateSale", { total: total });
    } catch (error) {
        console.error("Error aggregating sale:", error);
        res.status(500).send("Error aggregating sale");
    }
});

