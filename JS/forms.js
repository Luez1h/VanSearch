
document.getElementById("forms").addEventListener("submit", async (e) => {
  e.preventDefault();

const dados = {
    nome : document.getElementById("nome").value,
    cpf : document.getElementById("cpf").value,
    telefone : document.getElementById("telefone").value,
    email : document.getElementById("email").value,
    senha : document.getElementById("senha").value,
    tipo : document.getElementById("tipo").value
}

fetch("http://localhost:3000/pais", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(dados)
});
});