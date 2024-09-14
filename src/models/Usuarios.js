import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId },
    nome: String,
    senha: String
}, {versionKey: false});

const usuario = mongoose.model('usuarios', usuarioSchema);
export default usuario;