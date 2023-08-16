import Depositar from "./modules/Depositar.js";
import Sacar from "./modules/Sacar.js";
import Transferir from "./modules/Transferir.js";

if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para entrar!");
  window.location.href="../index.html";
}
const nameUser = document.querySelector("#nameUser");
const contaUser = document.querySelector("#contaUser");
const saldo = document.querySelector("#saldo");
//botoes
const btnSair = document.querySelector("#btnSair");
const operSacar = document.querySelector("#operSacar");
const operDepositar = document.querySelector("#operDepositar");
const operTransferir = document.querySelector("#operTransferir");

var user = JSON.parse(localStorage.getItem("userLogin"));

nameUser.innerHTML=`Olá ${user[0].nome}!`;
contaUser.innerHTML=`conta: ${user[0].conta}`;
saldo.innerHTML = `R$ ${user[0].saldo}`

//console.table(user);

function depositar () {
  let dep = new Depositar();
  let valor = prompt("Quanto deseja depositar?");
  let idUser = user[0].conta;
  dep.deposito(valor,idUser);
  if (dep.getValid()) {
    alert(`Depositou R$ ${valor} com sucesso!`);
    user = null;
    user = JSON.parse(localStorage.getItem("userLogin"));
    setTimeout(()=>{
      window.location.reload();
      nameUser.innerHTML=`Olá ${user[0].nome}!`;
      contaUser.innerHTML=`conta: ${user[0].conta}`;
      saldo.innerHTML = `R$ ${user[0].saldo}`
    },10);
  } else {
    alert("Digite um valor maior que ZERO para depositar!");
  }
  
}

function sacar () {
  let saque = new Sacar();
  let valor = prompt("Quanto deseja sacar?");
  let idUser = user[0].conta;
  saque.saque(valor,idUser);
  if (saque.getValidar()) {
    alert (`Sacou ${valor} com sucesso!`);
    user = null;
    user = JSON.parse(localStorage.getItem("userLogin"));
    setTimeout(()=>{
      window.location.reload();
      nameUser.innerHTML=`Olá ${user[0].nome}!`;
      contaUser.innerHTML=`conta: ${user[0].conta}`;
      saldo.innerHTML = `R$ ${user[0].saldo}`
    },10);
  } else {
    alert("Você não pode sacar mais do que tem na conta!");
  }
}

function transferir () {
  let transf = new Transferir ();
  let contaAtual = user[0].conta;
  let newConta = prompt("Qual conta deseja enviar?");
  transf.validConta(newConta);
  
  if (transf.getValidar()) {
    let valor = prompt(`Quanto enviar para ${transf.getUserName()}?`);
    transf.validValor(valor);
    
    if (transf.getValidar()) {
      let conf = confirm (`Deseja enviar ${valor} para ${transf.getUserName()}?`);
      
      if (conf) {
        transf.transferencia(contaAtual,valor);
        if (transf.getValidar()) {
          alert(`Você transferiu ${valor} para ${transf.getUserName()}!`);
          
          user = null;
          user = JSON.parse(localStorage.getItem("userLogin"));
          setTimeout(()=>{
            window.location.reload();
            nameUser.innerHTML=`Olá ${user[0].nome}!`;
            contaUser.innerHTML=`conta: ${user[0].conta}`;
            saldo.innerHTML = `R$ ${user[0].saldo}`
          },10);
        } else {
          alert("Você não pode transferir mais do que tem na conta!")
        }
      } else {
        return;
      }
    } else {
      alert("Especifique um valor para transferir!");
    }
  } else {
    alert("Conta não encontrada!")
  }
  
}

function sair () {
  let conf = confirm("Deseja sair?");
  if (conf) {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("token");
    window.location.href="../index.html";
  } else {
    return;
  }
}

operDepositar.addEventListener("click",depositar);
btnSair.addEventListener("click",sair);
operSacar.addEventListener("click",sacar);
operTransferir.addEventListener("click",transferir);