module.exports = app => {
    const materias = require("../controllers/materias.controller.js");

    // Crear un nueva materia
    app.post("/api/materias", materias.create);
  
    // Mostrar todos los materias
    app.get("/api/materias", materias.findAll);
  
    // Mostrar solo una materia
    app.get("/api/materias/:materiaId", materias.findOne);
  
    // Actualizar un materia
    app.put("/api/materias/:materiaId", materias.update);
  
    // Eliminar un materia
    app.delete("/api/materias/:materiaId", materias.delete);
  
    // Eliminar todos los materias
    app.delete("/api/materias", materias.deleteAll);
  };