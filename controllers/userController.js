import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config()

//create user function
export async function createUser(req,res){
    try{
        const user = await User.findOne({email:req.body.email})

        if(user!=null){
            res.json({message:"User already exists"})
            return
        }

        //generate password hash
        const passwordHash = bcrypt.hashSync(req.body.password,10) //10 is the number of rounds for hashing, the higher the number the more secure but also more time consuming

        //create user
        const newUser = new User({
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : passwordHash          // replace passwordHash insted of --> password : req.body.password
        })

        await newUser.save()
        res.json({message : "User created successfully"})

    }catch(err){
        res.json({message:err.message })
        
    }
}

//login function
export async function loginUser(req,res){
    try{
        const email=req.body.email
        const password=req.body.password

        //email , password nadda kiyla balanawa

        if(email==null || password==null){
            //res.json({message :"email and password are required"})
            //with status code
            res.status(400).json({message :"email and password are required"})
            return
        }

        //find the user for email
         const user= await User.findOne({email:email})

         //user kenek email eken ndda kiyla balanwa
         if(user==null){
            //res.json({message:"User not found"})
            //user hpuaganna bri nisa 404 yawamwa
            res.status(404).json({message:"User not found"})
            return
         }

         //check is password is valied
         const isPasswordValid = bcrypt.compareSync(password,user.password) // compareSync is a method that compares the password with the hashed password

         //if password is valied true
         if(isPasswordValid){
            //create token 
            const token =jwt.sign(
                {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                    isBlocked: user.isBlocked,
                    isEmailVerified: user.isEmailVerified,
                    image: user.image
                },
                process.env.JWT_SECRET_KEY //secret key for token, should be stored in env file in real application
            )
            //SEND TOKEN WITH RESPONSE
            res.json({message:"Login successful", token: token})

         }else{
            //res.json({message:"Invalid password"})
            //unauthorized wadal nam 401 yawanwa
            res.status(401).json({message:"Invalid password"})
         }

    }catch(err){
        res.json({message:err.message})
    }

}