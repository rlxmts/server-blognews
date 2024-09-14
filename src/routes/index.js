import express from "express";
import posts from "./PostRoutes.js";
import users from "./UserRoutes.js";
const routes = (app) => {
    app.route("/").get( (req, res) => res.status(200).send("Digite /posts para acessar todos os posts"));
    app.use(express.json(), posts, users);
}
export default routes;