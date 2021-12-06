// Importar o express
const express = require("express");

// Importar o bcrypt
const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;
// Configura um roteador
const router = express.Router();

// Importar o modelo da coleção
const UserModel = require("../models/User.model");

// Importar função que gera o token JWT
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Cadastro

router.post("/signup", async (req, res) => {
  try {
    // 1. Extrair os dados do corpo da requisição

    const { name, email, password } = req.body;

    // 2. Verificar se a senha é segura

    if (
      !password ||
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm
      )
    ) {
      return res.status(400).json({
        msg: "A senha deve conter ao menos 8 caracteres, letras maiúsculas e minúsculas, números e caracteres especiais",
      });
    }

    // 3. Criptografar a senha

    // Gerando o salt (string aleatória) com custo 10
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);

    // Criptografando a senha do usuário
    const passwordHash = bcrypt.hashSync(password, salt);

    // 4. Inserir no banco de dados

    const result = await UserModel.create({ name, email, passwordHash });

    // 5. Responder a requisição
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  // Verifica se o e-mail é válido

  try {
    // 1. Extrair os dados do corpo da requisição

    const { email, password } = req.body;

    // 2. Procurar o usuário no banco de dados através do e-mail

    const foundUser = await UserModel.findOne({ email });

    // 3. Caso encontrado, verificar se a senha está correta

    if (!foundUser) {
      return res.status(400).json({ msg: "E-mail ou senha incorretos." });
    }

    if (!bcrypt.compareSync(password, foundUser.passwordHash)) {
      return res.status(400).json({ msg: "Email ou senha incorretos." });
    }

    // 4. Caso correta, criar uma sessão para o usuário

    const token = generateToken(foundUser);

    res.status(200).json(token);

    // Essa sessão será um token, cuja existência indica que o usuário está logado no servidor.

    // Isso garante que apenas usuários que logaram no nosso servidor podem usar a nossas rotas, que foram protegidas.
  } catch (err) {
    console.log(err);
  }
});
