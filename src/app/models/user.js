export default class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.pass_reset_token = null;
    this.pass_reset_expires = null;
  }
}
