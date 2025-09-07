// pega o ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function carregarUsuario() {
  try {
    //Pega as informações com o id
    const resposta = await fetch(`http://localhost:3000/pais/${id}`);
    //Pega o texto JSON com as informações
    const usuario = await resposta.json();

    //Coloca as informações no campo de texto automaticamente
    document.getElementById("editNome").value = usuario.nome;
    document.getElementById("editCpf").value = usuario.cpf;
    document.getElementById("editTelefone").value = usuario.telefone;
    document.getElementById("editEmail").value = usuario.email;
    document.getElementById("editTipo").value = usuario.tipo;
  } catch (erro) {
  console.error("Erro ao carregar usuário:", erro);
  }
}

document.getElementById("editarForm").addEventListener("submit", async (e) => {
e.preventDefault();

  const dadosAtualizados = {
  nome: document.getElementById("editNome").value,
  cpf: document.getElementById("editCpf").value,
  telefone: document.getElementById("editTelefone").value,
  email: document.getElementById("editEmail").value,
  tipo: document.getElementById("editTipo").value
  };

  //Mandar os dados para o BD
  try {
    const resposta = await fetch(`http://localhost:3000/pais/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosAtualizados),
    });

    if (resposta.ok) {
    console.log("Usuário atualizado com sucesso!");
    window.location.href = "view.html"; // volta pra lista
    } else {
      console.log("Erro ao atualizar usuário");
    }
  } catch (erro) {
    console.error("Erro ao atualizar:", erro);
  }
});

carregarUsuario();