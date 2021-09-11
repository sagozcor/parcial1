const sql = require("./db.js");

// constructor
const Docentes = function(docente) {
  this.nombre = docente.nombre;
  this.apellido = docente.apellido;
  this.celular = docente.celular;
};

Docentes.create = (newDocente, result) => {
  sql.query("INSERT INTO docente SET ?", newDocente, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created docente: ", { id: res.insertId, ...newDocente });
    result(null, { id: res.insertId, ...newDocente });
  });
};

Docentes.findById = (docenteId, result) => {
  sql.query(`SELECT * FROM docente WHERE id = ${docenteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Docentes.getAll = result => {
  sql.query("SELECT * FROM docente", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("docentes: ", res);
    result(null, res);
  });
};

Docentes.updateById = (id, docente, result) => {
  sql.query(
    "UPDATE docente SET nombre = ?, apellido = ?, celular = ? WHERE id = ?",
    [docente.nombre, docente.apellido, docente.celular, id],
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

      console.log("updated docente: ", { id: id, ...docente });
      result(null, { id: id, ...docente });
    }
  );
};

Docentes.remove = (id, result) => {
  sql.query("DELETE FROM docente WHERE id = ?", id, (err, res) => {
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

    console.log("deleted docente with id: ", id);
    result(null, res);
  });
};

Docentes.removeAll = result => {
  sql.query("DELETE FROM docente", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} docentes`);
    result(null, res);
  });
};

module.exports = Docentes;