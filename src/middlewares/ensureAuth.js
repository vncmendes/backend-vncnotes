const { verify } = require("jsonwebtoken");
const authConfig = require("../configs/auth");
const appError = require("../utils/appError");

function ensureAuth(req, res, next) {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    throw new appError("JWT não informado !", 401);
  }
  
  const [, token] = bearerToken.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret); // verify returns a subject.
    console.log(user_id);
    req.user = {
      id: Number(user_id) //to create a token we cast into a String, now we are transforming back.
    }

    return next(); // call next function after middleware
    
  } catch {
    throw new appError("JWT inválido !");
  }
}

module.exports = ensureAuth;