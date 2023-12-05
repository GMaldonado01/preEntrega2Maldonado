import mongoose from "mongoose";
import productModel from "./product.model.js";

mongoose.pluralize(null);

const collection = "carts";

const schema = new mongoose.Schema({
  products: { type: [mongoose.Schema.Types.ObjectId], ref: "products" },
  total: { type: Number, required: true },
});

export default mongoose.model(collection, schema);
