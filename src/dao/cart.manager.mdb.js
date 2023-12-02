import cartModel from "./models/cart.model.js";
import productModel from "./models/product.model.js";

export class CartManager {
  constructor() {}

  async getCarts() {
    try {
      return await cartModel
        .find()
        .populate({ path: "products", model: productModel })
        .lean();
    } catch (err) {
      return err.message;
    }
  }
}
