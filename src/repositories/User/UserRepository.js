const sqliteConnection = require("../../database/sqlite");

class UserRepository {

  async findByEmail(email) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users where email = (?)", [email]);

    return user
  }

  async create({ name, email, password, auth }) {
    const database = await sqliteConnection();
    const userId = await database.run(
      "INSERT INTO users (name, email, password, auth) VALUES (?, ?, ?, ?)", 
      [name, email, password, auth]);

    return { id: userId};
  }
}

module.exports = UserRepository;