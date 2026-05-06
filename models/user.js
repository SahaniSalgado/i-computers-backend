import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        email:{
            //AS EMAIL SHOULD BE UNIQUE WE WRITE EMAIL LIKE THIS INSTED OF USING "TYPE:STRING"
            type:String,
            unique:true,
            required:true    //it will not let save anyone without email - e mail eka nathuwa user knek save krnna ba
        },
        firstName:{
            type:String,
            required:true

        },
            
        lastName:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            required:true,
            default:false //by default when we create user it will be false.
                             //admin kenekda nadda kyla dila nattan defult setting ekenma admin knk nemei kyla save we)
        },
        isBlocked:{
            type:Boolean,
            required:true,
            default:false  //aluthen hadana account ekek nam block nowi thiyenna ona nisa false 
        },
        isEmailVerified:{
            type:Boolean,
            required:true,
            default:false //email verify nowena ayatath enna/access wenna plwn
                            //as this an e commerce platform access should be practically easy
                            //but soial media platform ekak wge nam me situation eka wens we. then we must vefify email before access
        },
        image:{
            type:String,
            required:true,
            default:"/default-profile.png" //if user does not upload an image then this default image will be used

        }
        
    }
)

//create the modal - use starting CAPITAl letters for modals and classes
const User = mongoose.model('user',userSchema)

export default User