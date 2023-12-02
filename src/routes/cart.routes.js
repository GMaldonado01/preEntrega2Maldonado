import { Router } from "express";
import { CartManager } from "../dao/cart.manager.mdb.js";

const router = Router();
const manager = new CartManager();

router.get("/", async (req, res) => {
  const carts = await manager.getCarts();
  res.status(200).send({ status: "ok", data: carts });
});

export default router;
