// Importar o mongoose
const mongoose = require("mongoose");

// Definir quais campos e quais regras desses campos os documentos do MongoDB terão (Schema)
const RoomSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  reviews: [], // we will update this field a bit later when we create review model
});

// Exportar o modelo da coleção
module.exports = mongoose.model("Room", RoomSchema);
