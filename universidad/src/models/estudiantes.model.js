const sql = require("./db.js");

// constructor
const Estudiantes = function(estudiante) {
  this.nombre = estudiante.nombre;
  this.apellido = estudiante.apellido;
  this.celular = estudiante.celular;
};

Estudiantes.create = (newEstudiante, result) => {
  sql.query("INSERT INTO estudiantes SET ?", newEstudiante, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created estudiante: ", { id: res.insertId, ...newEstudiante });
    result(null, { id: res.insertId, ...newEstudiante });
  });
};

Estudiantes.findById = (estudianteId, result) => {
  sql.query(`SELECT * FROM estudiantes WHERE id = ${estudianteId}`, (err, res) => {
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

Estudiantes.getAll = result => {
  sql.query("SELECT * FROM estudiantes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Estudiantes: ", res);
    result(null, res);
  });
};

Estudiantes.updateById = (id, estudiante, result) => {
  sql.query(
    "UPDATE estudiantes SET nombre = ?, apellido = ?, celular = ? WHERE id = ?",
    [estudiante.nombre, estudiante.apellido, estudiante.celular, id],
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

      console.log("updated estudiante: ", { id: id, ...estudiante });
      result(null, { id: id, ...estudiante });
    }
  );
};

Estudiantes.remove = (id, result) => {
  sql.query("DELETE FROM estudiantes WHERE id = ?", id, (err, res) => {
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

    console.log("deleted estudiantes with id: ", id);
    result(null, res);
  });
};

Estudiantes.removeAll = result => {
  sql.query("DELETE FROM estudiantes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Estudiantes`);
    result(null, res);
  });
};

module.exports = Estudiantes;