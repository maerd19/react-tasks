const mongoose = require("mongoose");

const ProyectoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  creador: {
    // Referencia al creador del proyecto
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Proyecto", ProyectoSchema);
