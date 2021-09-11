const Estudiantes = require("../models/estudiantes.model.js");

// Create and Save a new estudiante
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Estudiante
  const estudiante = new Estudiantes({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    celular: req.body.celular
  });

  // Save Customer in the database
  Estudiantes.create(estudiante, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Estudiante."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Estudiantes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Estudiantes."
      });
    else res.send(data);
  });
};

// Find a single estudiante with a estudianteId
exports.findOne = (req, res) => {
    Estudiantes.findById(req.params.estudianteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found estudiante with id ${req.params.estudianteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving estudiante with id " + req.params.estudianteId
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

  Estudiantes.updateById(
    req.params.estudianteId,
    new Estudiantes(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.estudianteId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.estudianteId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Estudiantes.remove(req.params.estudianteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found estudiante with id ${req.params.estudianteId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete estudiante with id " + req.params.estudianteId
        });
      }
    } else res.send({ message: `estudiante was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Estudiantes.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Estudiantes."
      });
    else res.send({ message: `All Estudiantes were deleted successfully!` });
  });
};