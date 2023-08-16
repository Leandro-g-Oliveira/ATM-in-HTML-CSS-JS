class Db {
  constructor () {
    this.db = JSON.parse(localStorage.getItem("users")||'[]');
    this.account = Math.random().toString(10).substr(2,6);
    this.valid = false;
  }
  
  /**
   * "função para cadastrar um novo usuário, não podendo cadastrar com e-mail repetido"
   * "@param {string} nome nome do usuário a ser castrado"
   * "@param {email} email email do usuário a ser cadastrado"
   * "@@param {string} senha senha do usuário a ser cadastrado"
   */
  setUser (nome, email, senha) {
    let key = this.db.findIndex(val => val.email == email);
    if (key == -1) {
      let user = {conta:this.account,nome,email,senha,saldo:0};
      this.db.push(user);
      localStorage.setItem("users",JSON.stringify(this.db));
      this.valid = true;
    } else {
      this.valid = false;
    }
  }
  
  /**
   * retorna um boolean sobre a ação feita
   */
  getValid () {
    return this.valid;
  }
  
  /**
   * "@return {int} retorna a key do usuário, pela conta passada"
   * "@param {int} conta número da conta do usuário"
   */
  getKeyByAccount (conta) {
    let key = this.db.findIndex(val=>val.conta == conta);
    if (key > -1) {
      this.valid = true;
      return key;
    } else {
      this.valid = false;
    }
    
  }
  
  /**
   * "@return {string} retorna o nome do usuário pelo número da conta"
   * "@param {int} conta número da conta a pesquisar"
   */
  getUserByAccount (conta) {
    let key = this.db.filter(val=>val.conta == conta);
    if (key.length > 0) {
      this.valid = true;
      return key[0].nome;
    } else {
      this.valid = false;
    }
  }
  
  /**
   * "faz o depósito na própria conta"
   * "@param {int} valor valor a depositar"
   * "@param {int} conta número da conta a depositar"
   */
  deposity (valor, conta) {
    let key = this.getKeyByAccount(conta);
    if (key > -1) {
      this.db[key].saldo += Number(valor);
      localStorage.setItem("users",JSON.stringify(this.db));
      return this.db[key];
    } else {
      return false;
    }
  }
  
  /**
   * "faz um saque na própria conta"
   * "@param {int} valor valor a sacar"
   * "@param {int} conta número da conta a sacar"
   */
  sacar (valor, conta) {
    let key = this.getKeyByAccount(conta);
    if (this.db[key].saldo >= valor) {
      this.db[key].saldo -= Number(valor);
      localStorage.setItem("users",JSON.stringify(this.db));
      this.valid = true;
      return this.db[key];
    } else {
      this.valid = false;
      return false;
    }
  }
  
  /**
   * 
   * @param {int} contaD Conta que irá transferir
   * @param {int} contaR Conta que irá receber a transferencia
   * @param {int} valor valor que irá ser depositado
   */
  transferir (contaD,contaR,valor) {
    let keyD = this.getKeyByAccount(contaD);
    let keyR = this.getKeyByAccount(contaR);
    if (this.db[keyD].saldo >= valor) {
      this.db[keyD].saldo -= Number(valor);
      this.db[keyR].saldo += Number(valor);
      localStorage.setItem("users",JSON.stringify(this.db));
      this.valid = true;
      return this.db[keyD];
    } else {
      this.valid = false;
    }
  }
  
  /**
   * "realiza o login e retorna o array do usuário"
   * "@param {email} email e-mail do usuário a logar"
   * "@param {string} senha senha do usuário a logar"
   */
  logar (email,senha) {
    let key = this.db.filter(val=>val.email==email && val.senha == senha);
    let keyUser = this.db.findIndex(val=>val==key[0]);
    if (keyUser > -1) {
      return key;
    } else {
      return false;
    }
  }
}
export default Db;