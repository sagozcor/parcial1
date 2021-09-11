const sql = require("./db.js");

// constructor
const Notas = function(nota) {
  this.id_estudiantes = nota.id_estudiantes;
  this.id_materias = nota.id_materias;
  this.nota = nota.nota;
};

Notas.create = (newNota, result) => {
  sql.query("INSERT INTO notas SET ?", newNota, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created nota: ", { id: res.insertId, ...newNota });
    result(null, { id: res.insertId, ...newNota });
  });
};

Notas.findById = (notaId, result) => {
  sql.query(`SELECT  n.id,n.id_estudiantes,n.id_materias,m.materia,concat_ws(' ', d.nombre, d.apellido) as docente,concat_ws(' ', e.nombre, e.apellido) as estudiante,n.nota FROM notas n JOIN materias m ON n.id_materias = m.id JOIN docente d ON m.id_docente = d.id JOIN estudiantes e ON n.id_estudiantes = e.id WHERE id = ${notaId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found nota: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Notas.getAll = result => {
  sql.query("SELECT n.id,m.materia,concat_ws(' ', d.nombre, d.apellido) as docente,concat_ws(' ', e.nombre, e.apellido) as estudiante,n.* FROM notas n JOIN materias m ON n.id_materias = m.id JOIN docente d ON m.id_docente = d.id JOIN estudiantes e ON n.id_estudiantes = e.id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("notas: ", res);
    result(null, res);
  });
};

Notas.updateById = (id, nota, result) => {
  sql.query(
    "UPDATE notas SET id_estudiantes = ?, id_materias = ?, nota = ? WHERE id = ?",
    [nota.id_estudiantes, nota.id_materias, nota.nota, id],
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

      console.log("updated nota: ", { id: id, ...nota });
      result(null, { id: id, ...nota });
    }
  );
};

Notas.remove = (id, result) => {
  sql.query("DELETE FROM notas WHERE id = ?", id, (err, res) => {
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

    console.log("deleted nota with id: ", id);
    result(null, res);
  });
};

Notas.removeAll = result => {
  sql.query("DELETE FROM notas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} notas`);
    result(null, res);
  });
};

module.exports = Notas;