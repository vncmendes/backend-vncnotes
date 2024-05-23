const { compare } = require("bcryptjs");
const knex = require("../database/knex");
const appError = require("../utils/appError");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;
    const user = await knex("users").where({email}).first();

    if (!user) {
      throw new appError("E-mail ou senha incorretos", 401);
    }
    
    const checkPassword = await compare(password, user.password);
 
    if (!checkPassword) {
      throw new appError("E-mail ou senha incorretos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return res.json({user, token});

  }
}

module.exports = SessionsController;