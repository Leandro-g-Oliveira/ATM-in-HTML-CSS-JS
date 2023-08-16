import LoginUser from "./modules/LoginUser.js";
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const btnLogin = document.querySelector("#btnLogin");

function entrar (e) {
  e.preventDefault();
  let login = new LoginUser();
  login.logar(email.value,senha.value);
  if (login.getLogado()) {
    alert("Seja bem-vindo!");
    window.location.href="./html/home.html";
  } else {
    alert("Usuário e/ou senha incorretos!");
  }
}

btnLogin.addEventListener("click",entrar);