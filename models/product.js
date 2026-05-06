import mongoose from "mongoose"; 

const productSchema = new mongoose.Schema(
    {
        productId:{
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true                          
        },
        alternative:{
            type:[String], //array of strings
            default: [],  //empty array ekk wthn denn ona
            required: true
        },
        descripion:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true      
        },
        labledPrice:{
            type: String,
            required: true
        },
        image:{
            type: [String],
            default: ["/default-product-1.png", "/default-product-2.png"],
            required: true
        },
        isAvailable:{
            type: Boolean,
            default: true
        },
        category:{
            type: String,
            required: false
        },
        stock:{
            type: Number,
            required: true,
            default: 0
        },
        brand:{
            type: String,
            required: false
        },
        model:{
            type: String,
            required: false
        }

    }

)

//create a mongoose model using the schema
const Product = mongoose.model("Product", productSchema)

export default Product