import express from "express";
import { createProduct } from "../controllers/productController.js";

//go to product router
const producrtRouter = express.Router();

//create a post request to create a new product
producrtRouter.post("/", createProduct)

export default producrtRouter;
