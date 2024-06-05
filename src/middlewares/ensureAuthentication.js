const { verify } = require("jsonwebtoken");
const AppError = require("../utils/appError");
const authConfig = require("../config/auth");

function ensureAuthentication(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new AppError("JWT Token Inválido.", 401);
  }

  const [, token] = authToken.split(" "); // [, token] => "Bearer", "Token";
  
  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    req.user = {
      id: Number(user_id)
    }

    return next();
    
  } catch {
    throw new AppError("JWT Token Inválido !");
  }
}

module.exports = ensureAuthentication;