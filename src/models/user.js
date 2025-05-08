export default class User {
  constructor(id, username, password, email, role, token) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
    this.token = token;
  }
}
