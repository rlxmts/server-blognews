import express from "express";
import PostController from "../controllers/postControllers.js";
const routes = express.Router();
routes.get("/posts", PostController.listarPosts);
routes.get("/posts/:id", PostController.buscarPost);
routes.put("/posts/:id", PostController.editarPost);
routes.post("/posts", PostController.cadastrarPost);
routes.delete("/posts/:id", PostController.deletarPost);
export default routes;