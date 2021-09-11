const Notas = require("../models/notas.model.js");

// Create and Save a new notas
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a notas
  const nota = new Notas({
    id_estudiantes: req.body.id_estudiantes,
    id_materias: req.body.id_materias,
    nota: req.body.nota
  });

  // Save Customer in the database
  Notas.create(nota, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the notas."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Notas.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Notas."
      });
    else res.send(data);
  });
};

// Find a single docente with a notaId
exports.findOne = (req, res) => {
    Notas.findById(req.params.notaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found nota with id ${req.params.notaId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving nota with id " + req.params.notaId
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

  Notas.updateById(
    req.params.notaId,
    new Notas(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found nota with id ${req.params.notaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating nota with id " + req.params.notaId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Notas.remove(req.params.notaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Nota with id ${req.params.notaId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Nota with id " + req.params.notaId
        });
      }
    } else res.send({ message: `Docente was Nota successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Notas.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Notas."
      });
    else res.send({ message: `All Notas were deleted successfully!` });
  });
};