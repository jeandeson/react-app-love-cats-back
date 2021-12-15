export default class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.image = user.image;
    this.password = user.password;
    this.cat = user.cat;
    this.pass_reset_token = null;
    this.pass_reset_expires = null;
  }
}
