import Db from "./Db.js";

class LoginUser extends Db {
  constructor () {
    super();
    this.logado = null;
  }
  /**
   * "função para logar o usuário "
   * "@param {email} email email para logar"
   * "@param {string} senha senha para logar"
   */
  logar (email,senha) {
    this.logado = super.logar(email,senha);
  }
  /**
   * "@returns {boolean} retorna um boolean sobre a ação feita"
   */
  getLogado () {
    if (this.logado) {
      let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);
      localStorage.setItem("token",token);
      localStorage.setItem("userLogin",JSON.stringify(this.logado));
      return true;
    } else {
      return false;
    }
  }
}
export default LoginUser;