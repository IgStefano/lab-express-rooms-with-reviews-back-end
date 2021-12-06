const jwt = require("jsonwebtoken");

function generateToken(userObj) {
  const { _id, name, email } = userObj;
  // Recebendo variável de ambiente

  const signature = process.env.TOKEN_SIGN_SECRET;
  const expiration = "1h";

  // É muito importante que variável de ambiente JAMAIS vá ao GitHub

  return jwt.sign({ _id, name, email }, signature, { expiresIn: expiration });
}

module.exports = generateToken;
