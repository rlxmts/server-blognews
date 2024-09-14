import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String},
    texto: { type: String},
    imagem: { type: String},
    date: {
        type: Date,
        default: Date.now 
    }
}, {versionKey: false});

const post = mongoose.model("posts", postSchema);
export default post;