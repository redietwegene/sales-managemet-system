import express from "express";
import mongoose from "mongoose";
import bodyParser from bodyParser;

import dotenv from dotenv;

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