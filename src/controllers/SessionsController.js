const { compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/appError");
const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("User or Password Wrong !");
    }
    
    const checkPassword = await compare(password, user.password);
    
    if (!checkPassword) {
      throw new AppError("User or Password Wrong !");
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })
    
    res.json({user, token});
  }
}

module.exports = SessionsController;