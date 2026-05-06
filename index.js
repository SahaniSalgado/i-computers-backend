import express from 'express';
import mongoose from 'mongoose';
import studentRouter from './routers/studentRouter.js';
import userRouter from './routers/userRouter.js';
import jwt from 'jsonwebtoken';
import authenticate from './middlewears/authenticate.js';
import producrtRouter from './routers/productRouter.js';
import dotenv from 'dotenv';

dotenv.config()

const mongoDBURI=process.env.MONGO_URI

mongoose.connect(mongoDBURI).then(
    () => {
        console.log("connected to mongoDB");
    }
)

const app = express()

app.use(express.json())
//creating middlewear for stop request, check  token and pass it to next
app.use(authenticate)

app.use("/students",studentRouter)

//plug userRouter
app.use("/users",userRouter) //we have to import userRouter from routers/userRouter.js and then use it here

//plug producrtRouter
app.use("/products", producrtRouter)





app.listen(
    3000,
    () => {
        console.log("server is running on port 3000");
    }
)