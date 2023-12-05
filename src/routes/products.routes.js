import { Router } from "express";
import { ProductManager } from "../dao/product.manager.mdb.js";
import { uploader } from "../uploader.js";
const router = Router();
const manager = new ProductManager();

router.get("/", async (req, res) => {
  const products = await manager.getProducts();
  res.status(200).send({ status: "ok", data: products });
});

router.get("/paginated", async (req, res) => {
  try {
    const products = await manager.getProductsPaginated();
    res.status(200).send({ status: "OK", data: products });
  } catch (err) {
    res.status(500).send({ status: "ERR", data: err.message });
  }
});

router.post("/", uploader.single("thumbnail"), async (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .send({ status: "FIL", data: "No se pudo subir el archivo" });

  const { title, description, price, code, stock } = req.body;
  if (!title || !description || !price || !code || !stock) {
    return res
      .status(400)
      .send({ status: "ERR", data: "Faltan campos obligatorios" });
  }

  const newContent = {
    title,
    description,
    price,
    thumbnail: req.file.filename,
    code,
    stock,
  };

  const result = await manager.addProduct(newContent);
  res.status(200).send({ status: "OK", data: result });
});

export default router;
