// Importar o mongoose
const mongoose = require("mongoose");

// Definir quais campos e quais regras desses campos os documentos do MongoDB terão (Schema)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 250, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  },
  passwordHash: { type: String, required: true },
});

// Exportar o modelo da coleção
module.exports = mongoose.model("User", UserSchema);
