
//Função de Login
async function login(dados){
  //Bsuca valores no BD
  const resposta = await fetch("http://localhost:3000/pais");
  const pais = await resposta.json();
  //Para cada usuário, verificar se há email e senha iguais as dos campos de texto
  pais.forEach(p => {
    if(dados.email == `${p.email}` && dados.senha == `${p.senha}`){
      Cookies.remove('usuario_id');
      Cookies.set('usuario_id', `${p._id}`, {expires: 30, path: "./JS"});
      window.location.href = `home.html`;
    } else{
      console.log("Não existe usuário com estas informações")
    }
  })
}

//Quando apertar o botão submit
document.getElementById("forms").addEventListener("submit", async (e) => {
  e.preventDefault();
  //Recebe os dados
  var dados = {
    nome : document.getElementById("nome").value.toLowerCase(),
    cpf : document.getElementById("cpf").value,
    telefone : document.getElementById("telefone").value,
    email : document.getElementById("email").value.toLowerCase(),
    senha : document.getElementById("senha").value,
    tipo : document.getElementById("tipo").value.toLowerCase()
  }
  //Verificar se pode ou não haver cadastro
  var cadastro = true;
  //Buscar valores no BD
  const resposta = await fetch("http://localhost:3000/pais");
  const pais = await resposta.json();
  //Para cada usuário, verificar se há email, cpf ou telefone já atribuído
  pais.forEach(p => {
    if(dados.email == `${p.email}` || dados.cpf == `${p.cpf}` || dados.telefone == `${p.telefone}`){
      //Se houver, não haverá possibilidade de cadastro
      cadastro = false;
      console.log("ja existe um usuário com essas informações");
    }
  })
  //Se houver possibilidade de cadastro, inserir os valores dos campos de texto
  if(cadastro == true){
    //Tenta inserir os valores e logar
    try {
      const resposta = await fetch(`http://localhost:3000/pais`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
      });

      //Se os valores forem inseridos ele loga na conta criada automáticamente
      if (resposta.ok) {
      console.log("Usuário cadastrado com sucesso! Entrando...");
      //reformula os dados para se encaixar na função de login
      dados = {
        email : dados.email,
        senha : dados.senha
      }
      login(dados);
      } else {
        //Não foi possivel cadastrar
        console.log("Erro ao cadastrar usuário");
      }
    } catch (erro) {
      //Mostra o tipo de erro que ocorreu ao cadastrar
      console.error("ERRO AO TENTAR INSERIR OS VALORES DE CADASTRO", erro);
    }
  }
});