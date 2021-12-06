// Importar o mongoose
const mongoose = require("mongoose");

// Definir quais campos e quais regras desses campos os documentos do MongoDB terão (Schema)
const ReviewsSchema = new mongoose.Schema({
  roomId: { type: mongoose.Types.ObjectId, ref: "Room" }, // O valor de "ref" OBRIGATORIAMENTE precisa ser igual ao primeiro argumento do método "model" do modelo referenciado
  comment: String,
});

// Exportar o modelo da coleção
module.exports = mongoose.model("Reviews", ReviewsSchema);
