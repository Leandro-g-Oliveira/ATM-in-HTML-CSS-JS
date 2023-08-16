import Db from "./Db.js";

class Depositar extends Db{
  constructor () {
    super();
    this.user = [];
    this.validar = false;
  }
  /**
   * "função para depositar"
   * @param {int} valor valor a ser depositado
   * @param {int} idUser numero da própria conta que será depositada
   */
  deposito (valor, idUser) {
    if (valor > 0) {
      this.user.push(super.deposity(Number(valor),idUser));
      this.validar = true;
      localStorage.setItem("userLogin",JSON.stringify(this.user));
    } else {
      this.validar = false;
    }
    
  }
  
  /**
   * "@return {boolean} description"
   */
  getValid () {
    if (this.validar) {
      return true;
    } else {
      return false;
    }
  }
  
  /**
   * "@@return {array} retorna o array da conta"
   */
  getUser () {
    return this.user;
  }
}
export default Depositar;
