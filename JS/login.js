
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
    }else{
        console.log("Não existe usuário com estas informações")
    }
  })
}

//Detectar o submit
document.getElementById("forms").addEventListener("submit", async (e) => {
  e.preventDefault();
  const dados = {
    email : document.getElementById("email").value,
    senha : document.getElementById("senha").value
  }
  login(dados);
})