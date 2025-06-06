//const express = require('express') // old way
import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

const __dirname = path.resolve();

console.log(path.join(__dirname, "/.env"))
dotenv.config({path: path.join(__dirname, "/.env")});

const app = express();
const PORT = process.env.PORT || 5000;

console.log(process.env.NODE_ENV)
app.use(express.json()); // allows us to accept JSON data in the request data
app.use("/api/products", productRoutes); // This will add the url to the front of every request


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
    // for any path other than the ones we have created

	app.get("/*catchall", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend/dist","index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});

