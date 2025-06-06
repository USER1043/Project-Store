import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';
const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
// To update you can use both PATCH and PUT method, use PATCH to update only few fields of the object, PUT for all fields of the object
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct)

export default router;
