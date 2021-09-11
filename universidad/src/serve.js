const express = require("express");

const app = express();

const cors = require('cors');

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.set('PORT', process.env.PORT || 3001);

// Routes
require("./routes/docente.route.js")(app);
require("./routes/materia.route.js")(app);
require("./routes/estudiante.route.js")(app);
require("./routes/nota.route.js")(app);

// set port, listen for requests
app.listen(app.get('PORT'), () => {
  console.log("Server is running on port: "+app.get('PORT'));
});