import CadUser from "./modules/CadUser.js";

const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const btnCad = document.querySelector("#btnCad");


function cadastrar (e) {
  e.preventDefault();
  let cad = new CadUser();
  cad.cadastrar(nome.value,email.value,senha.value)
  if (cad.getUserCad()) {
    alert("Cadastrado com sucesso!");
    window.location.href="../index.html";
  } else {
    alert ("E-mail já existente!");
  }
}
btnCad.addEventListener("click",cadastrar);
