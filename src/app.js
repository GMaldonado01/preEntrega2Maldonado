import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.routes.js";
import productsRouter from "./routes/products.routes.js";
import chatRouter from "../src/routes/chat.routes.js";
import cartsRouter from "../src/routes/cart.routes.js";
import { MessageManager } from "./dao/message.manager.mdb.js";

const PORT = 8080;
const MONGOOSE_URL =
  "mongodb+srv://coder_55605:Pastillas952@cluster0.0a63ncc.mongodb.net/ecomerce";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/static", express.static(`${__dirname}/public`));

let messages = [];
app.use("/chat", chatRouter);

app.use("/carts", cartsRouter);

try {
  await mongoose.connect(MONGOOSE_URL);
  const server = app.listen(PORT, () => {
    console.log(`Backend activo puerto ${PORT} conectado a bbdd`);
  });

  const io = new Server(server);
  const manager = new MessageManager();

  io.on("connection", (socket) => {
    console.log(`Chat actual enviado a ${socket.id}`);

    socket.on("user_connected", async (data) => {
      messages = await manager.getMessage();

      socket.emit("messagesLogs", messages);
      socket.broadcast.emit("user_connected", data);
    });

    socket.on("message", async (data) => {
      messages.push(data);
      await manager.addMessage(data);
      io.emit("messagesLogs", messages);
    });
  });
} catch (err) {
  console.log(`No se puede conectar con bbdd (${err.message})`);
}
