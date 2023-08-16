import Db from "./Db.js";

class Transferir extends Db {
  constructor () {
    super();
    this.userName = "";
    this.userConta = "";
    this.conta = [];
    this.validar = false;
  }
  
  /**
   * "retorna um boolean sobre a conta receptora passada"
   */
  validConta (contaR) {
    this.userConta = contaR;
    this.userName = super.getUserByAccount(contaR);
    if (super.getValid()) {
      this.validar = true;
    } else {
      this.validar = false;
    }
  }
  
  /**
   * "retorna um boolean sobre o valor passado"
   */
  validValor (valor) {
    if (valor > 0) {
      this.validar = true;
    } else {
      this.validar = false;
    }
  }
  
  /**
   * "faz a transferência para a conta solicitada"
   * @param {int} contaD conta a ser depositada
   * @param {int} valor valor a ser transferido
   */
  transferencia (contaD,valor) {
    this.conta.push(super.transferir(contaD,this.userConta,valor));
    if (super.getValid()) {
      this.validar = true;
      localStorage.setItem("userLogin",JSON.stringify(this.conta));
    } else {
      this.validar = false;
    }
  }
  
  /**
   * " retorna o nome do usuário procurado em formato de string"
   */
  getUserName () {
    return this.userName;
  }
  
  /**
   * " retorna um boolean sobre a ação feita "
  */
  getValidar () {
    return this.validar;
  }
}
export default Transferir;