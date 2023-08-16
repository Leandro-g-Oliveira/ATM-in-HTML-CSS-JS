import Db from "./Db.js";

class CadUser extends Db {
  constructor () {
    super();
    this.userCad = false;
  }
  /**
   * "cadastrar novo usuário, não podendo ter e-mail repetido"
   * @param {string} nome nome do usuário a cadastrar
   * @param {email} email email do usuário a cadastrar, não pode ter outro igual
   * @param {string} senha senha do usuário a cadastrar
   */
  cadastrar (nome, email, senha) {
    super.setUser(nome,email,senha);
    if (super.getValid()) {
      this.userCad = true;
    } else {
      this.userCad = false;
    }
  }
  
  /**
   * "retorna um boolean sobre a função feita"
   */
  getUserCad () {
    return this.userCad;
  }
}

export default CadUser;
