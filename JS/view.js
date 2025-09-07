
async function carregarPais() {
    try {
        //Pedir dados ao DB
        const resposta = await fetch("http://localhost:3000/pais");
        //Transforma o dado em uma variável
        const pais = await resposta.json();

        //Acha o lugar para "cuspir" os dados
        const container = document.getElementById("listaPais");
        container.innerHTML = ""; 

        //Para cada dado encontrado, cria um bloco
        pais.forEach(p => {
            const bloco = document.createElement("div");
            bloco.style.border = "1px solid #ccc";
            bloco.style.padding = "10px";
            bloco.style.margin = "10px 0";

            //Informações dentro do bloco
            bloco.innerHTML = `
                <h2>${p.nome}</h2>
                <p>CPF: ${p.cpf}</p>
                <p>telefone: ${p.telefone}</p>
                <p>Email: ${p.email}</p>
                <button onclick="editar('${p._id}')">Editar</button>
                <button onclick="excluir('${p._id}')">Excluir</button>
            `;

            //Adiciona o bloco ao lugar desejado
            container.appendChild(bloco);
        });
    } catch (erro) {
        console.error("Erro ao carregar pais:", erro);
    }
}

function cadastrar() {
    window.location.href = `forms.html`;
}

function editar(id) {
    window.location.href = `edit.html?id=${id}`;
}

async function excluir(id) {
    try{
        const resposta = await fetch(`http://localhost:3000/pais/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    if (resposta.ok) {
    console.log("Usuário deletado com sucesso!");
    carregarPais();
    } else {
      console.log("Erro ao deletar usuário");
    }
    }catch(erro) {
        console.error("Erro ao deletar usuário:", erro);
    }
}



