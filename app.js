require("dotenv").config();

// Importar o Express
const express = require("express");

// Importar os roteadores na instância do Express
const authRoutes = require("./routes/auth.routes");
const reviewsRoutes = require("./routes/reviews.routes");
const roomsRoutes = require("./routes/rooms.routes");

const connectToDb = require("./config/db.config");

// Instanciar o express

const app = express();

// Configurar o Express para aceitar corpos de requisição no formato JSON
app.use(express.json());

// Ligar os roteadores na instância do Express

const API_VERSION = 1;

// Estamos prefixando todos os endpoints da nossa API com a palavra "API" e uma versão. Isso nos ajuda a identificar futuramente quando houverem vários clientes diferentes qual versão da API cada um deles usa
// app.use(`/api/v${API_VERSION}`, authRoutes);
// app.use(`/api/v${API_VERSION}`, reviewsRoutes);
// app.use(`/api/v${API_VERSION}`, roomsRoutes);

// Abaixo estamos esperando a coneção com o banco de dados antes de subir o servidor Express. Isso impede que tenhamos um servidor quebrado funcionando.

connectToDb
  .then(() => {
    // Escutar requisições em uma porta específica

    app.listen(5000, (req, res) => {
      console.log("Servidor subiu com sucesso");
    });
  })
  .catch((err) => {
    console.log(err);

    // A linha abaixo encerra o processo do node no caso de erro
    process.exit(5); // 5 significa Erro Fatal, ous eja, erro sem solução nessa execução do script
  });
