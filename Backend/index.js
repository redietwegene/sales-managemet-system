import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import cors from 'cors';

import { User,Customer, Item ,Sales ,SalesItems} from "./model.js";
import dotenv from "dotenv";



const itemsInSale = [];





const app = express();
app.use(express.json());
app.use(cors());
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
// app.set('view engine', 'jsx');
app.use (bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
app.get("/",(req ,res)=>{
    // res.render("createSale");
    res.send("hallo")
})




app.post("/signup" ,async(req ,res)=>{
   
    // const hashedPassword = await bcrypt.hash(password, 10);

    const employe = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    employe.save()
    .then(savedused =>{
        res.sendStatus(200);
    }) 
    .catch(error => {
        console.error("Error adding item :", error);
        res.status(500).send("Error adding item");
    });
    

})

app.post("/login", async (req,res)=>{
    try{
        const{username,password}=req.body;
        const employe=await User.findOne({username:username});
        if (!employe){
            return res.status(400).send ("user not found");
        }
        if (employe.password !== password) {
            return res.status(401).send("Incorrect password");
        }
        res.status(200).send("Login successful");
        console.log("login succesfully")
     
    } catch (error) {
        console.error("Error in login process:", error);
        res.status(500).send("Error in login process");
    }
})


app.get("/customer" ,async(req ,res) =>{
    try {
        const customerData = await Customer.find(); 
        res.json(customerData)

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
        res.sendStatus(200);
        
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
        res.sendStatus(200);
    }) 
    .catch(error => {
        console.error("Error adding item :", error);
        res.status(500).send("Error adding item");
    });
    
})
app.get("/item" ,async(req ,res) =>{
    try {
        const itemData = await Item.find(); 
        res.json(itemData);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Error fetching custmer data");
    }



});


// app.get("/createsale", async (req, res) => {
//     try {
        
//         const salesitem = await SalesItems.find();
    

//        res.json(salesitem)
//     } catch (error) {
//         console.error("Error fetching items:", error);
//         res.status(500).send("Error fetching items");
//     }
// });
app.get("/getsales" ,async(req ,res)=>{
    try{
        const salesitem = await SalesItems.find();
    

               res.json(salesitem)
        // const { customerName, itemName, quantity } = req.body;
       
    }catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).send("Error fetching items");
    }
})

app.get("/createsale", async (req, res) => {
    try {
       
        res.json(itemsInSale)
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
            customerName:customerName,
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
        
        // res.render("createSales", { itemsInSale: itemsInSale });
        res.json(itemsInSale)
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
        // res.render("aggregatesale", { total: total });
        res.json(total)
    } catch (error) {
        console.error("Error aggregating sale:", error);
        res.status(500).send("Error aggregating sale");
    }
});

app.post ("/forgotpassword" ,async(req,res)=>{
    const {email}=req.body;
    try {
        const oldUser=await User.findOne({email});
        if(!oldUser){
            return res.send("user not exist");
        }
        const secret = JWT_+oldUser.password;
    } catch (error) {
        
    }
})