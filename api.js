import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import pais from "./CadPais.js";

dotenv.config();

const app = express();
const PORT = 3000; //Porta

app.use(express.json());
app.use(cors());


// Conexão com o MongoDB
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao MongoDB");
    } catch (error){
        console.log("Erro ao conectar com o MongoDB", error);
    }
    
};

//Executar comnado de conexão
connectDB();

//Criar cadastro -- CREATE
app.post("/pais", async (req, res) => {
    try{
        const novoCadPais = await pais.create(req.body);
        res.json(novoCadPais);
        console.log("Cadastro feito no MongoDB");
    } catch(error){
        res.json({ error : error });
        console.log("Erro ao fazer cadastro no MongoDB", error);
    }
    
})

//Ver cadastros -- READ
app.get("/pais", async (req, res) => {
    try{
        const VerPais = await pais.find();
        res.json(VerPais);
    }catch(error){
        res.json({ error : error });
        console.log("Erro ao procurar cadastro no MongoDB", error);
    }
})

//Editar cadastros -- UPDATE
app.put("/pais/:id", async (req, res) => {
    //req.params.id
    try{
        const EditarPai = await pais.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        );
        res.json(EditarPai);
    }catch(error){
        res.json({ error : error });
        console.log("Erro ao editar cadastro no MongoDB", error);
    }
})

//Excluir cadastros -- DELETE
app.delete("/pais/:id", async (req, res) => {
    //req.params.id
    try{
        const ExcluirPai = await pais.findByIdAndDelete(
            req.params.id,
        );
        res.json(ExcluirPai);
    }catch(error){
        res.json({ error : error });
        console.log("Erro ao excluir cadastro no MongoDB", error);
    }
})

// Buscar pai por ID
app.get("/pais/:id", async (req, res) => {
    try {
        const usuario = await pais.findById(req.params.id);
        res.json(usuario);
    } catch (error) {
        res.json({ error : error });
        console.log("Erro ao buscar cadastro por ID no MongoDB", error);
    }
});


app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));