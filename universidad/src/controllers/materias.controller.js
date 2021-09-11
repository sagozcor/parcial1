const Materias = require("../models/materias.model.js");

// Create and Save a new Materias
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Materias
  const materias = new Materias({
    materia: req.body.materia,
    credito: req.body.credito,
    id_docente: req.body.id_docente
  });

  // Save Customer in the database
  Materias.create(materias, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Materias."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Materias.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Materias."
      });
    else res.send(data);
  });
};

// Find a single docente with a MateriaId
exports.findOne = (req, res) => {
    Materias.findById(req.params.materiaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Materia with id ${req.params.materiaId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Materia with id " + req.params.materiaId
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

  Materias.updateById(
    req.params.materiaId,
    new Materias(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Materia with id ${req.params.materiaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Materia with id " + req.params.materiaId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Materias.remove(req.params.materiaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Materia with id ${req.params.materiaId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Materia with id " + req.params.materiaId
        });
      }
    } else res.send({ message: `Docente was Materia successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Materias.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all materias."
      });
    else res.send({ message: `All Materias were deleted successfully!` });
  });
};