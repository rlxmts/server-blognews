import express from "express";
import UsuarioController from "../controllers/usuarioControllers.js";
const routes = express.Router();
routes.get("/user", UsuarioController.buscaUsuarios);
routes.get("/admin", UsuarioController.autenticaUsuario);
routes.post("/login", UsuarioController.loginUsuario);
// routes.post("/user", UsuarioController.cadastrarUsuario);
export default routes;