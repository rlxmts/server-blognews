import post from "../models/Posts.js";

class PostController {
    static async listarPosts(req, res) {
        try {
            const listaDePost = await post.find({}).sort({ date: -1 });
            res.status(200).json(listaDePost);
        } catch (erro) {
            res.status(500).send(`Erro ao conectar: ${erro.message}`);
        }
    };

    static async cadastrarPost(req, res) {
        try{
            const novoPost = await post.create(req.body);
            res.status(201).json({mensagem: "Post Criado", post: novoPost});
        }catch(erro){
            res.status(500).json({mensagem: "Erro ao cadastrar Post: ",  erro} );
        }
    };

    static async buscarPost (req, res) {
        try{
            const id = req.params.id;
            const postBuscado = await post.findById(id);
            res.status(200).json({postBuscado});
        }catch(erro){
            res.status(500).json({mensagem: "Livro nao encontrado!"});
        }
    };

    static async deletarPost (req,res) {
        try{
            const id = req.params.id;
            await post.findByIdAndDelete(id, req.body);
            res.status(200).json({ mensagen: "post deletado com Sucesso!" });
        }catch(erro){
            res.status(500).json({mensagem: "Erro ao deletar!"})
        }
    }
    
    static async editarPost (req,res) {
        try{
            const id = req.params.id;
            await post.findByIdAndUpdate(id, req.body);
            res.status(200).json({ mensagen: "post editado com Sucesso!" });
        }catch(erro){
            res.status(500).json({mensagem: "Erro ao editar!"})
        }
    }
};

export default PostController;
