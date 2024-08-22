const sqliteConnection = require("../../database/sqlite");
const knex = require("../../database/knex");

class UserRepository {

  async findByEmail(email) {
    // const database = await sqliteConnection();
    const userByEmail = await knex("users").where({email});    
    // const user = await database.get("SELECT * FROM users where email = (?)", [email]);

    return userByEmail
  }

  async create({ name, email, password, auth }) {

    const userCreated = knex("users").insert({
      name: name,
      email: email,
      password: password,
      auth: auth
    });
    
    return userCreated;
  }
}

module.exports = UserRepository;