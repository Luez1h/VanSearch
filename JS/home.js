
const id = Cookies.get("usuario_id");
const search = document.getElementById("input");

async function carregarUsuario(id){
    try{
        //Pega as informações com o id
        const resposta = await fetch(`http://localhost:3000/pais/${id}`);
        //Pega o texto JSON com as informações
        const usuario = await resposta.json();

        username = document.getElementById("username");
        username.innerText = usuario.nome;
    }  catch (erro) {
    console.error("Erro ao carregar usuário:", erro);
    }
}

async function carregarPais() {
    try {
        //Pedir dados ao DB
        const resposta = await fetch("http://localhost:3000/pais");
        //Transforma o dado em uma variável
        const pais = await resposta.json();
        console.log(pais);

        //Acha o lugar para "cuspir" os dados
        const container = document.getElementById("listaPais");
        container.innerHTML = ""; 

        //Para cada dado encontrado, cria um bloco
        pais.forEach(p => {
            const bloco = document.createElement("div");
            bloco.className = "card"

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

async function pesquisar(){
    //Pedir dados ao DB
    const resposta = await fetch("http://localhost:3000/pais");
    //Transforma o dado em uma variável
    const pais = await resposta.json();

    //Pega o valor do campo de texto e põe em minúsculo
    search.value.toLowerCase();

    //Pega o lugar onde ele vai colocar os "cards" com os dados
    const container = document.getElementById("listaPais");
    container.innerHTML = ""; 

    pais.forEach(p => {

        //Ajusta os dados à uma lista
        const dados = {
            nome : `${p.nome}`,
            cpf : `${p.cpf}`,
            telefone : `${p.telefone}`,
            email : `${p.email}`
        };

        //Cria o card onde vai estar as informações
        const bloco = document.createElement("div");
        bloco.className = "card"

        //Verificar se os valores batem e adiciona as informações
        if(dados.nome.includes(search.value) ||
        dados.cpf.includes(search.value) ||
        dados.telefone.includes(search.value) ||
        dados.email.includes(search.value)){
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
        }        
    });
}

function cadastrar() {
    window.location.href = `cadastro.html`;
}

function login(){
    window.location.href = `login.html`;
}

function sair(){
    Cookies.remove("usuario_id", {path: "./JS"});
    window.location.reload();
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

if(id == null){
    window.location.href = `cadastro.html`;
}else{
    carregarUsuario(id);
}

//Carregar pais
carregarPais();
//Detectar searchbar
search.addEventListener("input", () => {
    console.log("ai")
    pesquisar();
});