module.exports = app => {
    const estudiantes = require("../controllers/estudiantes.controller.js");

    // Crear un nuevo estudiante
    app.post("/api/estudiantes", estudiantes.create);
  
    // Mostrar todos los estudiantes
    app.get("/api/estudiantes", estudiantes.findAll);
  
    // Mostrar solo un estudiante
    app.get("/api/estudiantes/:estudianteId", estudiantes.findOne);
  
    // Actualizar un estudiante
    app.put("/api/estudiantes/:estudianteId", estudiantes.update);
  
    // Eliminar un estudiante
    app.delete("/api/estudiantes/:estudianteId", estudiantes.delete);
  
    // Eliminar todos los estudiantes
    app.delete("/api/estudiantes", estudiantes.deleteAll);
  };