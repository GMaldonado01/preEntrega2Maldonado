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
  async addCart(cart) {
    try {
      await cartModel.create(cart);
      return "Carro agregado";
    } catch (err) {
      return err.message;
    }
  }
  async getCart(id) {
    try {
      const cart = await productModel.findById(id);
      return cart === null ? "No se encuentra el cart" : cart;
    } catch (err) {
      return err.message;
    }
  }
  async updateCart(id, newContent) {
    try {
      const procedure = await cartModel.findByIdAndUpdate(id, newContent);
      return procedure;
    } catch (err) {
      return err.message;
    }
  }
  async deleteCart(id) {
    try {
      const procedure = await cartModel.findByIdAndDelete(id);
      return procedure;
    } catch (err) {
      return err.message;
    }
  }
}
