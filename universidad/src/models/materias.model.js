const sql = require("./db.js");

// constructor
const Materias = function(materias) {
  this.materia = materias.materia;
  this.credito = materias.credito;
  this.id_docente = materias.id_docente;
};

Materias.create = (newMateria, result) => {
  sql.query("INSERT INTO materias SET ?", newMateria, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created materia: ", { id: res.insertId, ...newMateria });
    result(null, { id: res.insertId, ...newMateria });
  });
};

Materias.findById = (materiaId, result) => {
  sql.query(`SELECT m.id,m.materia,m.credito ,d.nombre,d.apellido FROM materias m JOIN docente d ON m.id_docente = d.id WHERE id = ${materiaId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found materia: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Materias.getAll = result => {
  sql.query("SELECT m.id,m.materia,m.credito,d.nombre,d.apellido,m.id_docente FROM materias m JOIN docente d ON m.id_docente = d.id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("materias: ", res);
    result(null, res);
  });
};

Materias.updateById = (id, materias, result) => {
  sql.query(
    "UPDATE materias SET materia = ?, credito = ?, id_docente = ? WHERE id = ?",
    [materias.materia, materias.credito, materias.id_docente, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated materia: ", { id: id, ...materias });
      result(null, { id: id, ...materias });
    }
  );
};

Materias.remove = (id, result) => {
  sql.query("DELETE FROM materias WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted materia with id: ", id);
    result(null, res);
  });
};

Materias.removeAll = result => {
  sql.query("DELETE FROM materias", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} materias`);
    result(null, res);
  });
};

module.exports = Materias;