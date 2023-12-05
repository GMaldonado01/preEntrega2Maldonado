import { Router } from "express";
import { ProductManager } from "../dao/product.manager.mdb.js";
import { CartManager } from "../dao/cart.manager.mdb.js";

const router = Router();
const manager = new ProductManager();
const managerCart = new CartManager();

router.get("/products", async (req, res) => {
  const products = await manager.getProducts();
  res.render("products", {
    title: "listado de productos",
    products,
  });
});
router.get("/carts", async (req, res) => {
  const carts = await managerCart.getCarts();
  res.render("products", {
    title: "listado de productos",
    carts,
  });
});
router.get("/products/paginated", async (req, res) => {
  const data = await manager.getProductsPaginated(
    req.query.page || 1,
    req.query.limit || 9
  );
  data.pages = [];
  for (let i = 1; i <= data.totalPages; i++) data.pages.push(i);

  res.render("products", {
    title: "Listado de PRODUCTOS",
    data: data,
  });
});

export default router;
