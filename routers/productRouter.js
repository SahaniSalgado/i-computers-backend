import express from "express";
import { createProduct, deleteProduct, getAllProducts } from "../controllers/productController.js";

//go to product router
const producrtRouter = express.Router();

//create a post request to create a new product
producrtRouter.post("/", createProduct)
producrtRouter.get("/", getAllProducts)
producrtRouter.delete("/:productId", deleteProduct)

export default producrtRouter;
