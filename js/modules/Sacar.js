import Db from "./Db.js";

class Sacar extends Db{
  constructor () {
    super();
    this.user = [];
    this.validar = false;
  }
  
  /**
   * "função para sacar. Não pode ser maior que o saldo em conta"
   * @param {int} valor "valor para o saque"
   * @@param {int} conta "conta que será efetuado o saque"
   */
  saque (valor, conta) {
    this.user.push(super.sacar(valor,conta));
    if (super.getValid()) {
      this.validar = true;
      localStorage.setItem("userLogin",JSON.stringify(this.user));
    } else {
      this.validar = false;
    }
  }
  
  /**
   * "@return {boolean} retorna um boolean sobre a ação feita"
   */
  getValidar () {
    return this.validar;
  }
}

export default Sacar;