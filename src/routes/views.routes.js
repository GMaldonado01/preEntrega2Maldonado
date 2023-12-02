import { Router } from "express";
import { ProductManager } from "../dao/product.manager.mdb.js";

const router = Router();
const manager = new ProductManager();

router.get("/products", async (req, res) => {
  const products = await manager.getProducts();
  res.render("products", {
    title: "listado de productos",
    products,
  });
});

export default router;
