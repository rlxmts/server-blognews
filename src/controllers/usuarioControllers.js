import usuario from "../models/Usuarios.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UsuarioController {

    static async buscaUsuarios(req, res) {
        try{
            const usuarios = await usuario.find();
            res.status(200).json({Message : "Matheus Cruz é o unico usuario"});
        }catch(erro){
            console.log(erro);
        }
    }

    static async cadastrarUsuario(req, res) {
        try{
            const {nome, senha} = req.body;
            if(!nome){
                return res.status(422).json({Msg: "Nome obrigatório!"});
            }
            if(!senha){
                return res.status(422).json({msg: "Senha é obrigatório!"});
            }
            
            const salt = await bcrypt.genSalt(12)
            const senhaHash = await bcrypt.hash( senha, salt);

            const novoUsuario = await usuario.create({nome, senha:senhaHash});
            res.status(200).json({msg: "Usuario criado com sucesso!", usuarioNovo : novoUsuario});

        }catch(erro){
            console.log(erro);
        }
    }

    static async loginUsuario (req, res) {

        const {nome, senha} = req.body;
        try{
            const user = await usuario.findOne({nome});
            if(!user){
                return res.status(400).json({msg: "Usuario nao encontrado!"})
            }

            const deuMatch = await bcrypt.compare(senha, user.senha);
            if(!deuMatch){
                return res.status(400).json({msg:"Senha incorreta!"});
            }
            const secret = process.env.SECRET;
            const token = jwt.sign({
                id: user._id
            }, secret)

            res.status(200).json({
                msg: "Token gerado!",
                token
            })

        }catch(erro){
            res.status(500).json({msg: "Ocorreu um erro: ", erro: erro});
        }
    }

    static async autenticaUsuario (req, res, next) {
        const token = req.headers['authorization'];
        try{
            const secret = process.env.SECRET;
            const verificaToken = jwt.verify(token, secret);
            req.user = verificaToken; 
            next();
            res.status(200).json({msg: "Acesso Permitido!"});
        }catch(erro){
            res.status(400).json({msg: "token inválido!"});
        }
    }
}

export default UsuarioController;