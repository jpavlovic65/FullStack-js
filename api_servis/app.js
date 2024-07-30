const express = require('express');
const { sequelize, Auto, Make, Stavka, Narudzbina } = require("./models");
const cors = require("cors");
const jwt = require('jsonwebtoken');
require('dotenv').config();

  
const app = express();

  
const corsOptions = {
	origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://localhost:8080','http://127.0.0.1:9001']
  };
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});
const autoRoutes = require("./routes/auto.js");
const modelRoutes = require("./routes/model.js");
const narudzbinaRoutes = require("./routes/narudzbina.js");
const stavkasRoutes = require("./routes/stavka.js");

app.use("/auto", autoRoutes);
app.use("/model",modelRoutes);
app.use("/narudzbina", narudzbinaRoutes);
app.use("/stavka",stavkasRoutes);

app.listen({ port:9000 }, async () => {
	console.log("Started server on localhost:8000");
	await sequelize.sync({force:false});
	console.log("DB synced");
});
