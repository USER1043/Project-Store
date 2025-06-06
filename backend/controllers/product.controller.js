import Product from "../models/products.model.js";
import mongoose from "mongoose";
export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({}); // {} this means to find all products in the DB
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error("Error in fetching products: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; // user will send this data
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({sucess:false,message: "Please provide details for all field"});
    } 

    const newProduct = new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({sucess: true, data: newProduct});
    }catch(error){
        console.error("Error in creating a product: ",error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const updateProduct = async(req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({sucess: false, message:"Product ID is not found!"});
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updateProduct});
    } catch (error) {
        console.error("Error in updating the product: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});        
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({sucess: false, message:"Product ID is not found!"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted"});
    } catch (error) {
        console.error("Error in deleting product: ",error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
};