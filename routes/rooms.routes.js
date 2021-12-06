//Importando express
const express = require("express");
const { runMain } = require("module");

const isAuthenticated = require("../middlewares/isAuthenticated");

// Configurando um roteador

const router = express.Router();

// Importar o modelo da coleção
const RoomsModel = require("../models/Room.model");

// REST => REpresentational State Transfer
// Uma API REST é uma API que adere aos padrões do HTTP. Padrão global da tecnologia. Se a sua API segue o padrão REST, a curva de aprendizado entre linguagens é muito menor
// Quando uma API segue o padrão REST, ela é chama de "RESTful", que é um espectro: uma API pode ser mais ou menos "RESTful".
// Aderência total ao "RESTful" é muito difícil, mas é importante chegar o mais próximo possível

// Seguir as regras do REST: usar os métodos HTTP corretos para cada ação (GET para buscar, POST para inserir, etc) e responder com o status HTTP correto (200 para sucesso, 201 para criação, 404 para não encontrado, etc).

// CRUD, usando express E mongoose

// CREATE (POST)

router.post("/rooms", isAuthenticated, async (req, res) => {
  try {
    // Extrair as informações do corpo da requisição

    console.log(req.body);

    // Inserir no banco
    const result = await RoomsModel.create(req.body);

    // Responder a requisição
    // Pela regra do REST, a resposta de uma inserção deve contar o registro recém-inserido com status 201
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// READ (GET) (Lista)

router.get("/rooms", isAuthenticated, async (req, res) => {
  try {
    // Buscar as informações no banco
    const Reviews = await RoomsModel.find();

    // Responder a requisição

    res.status(200).json(Reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// READ (detalhe)

router.get("/rooms/:id", isAuthenticated, async (req, res) => {
  // Buscar as informações no banco de Reviesws

  const Room = await RoomModel.findOne({ _id: req.params.id });

  // Verificar se o banco encontrou o produto
  try {
    if (!Room) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    // Responder a requisição

    res.status(200).json(Room);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT => substituição (destrutiva)
// PATCH => atualização (não-destrutiva)

// Update (PATCH)
router.patch("/rooms/:id", isAuthenticated, async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição

    // Atualizar o registro
    const result = await RoomsModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!result) {
      res.status(404).json({ msg: "Produto não encontrado" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete (DELETE)

router.delete("/rooms/:id", isAuthenticated, async (req, res) => {
  try {
    const result = await RoomsModel.deleteOne({ _id: req.params.id });

    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Exportando o router
module.exports = router;
