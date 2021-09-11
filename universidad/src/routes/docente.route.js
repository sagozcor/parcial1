module.exports = app => {
    const docentes = require("../controllers/docentes.controller.js");

    app.get("/api", (req, res) => {
        res.json({ message: "Bienvenido." });
    });

    // Crear un nuevo docente
    app.post("/api/docentes", docentes.create);
  
    // Mostrar todos los docentes
    app.get("/api/docentes", docentes.findAll);
  
    // Mostrar solo un docente
    app.get("/api/docentes/:docenteId", docentes.findOne);
  
    // Actualizar un docente
    app.put("/api/docentes/:docenteId", docentes.update);
  
    // Eliminar un docente
    app.delete("/api/docentes/:docenteId", docentes.delete);
  
    // Eliminar todos los docentes
    app.delete("/api/docentes", docentes.deleteAll);
  };