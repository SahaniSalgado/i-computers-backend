import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

 export default function authenticate(req,res,next){
        //read the header of request
        const header=req.header("Authorization") 

        //console.log(header);

        //check if header is null or not
        if(header==null){
           
            next() //if header is null pass the control
       
        //if it has a header    
        }else{
            const token=header.replace("Bearer ","") //replace Bearer with empty string to get the token
            //console.log(token);

            //decrypt the token
            jwt.verify(token, process.env.JWT_SECRET_KEY, 
                (err, decoded) => {
                    //console.log(decoded)

                    //if decoded null
                    if(decoded==null){
                        res.status(401).json({message:"Invalid token"})
                    }else{
                        req.user=decoded //if decoded is not null, pass the decoded data to the request object
                        next()
                    }

                }
            )

        }

       // next() next is a function that is used to pass the control to the next middleware
    }