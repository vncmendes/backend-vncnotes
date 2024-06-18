const { hash, compare } = require("bcryptjs");
const appError = require("../utils/appError.js");
const sqliteConnection = require("../database/sqlite");
const UserRepository = require("../repositories/User/UserRepository.js");
const UserCreateService = require("../services/UserCreateService");

class UsersController {
  async create(req, res) {
    const { name, email, password, auth } = req.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute({ name, email, password, auth });

    return res.status(201).json();

  }

  async read(req, res) {
    const { id } = req.query;
    
    const database = await sqliteConnection();

    if (id) {
      const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
      return res.status(200).json(user);
    }

    const users = await database.get("SELECT * FROM users");
    console.log(users);
    return res.status(200).json(users);
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if (!user) {
      throw new appError("User is not registered on database!")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new appError("E-mail Already Registered!")
    }

    user.name = name ?? user.name; // if name exists use name if not use the old user.name.
    user.email = email ?? user.email; // same
    
    if (password && !old_password) {
      throw new appError("Old password is needed !")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new appError("Old password is not correct!")
      }

      user.password = await hash(password, 6);
    }
    
    await database.run(`
      UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now') 
        WHERE id = ?`,
        [user.name, user.email, user.password, user_id]
    );
    // updated_at = DATETIME('now') => function from database to set datetime; cuz JS have another default.
    return res.status(200).json();
  }

  async delete(req, res) {
    const user_id = req.user.id;
    const database = await sqliteConnection();
    database.run("DELETE FROM users where id = (?)", [user_id]);

    return res.status(200).json("User Deleted!");
  }

}

module.exports = UsersController;