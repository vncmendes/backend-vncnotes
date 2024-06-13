module.exports = {
  jwt: {
    secret: process.env.JWT_AUTH_TOKEN || "default",
    expiresIn: "1d"
  }
}