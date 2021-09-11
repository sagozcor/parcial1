module.exports = app => {
    const notas = require("../controllers/notas.controller.js");

    // Crear un nueva nota
    app.post("/api/notas", notas.create);
  
    // Mostrar todos los notas
    app.get("/api/notas", notas.findAll);
  
    // Mostrar solo una nota
    app.get("/api/notas/:notaId", notas.findOne);
  
    // Actualizar un nota
    app.put("/api/notas/:notaId", notas.update);
  
    // Eliminar un nota
    app.delete("/api/notas/:notaId", notas.delete);
  
    // Eliminar todos los notas
    app.delete("/api/notas", notas.deleteAll);
  };