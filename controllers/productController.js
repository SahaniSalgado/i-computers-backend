// functions we create here : createProduct, read, update, deleteProduct
import e from "express";
import Product from "../models/product.js";

export async function createProduct(req,res){

    //check if user is authenticated or not - check if user has a token & user details or not
    if(req.user==null){
        res.status(401).json({message:"Unauthorized"})
        return
    }

    //check if user is an admin or not; here if user not admin it become true.
    if(!req.user.isAdmin){
        res.status(403).json({message:"only admins can create products"})
        return
    }

    //create a new product using the data from the request body
    try{
        //check if product with the same productId already exists in the database
        //findOne - Eka product ekak hoyanawa
        const exsistingProduct= await Product.findOne({productId:req.body.productId}) 

        if(exsistingProduct != null){
            res.status(400).json({message:"Product with the same productId already exists"})
            return
        }

        //IF THERE IS NO EXISTING PRODUCT WITH THE SAME PRODUCTID, CREATE A NEW PRODUCT
        const newProduct=new Product(req.body)

        await newProduct.save() //save the product to the database
        
        res.json({message:"Product added successfully"})

    }catch(err){
        res.status(500).json({message:err.message})
    }

}

//get all products
export async function getAllProducts(req,res){
    try{
        if(req.user!=null && req.user.isAdmin){ //if user is admin, return all products including unavailable products
             const products=await Product.find() //find all products in the database
            res.json(products) //send the products as a response

        }else{
            const products=await Product.find({isAvailable:true}) //find only available products in the database
            res.json(products)
        }
            
    }catch(err){
        res.status(500).json({message:err.message})
    }
    
}

//delete a product-only admin can delete a product
export async function deleteProduct(req,res){
    if(req.user!=null && req.user.isAdmin){  //if user is admin, allow to delete the product
        try{
            const product=await Product.findOne({productId:req.params.productId})  //find the product by productId
            
            if(product==null){
                res.status(404).json({message:"Product not found"})
                return
            }
            await Product.deleteOne({productId:req.params.productId}) //delete the product from the database
            res.json({message:"Product deleted successfully"})
        }catch(err){
            res.status(500).json({message:err.message})
        }
    } else {
        res.status(403).json({message:"Only admins can delete products"})
    }
}

//update a product
export async function updateProduct(req,res){
    if(req.user!=null && req.user.isAdmin){
        try{
            if(req.body.productId != null){
                res.status(400).json({message:"ProductId cannot be updated"})
                return
            }
            await Product.updateOne({productId:req.params.productId},req.body) //update the product in the database
            res.json({message:"Product updated successfully"})
        }catch(err){
            res.status(500).json({message:err.message})
        }
    } else {
        res.status(403).json({message:"Only admins can update products"})
    }
}

//retrive only one product by productId
export async function getProductById(req,res){
    const product=await Product.findOne({productId:req.params.productId})

    if(product==null){
        res.status(404).json({message:"Product not found"})
        return
    }
    if(product.isAvailable){
        res.json(product)

    }else{
        if(req.user!=null && req.user.isAdmin){
            res.json(product)
        } else {
            res.status(403).json({message:"Only admins can view unavailable products"})
        }
    }    
}