import mongoose from "mongoose";

const CadPaisSchema = new mongoose.Schema({
    nome: String,
    cpf: String,
    telefone: String,
    email: String,
    senha: String,
    tipo: String
});

export default mongoose.model('pais', CadPaisSchema);