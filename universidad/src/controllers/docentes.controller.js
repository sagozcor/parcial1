const Docentes = require("../models/docentes.model.js");

// Create and Save a new Docente
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Contenido vacio!"
    });
  }

  // Create a Docente
  const docente = new Docentes({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    celular: req.body.celular
  });

  // Guardar docentes en bd
  Docentes.create(docente, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "ha ocurrido un problema al crear docente."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Docentes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving docentes."
      });
    else res.send(data);
  });
};

// Find a single docente with a docenteId
exports.findOne = (req, res) => {
    Docentes.findById(req.params.docenteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Docente with id ${req.params.docenteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Docente with id " + req.params.docenteId
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Docentes.updateById(
    req.params.docenteId,
    new Docentes(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.docenteId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.docenteId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Docentes.remove(req.params.docenteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Docente with id ${req.params.docenteId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Docente with id " + req.params.docenteId
        });
      }
    } else res.send({ message: `Docente was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Docentes.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all docentes."
      });
    else res.send({ message: `All Docentes were deleted successfully!` });
  });
};